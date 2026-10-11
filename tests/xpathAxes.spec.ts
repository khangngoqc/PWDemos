import { test, expect, Locator } from "@playwright/test";

test("XPath axes demo", async ({ page }) => {
    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //1. self axis - Select <td> element that contains "Germany"
    const germanyCell = page.locator("//td[text()='Germany']/self::td");
    await expect(germanyCell).toHaveText("Germany");

    //2. parent axis - Get parent <tr> of the "Germany" cell
    const parentRow: Locator = page.locator("//td[text()='Germany']/parent::tr");
    await expect(parentRow).toContainText("Maria Anders");
    await expect(parentRow).toContainText("Alfreds Futterkiste Maria Anders Germany");
    console.log(await parentRow.textContent());

    //3. child axis - Get all the <td> child of the second <tr> in the table
    const secondRowCells = page.locator("//table[@id='customers']//tr[2]//child::td");
    await expect(secondRowCells).toHaveCount(3);

    //4. ancestor axis - Get ancestor <table> of "Germany" cell
    const table: Locator = page.locator("//td[text()='Germany']//ancestor::table");
    await expect(table).toHaveAttribute('id', 'customers');

    //5. descendant axis - Get all <td> elements under <table>
    const allTds: Locator = page.locator("//table[@id='customers']/descendant::td");
    await expect(allTds).toHaveCount(18);

    //6. following axis - Get the <td> taht comes after "Germany" in document order
    const followingCell: Locator = page.locator("//td[text()='Germany']//following::td[1]");
    await expect(followingCell).toHaveText("Centro comercial Moctezuma");

    //7. following-sibling axis - Get <td>s to the right of "Germany"
    //const rightSiblings: Locator = page.locator("//td[text()='Germany']//following-sibling::td");
    //await expect(rightSiblings).toHaveCount(0);

    const rightSiblings: Locator = page.locator("//td[text()='Maria Anders']//following-sibling::td");
    await expect(rightSiblings).toHaveCount(1);

    //8. prerceding-sibling axis - Get <td> just before "Germany"
    const precedingCell:Locator = page.locator("//td[text()='Germany']//preceding::td[1]");
    await expect(precedingCell).toHaveText("Maria Anders");

    //9. preceding-sibling axis - Get <td>s to the left of "Germany"
    const leftSibling:Locator = page.locator("//td[text()='Germany']//preceding-sibling::td");
    await expect(leftSibling).toHaveCount(2);
    await expect(leftSibling.nth(0)).toHaveText("Alfreds Futterkiste");
    await expect(leftSibling.nth(1)).toHaveText("Maria Anders");
    
    
})