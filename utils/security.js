export function isPathUnsafe(filePath, safePath) {
    if (!filePath.startsWith(safePath)) {
        return true
    }

    return false
}