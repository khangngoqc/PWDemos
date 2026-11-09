import { test, expect, Locator } from "@playwright/test";

test("Read data form all the table pages", async ({ page }) => {
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");

    let hasMorePage = true;

    while (hasMorePage) {
        const rows: Locator[] = await page.locator("#example tbody tr").all();
        for (let row of rows) {
            console.log(await row.innerText());
        }

        const nextBtn = page.locator("button[aria-label='Next']");
        if(await nextBtn.isEnabled()){
            await nextBtn.click();
        }else{
            hasMorePage = false;
        }
    }

});