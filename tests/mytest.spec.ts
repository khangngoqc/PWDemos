import {test, expect} from "@playwright/test";

//Syntax:

/* 
test("title", ()=>{

    //step 1
    //step 2
    //step 3
            
})
*/

//fixture - global variable : page, browser

test("Verify page title", async ({page})=>{

    await page.goto("https://www.automationexercise.com/");
    
    let title:string = await page.title();

    console.log("Title:  ",  title);

    await expect(page).toHaveTitle("Automation Exercise");

})

