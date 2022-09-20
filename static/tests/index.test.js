/**
 * @jest-environment jsdom
 */

 const fs = require("fs")
 const path = require("path")
 const html = fs.readFileSync(path.resolve(__dirname, "../../index.html"), "utf8")
 
 describe("index.html", () => {
 
     beforeEach(() => {
         document.documentElement.innerHTML = html.toString()
     })
 
     describe("head", () => {
 
         test("it has a title", () => {
             const title = document.querySelector("title")
             expect(title).toBeTruthy
             expect(title.textContent).toBe("Habitual") 
         })
     })
 
     describe("body", () => {
 
         test("it has a navbar", () => {
             const navbar = document.querySelector("nav")
             expect(navbar).toBeTruthy();
         })
 
         test("it has a section for daily, weekly and monthly habits", () => {
             const daily = document.querySelector(".daily-container")
             const weekly = document.querySelector(".weekly-container")
             const monthly = document.querySelector(".monthly-container")
             expect(daily).toBeTruthy()
             expect(weekly).toBeTruthy()
             expect(monthly).toBeTruthy()
             
            })
     })
 })