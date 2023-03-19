function normalizeURL(urlString) {
    const url = new URL(urlString)
    const hostPath = `${url.hostname}${url.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normalizeURL
}