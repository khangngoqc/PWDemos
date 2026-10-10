import { test, expect, Locator } from "@playwright/test";

test("Dynamic element locator demo", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Loop to click the button 5 times
    for (let i = 1; i <= 5; i++) {
        let button: Locator = page.locator("//button[text()='START' or text()='STOP']");
        await button.click();

        await page.waitForTimeout(2000);
    }
})

//Using css
test('Handle Dynamic Elements using CSS Locator', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Loop to click the button 5 times
    for(let i =1; i<=5; i++){
        //Locate button by role and dynamic name
        const button: Locator = page.locator('button[name="start"],button[name="stop"]');

        //click the button
        await button.click();

        //wait for 2 seconds
        await page.waitForTimeout(2000);
    }
})



//using playwright specific locators
test('Handle Dynamic Elements using PW Locator', async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Loop to click the button 5 times
    for(let i =1; i<=5; i++){
        //Locate button by role and dynamic name
        const button: Locator = page.getByRole("button", {name: /START|STOP/});

        //click the button
        await button.click();

        //wait for 2 seconds
        await page.waitForTimeout(2000);
    }
})