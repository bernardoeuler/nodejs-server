import path from "path"

const mimeTypes = {
    txt: "text/plain",
    htm: "text/html",
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    mjs: "text/javascript",
    csv: "text/csv",
    gif: "text/gif",
    ico: "image/vnd.microsoft.icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    svg: "image/svg+xml",
    webp: "image/webp",
    json: "application/json"
}

export function getFileExtension(filePath) {
    return path.extname(filePath).slice(1)
}

export function getContentType(fileExtension) {
    return mimeTypes[fileExtension]
}

export function getContentTypeFromPath(filePath) {
    const fileExtension = getFileExtension(filePath)
    return getContentType(fileExtension)
}

export function getFilePathFromUrl(url, file_dir, home_dir) {
    let filePath = path.join(file_dir, url)

    if (url === "/") {
        return path.join(filePath, home_dir, "index.html")
    }

    if (url.slice(-1) === "/") {
        return path.join(filePath, "index.html")
    }

    return filePath
}

export function getFileExtensionFromUrl(url) {
    if (url.slice(-1) === "/") {
        return "html"
    }

    return path.extname(url).slice(1)
}