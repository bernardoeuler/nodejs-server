import fs from "fs/promises"
import http from "http"
import path from "path"

import { readDotEnv } from "./utils/dotenv.js"
import { getFileExtensionFromUrl, getContentTypeFromPath, getFilePathFromUrl } from "./utils/file-handling.js"
import { logRequest, logResponse } from "./utils/logging.js"
import { isPathUnsafe } from "./utils/security.js"

const envVariables = readDotEnv(".env")

for (const [key, value] of Object.entries(envVariables)) {
    process.env[key] = value
}

const HOST = process.env.HOST
const PORT = process.env.PORT
const PUBLIC_DIR = "public"
const PAGES_DIR = path.join(PUBLIC_DIR, "pages")

const server = http.createServer(async (req, res) => {
    const fileDir = getFileExtensionFromUrl(req.url) === "html" ? PAGES_DIR : PUBLIC_DIR
    const filePath = getFilePathFromUrl(req.url, fileDir, "home")

    if (isPathUnsafe(filePath, PUBLIC_DIR)) {
        console.log("Path traversal attempt")
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.end("404 - Page not found")
        return
    }

    const contentType = getContentTypeFromPath(filePath)

    try {
        const buffer = await fs.readFile(filePath)
        res.writeHead(200, { "Content-Type": contentType })
        res.end(buffer, "utf-8")
        logRequest(req)
        logResponse(res, req.httpVersion)
    } catch (err) {
        console.error(err)

        if (err.code === "ENOENT") {
            const buffer = await fs.readFile(path.join(PAGES_DIR, "404/index.html"))
            res.writeHead(404, { "Content-Type": "text/html" })
            res.end(buffer, "utf-8")
        } else {
            const buffer = await fs.readFile(path.join(PAGES_DIR, "500/index.html"))
            res.writeHead(500, { "Content-Type": "text/html" })
            res.end(buffer, "utf-8")
        }
    }
})

server.listen(PORT, HOST, () => { console.log(`Server running at http://${HOST}:${PORT}`) })