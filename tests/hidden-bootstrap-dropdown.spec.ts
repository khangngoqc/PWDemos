import { test, expect, Locator } from '@playwright/test';

test("Hidden Bootstrap dropdonw", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //login
    await page.locator("input[name='username']").fill("Admin");
    await page.locator("input[name='password']").fill("admin123");
    await page.locator("button[type='submit']").click();

    //click on the PIM
    await page.getByText('PIM').click();

    await page.waitForTimeout(2000);

    //click on Job Title dropdown
    await page.locator('form i').nth(2).click()

    await page.waitForTimeout(5000);

    //capture all the options from dropdown
    const options: Locator = page.locator("div[role='listbox'] span");

    const count = await options.count();

    console.log("Number of options: ", count);

    //print all the options
    for (let index = 0; index < count; index++) {
        console.log(`-`, await options.nth(index).innerText());

    }

    await page.waitForTimeout(2000);

    //Select/click on option
    for (let index = 0; index < count; index++) {
        const text = await options.nth(index).innerText();
        if (text === "HR Manager") {
            await options.nth(index).click();
            break;
        }

    }

    await page.waitForTimeout(5000);


})