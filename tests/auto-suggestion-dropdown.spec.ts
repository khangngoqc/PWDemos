import { expect, test, Locator } from '@playwright/test';

test("Auto-suggest dropdown", async ({ page }) => {
    await page.goto("https://www.flipkart.com/");

    await page.waitForTimeout(3000);

    await page.locator("body > div.mcO4kT.RFBkxv > div > span").click();

    await page.locator("#container > div > div.HaReuk > div > div > div > div > div > div > div > div > div > div.FO_kXv > div > div > div:nth-child(2) > div > div > div > div > div > header > div.lfFUxn > div.olwU0Z.CXZSEo > form > div > div > input").fill("smart"); //search text

    await page.waitForTimeout(3000);


    //Get all the suggested option --> Ctrl + Shift + P on DOM --> emulate focused page
    const options: Locator = page.locator("ul>li");
    const count = await options.count();
    console.log("Number of suggested options: ", count);

    //print all the suggested options
    console.log("5th option: ", await options.nth(5).innerText());

    console.log("Printing all the auto suggestions...");
    for (let i = 0; i < count; i++) {
        //console.log(await options.nth(i).innerText());
        console.log(await options.nth(i).textContent());
    }

    //select/click on the smartphone option
    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).innerText();
        if (text === "smartphone") {
            options.nth(i).click();
            break;
        }
    }


    await page.waitForTimeout(3000);

})