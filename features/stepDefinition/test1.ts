import { Given, When, Then } from "@wdio/cucumber-framework";
import { elements } from "../webElements/elements.js";
import * as commons from "../commons/commonFunction.js";
import chai from "chai";


Given(/^open the webpage$/, async function(){
    await browser.url("https://rahulshettyacademy.com/");
    await browser.maximizeWindow();
    await browser.pause(2000)
})

When(/^click the (.*)$/, async function(clickLink){
    await commons.clickElement(elements.courses);
})

Then(/^the url should match with (.*)$/, async function(expectedUrl){
    let url = await browser.getUrl();
    chai.expect(url).to.equal(expectedUrl);
})
