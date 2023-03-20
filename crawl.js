const {JSDOM} = require('jsdom')

async function crawlPage(currentURL) {
    console.log(`actively crawling: ${currentURL}`);

    try {
        const resp = await fetch(currentURL)
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`);
            return
        }

        const contentType = resp.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`not HTML, content type: ${contentType} on page ${currentURL}`);
            return
        }

        console.log(await resp.text());
    } catch (err) {
        console.log(`error in fetch: ${err.message} in the page ${currentURL}`);
    }
}

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
    getURLsFromHTML,
    crawlPage
}