import {test, expect, Locator} from "@playwright/test";

test("static web  table", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table:Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //1) count number of rows in a table
    const rows:Locator  = page.locator("table[name='BookTable'] tbody tr") //return all the rows including header
    await expect(rows).toHaveCount(7); //approach 1

    const rowCount:number = await rows.count();
    console.log("Number of rows in a table: ", rowCount);
    expect(rowCount).toBe(7) //approach 2

    //2) count number of headers/columns
    //const columns:Locator = page.locator("table[nname='BookTable']  tbody tr th");
    const columns:Locator = rows.locator("th");
    await expect(columns).toHaveCount(4) //approach 1

    const columnCount:number = await columns.count();
    expect(columnCount).toBe(4); //approach 2 

    //3) Read all data form 2nd row (index 2 means 3rd rrow including header)
    const secondRowCells:Locator  = rows.nth(2).locator('td');
    const secondRowText:string[] = await secondRowCells.allInnerTexts();
    console.log("2nd row data: ", secondRowText);
})