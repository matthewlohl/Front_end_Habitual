/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
global.fetch = require('jest-fetch-mock');
let app;

describe('app', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        app = require('../static/js/script')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    // describe('requests', () => {
    //     describe('fetchAll', () => {
    //         test('it makes a get request to /habits', () => {
    //             app.fetchAll();
    //             expect(fetch.mock.calls[0][0]).toMatch(/habits$/)
    //         })
    //     })
    // })

    describe('showAll', () => {
        test('it posts habits to the page', () => {

            const fakeAPI = [
                { habit_name: "Test", frequencyDone : 0, frequency: 2 },
            ]
            app.showAll(fakeAPI)
            const entryCount = document.querySelectorAll('.habit').length
            expect(entryCount).toBe(1)
        })
    })
})
