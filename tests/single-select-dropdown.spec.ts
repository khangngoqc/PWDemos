import { test, expect, Locator } from "@playwright/test";

test("Single Select Dropdown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1) select option  from the dropdown (4 ways)
    //await page.locator("#country").selectOption("Japan");         //visible text
    //await page.locator("#country").selectOption({value:'japan'});   //by using value attribute
    //await page.locator("#country").selectOption({label:'Japan'});   //by using label attribute
    //await page.locator("#country").selectOption({ index: 6 });   //by using index


    //2)check number of options in the dropdown(count);
    const dropdownOptions: Locator = page.locator("#country>option");
    await expect(dropdownOptions).toHaveCount(10);

    //3)Check an option present in the dropdown
    const optionTexts: string[] = (await dropdownOptions.allTextContents()).map(text => text.trim() );
    console.log(optionTexts);

    expect(optionTexts).toContain("Japan");

    //4) printing options from the dropdown
    for(const option of optionTexts){
        console.log(option)
    }


    await page.waitForTimeout(3000);

})