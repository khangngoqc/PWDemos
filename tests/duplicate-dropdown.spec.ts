import { test, expect, Locator } from "@playwright/test";

test("Verify dropdown is Sorted", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const dropDownOptions: Locator = page.locator("#animals>option");  //not having duplicate
    //const dropDownOptions: Locator = page.locator("#colors>option"); //having duplicate

    const optionsText: string[] = (await dropDownOptions.allTextContents()).map(text => text.trim());

    const mySet = new Set<string>();    //Set - duplicates not allowed
    const duplicates: string[] = [];     //array - duplicate allowed

    for (const text of optionsText) {
        if (mySet.has(text)) {
            duplicates.push(text);
        } else {
            mySet.add(text);
        }
    }

    if(duplicates.length>0){
        console.log("Duplicate options are: ", duplicates);
    }else{
        console.log("No duplicate option found.");
    }

    expect(duplicates.length).toBe(0)

})