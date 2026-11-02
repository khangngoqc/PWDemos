import { test, expect, Locator } from "@playwright/test";

test("static web  table", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table: Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //1) count number of rows in a table
    const rows: Locator = page.locator("table[name='BookTable'] tbody tr") //return all the rows including header
    await expect(rows).toHaveCount(7); //approach 1

    const rowCount: number = await rows.count();
    console.log("Number of rows in a table: ", rowCount);
    expect(rowCount).toBe(7) //approach 2

    //2) count number of headers/columns
    //const columns:Locator = page.locator("table[nname='BookTable']  tbody tr th");
    const columns: Locator = rows.locator("th");
    await expect(columns).toHaveCount(4) //approach 1

    const columnCount: number = await columns.count();
    expect(columnCount).toBe(4); //approach 2 

    //3) Read all data form 2nd row (index 2 means 3rd rrow including header)
    const secondRowCells: Locator = rows.nth(2).locator('td');
    const secondRowText: string[] = await secondRowCells.allInnerTexts();
    console.log("2nd row data: ", secondRowText);

    await expect(secondRowCells).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']);

    console.log("\nprinting 2nd row data...");
    for (const text of secondRowText) {
        console.log(text);
    }

    //4) Read all data from the table (excluding header)
    console.log('\nPrinting all Table data...');
    const allRowData = await rows.all(); // get all row locators //all() returns array of locators

    console.log("BookName   Author      subject     price");

    for (let row of allRowData.slice(1)) //slice(1) --> skip header row 
    {
        const cols = await row.locator('td').allInnerTexts();
        console.log(cols.join('\t'));
    }

    const mukeshBooks:string[] = [];

    //5) Print booknames where the author is Mukesh
    console.log("\nPrint booknames where the author is Mukesh...");

    for(let row of allRowData.slice(1)) //slice(1) --> skip header row
    {
        const cells = await row.locator('td').allInnerTexts();
        const author = cells[1];
        const book = cells[0];
        if (author === 'Mukesh') {
            console.log(author,  book);
            mukeshBooks.push(book);
        }
    }

    expect(mukeshBooks).toHaveLength(2); //Assertion

    //6) Calculate total price of all books
    console.log("\nPrint total book price...");
    let totalPrice = 0;
    for (const row of allRowData.slice(1)) {
        const cells = await row.locator('td').allInnerTexts();
        const price = cells[3];

        totalPrice += parseInt(price);

    }

    console.log("Total price: ", totalPrice);

    expect(totalPrice).toBe(7100);

})