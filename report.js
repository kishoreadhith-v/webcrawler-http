function printReport(pages) {
    const sortedPages = sortPages(pages)
    console.log('==========');
    console.log('REPORT');
    console.log('==========');
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`found ${hits} links to page: ${url}`);
    }
    console.log('==========');
    console.log('END REPORT');
    console.log('==========');
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => b[1] - a[1])
    return pagesArr
}

module.exports = {
    sortPages,
    printReport
}