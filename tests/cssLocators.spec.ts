/*

CSS (Cascading Style Sheets)

html + js + css

2 tyoes of css locators:

1) absolute CSS locator
2) relative CSS locator
 
tag with id                     |   tag#id                      |   #id
tag with class                  |   tag.class                   |   .class
tag with any other attribute    |   tag[attribute=value]        |   [attribute=value]       
tag with class and attribute    |   tag.class[attribute=value]  |   [attribute=value]

page.locator(css/xpath)


*/

import {test, expect, Locator} from "@playwright/test";

test("Verify css locators", async ({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

    //tag#id
    //const searchBox:Locator = page.locator("input#small-searchterms");
    //await searchBox.fill("t-shirt");    
    
    /* 
    await expect(page.locator("#small-searchterms")).toBeVisible();
    await page.locator("input#small-searchterms").fill("t-shirt");

    await page.waitForTimeout(500);
    */


    //tag#class
    //await page.locator("input.search-box-text").fill("t-shirt");
    await page.locator(".search-box-text").fill("tag#class");
    await page.waitForTimeout(500);

    //tag[attribute=value]
    //await page.locator("input[name=NewsletterEmail]").fill("email@gmail.com");
    await page.locator("[name=NewsletterEmail]").fill("email@gmail.com");
    
    
    //tag.class[attribute=value]
    await page.locator("input.search-box-text[value='Search store']").fill("tag.class[attribute=value]")
    await page.waitForTimeout(500);

})

