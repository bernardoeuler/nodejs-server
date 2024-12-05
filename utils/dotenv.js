import fs from "fs"

export function readDotEnv(filePath) {
    const buffer = fs.readFileSync(filePath, "utf-8")

    const lines = buffer.split("\n")
    const variables = {}

    for (const line of lines) {
        const [key, value] = line.split("=")
        variables[key] = value
    }

    return variables
}