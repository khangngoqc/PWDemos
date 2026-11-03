import {expect, Locator, test} from "@playwright/test";

test("", async ({page}) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");

    const table:Locator = page.locator("table.table tbody");
    await expect(table).toBeVisible();

    //Select all the rows, the find number of rows
    const rows:Locator[] = await table.locator("tr").all();
    const rowCount:number = rows.length;

    console.log("Number of rows in a table:", rowCount);
    expect(rowCount).toBe(4);

    //Step 1: For chrome process get value of CPU load
    //Read each row of check Chrome presence

    let cpuCell = "";

    for (const row of rows) {
       const nameCell:string = await row.locator("td").nth(0).innerText();
       if (nameCell == "Chrome") {
            //cpuCell = await row.locator('td:has-text("%")').innerText();
            cpuCell = await row.locator("td", {hasText: '%'}).innerText();
            break;
       }
    }

    expect(cpuCell).toBe("2.7%");
})