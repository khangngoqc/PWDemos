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

test("Verify page URLt", async ({page})=>{

    await page.goto("https://www.automationexercise.com/");
    
    let url:string = await page.url();

    console.log("Url: ",  url);

    await expect(page).toHaveURL(/automationexercise/);
 
})

