const {crawlPage} = require('./crawl.js')

function main() {
    if (process.argv < 3) {
        console.log("No website entered");
        process.exit(1)
    }
    if (process.argv > 3) {
        console.log("Too many args entered");
        process.exit(1)
    }

    const baseURL = process.argv[2]
    console.log(`starting crawl of ${baseURL}`)
    crawlPage(baseURL)
}
main()