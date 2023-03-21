const {sortPages} = require('./report.js')
const {test, expect} = require('@jest/globals')

test('sortPages 2 pages', () => {
    const input = {
        'wagslane.dev/path': 1,
        'wagslane.dev': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['wagslane.dev', 3],
        ['wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages 5 pages', () => {
    const input = {
        'wagslane.dev/path': 1,
        'wagslane.dev': 3,
        'wagslane.dev/path3': 5,
        'wagslane.dev/path2': 2,
        'wagslane.dev/path4': 7,
    }
    const actual = sortPages(input)
    const expected = [
        ['wagslane.dev/path4', 7],
        ['wagslane.dev/path3', 5],
        ['wagslane.dev', 3],
        ['wagslane.dev/path2', 2],
        ['wagslane.dev/path', 1],
    ]
    expect(actual).toEqual(expected)
})