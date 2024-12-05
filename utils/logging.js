export function logRequest(request) {
    const method = request.method
    const resource = request.url
    const httpVersion = `HTTP/${request.httpVersion}`
    const logMessage = `${method} ${resource} ${httpVersion}`

    console.log(logMessage)
}

export function logResponse(response, httpVersionNumber) {
    const httpVersion = `HTTP/${httpVersionNumber}`
    const statusCode = response.statusCode
    const statusMessage = response.statusMessage
    const logMessage = `${httpVersion} ${statusCode} ${statusMessage}`

    console.log(logMessage)
}