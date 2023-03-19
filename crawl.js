const {JSDOM} = require('jsdom')

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
            urls.push(urlObj.href)
            } catch (err){
                console.log(`error with relative path: ${err.message}`);
            }  
        } else {
            try{
                const urlObj = new URL(`${linkElement.href}`)
            urls.push(urlObj.href)
            } catch (err){
                console.log(`error with absolute path: ${err.message}`);
            } 
        }
    }
    return urls
}

function normalizeURL(urlString) {
    const url = new URL(urlString)
    const hostPath = `${url.hostname}${url.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}