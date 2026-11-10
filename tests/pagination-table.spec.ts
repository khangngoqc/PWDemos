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
        if (await nextBtn.isEnabled()) {
            await nextBtn.click();
        } else {
            hasMorePage = false;
        }
    }

});

test("Filter the rows and check the rows count", async ({ page }) => {
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");

    const dropdown: Locator = page.locator("#dt-length-0");
    await dropdown.selectOption({ label: '25' });

    //Approach 1
    const rows: Locator[] = await page.locator("#example tbody tr").all();
    expect(rows.length).toBe(25);

    //Approach 2
    const rows2: Locator = page.locator("#example tbody tr");
    await expect(rows2).toHaveCount(25);


});

test.only("Search for a specific data in the table", async ({ page }) => {
    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");

    const searchBox: Locator = page.locator("#dt-search-0");
    await searchBox.fill("Bruno Nash");

    const rows: Locator[] = await page.locator("#example tbody tr").all();

    if (rows.length >= 1) {
        let matchFound = false
        for (let row of rows) {
            const text: string = await row.innerText();
            if (text.includes("Bruno Nash")) {
                console.log("Record exist-found");
                matchFound = true;
                break;
            }
        }
        expect(matchFound).toBeTruthy();
    } else {
        console.log("NO rows found with search text");
    }


});