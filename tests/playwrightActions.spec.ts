import { expect, test, Locator } from "@playwright/test";

//Text Input/Text Box
//Radio Button
//Checkboxes

test("Test input actions", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const txtBox: Locator = page.locator("#name");

    await expect(txtBox).toBeVisible();
    await expect(txtBox).toBeEnabled();

    const maxlenght: null | string = await txtBox.getAttribute("maxlength"); //Return the value of maxlenght attribute of the element
    console.log(maxlenght);

    expect(maxlenght).toBe('15');


    await txtBox.fill("Khang Ngo");

    //console.log("text content of Firstname: ", await txtBox.textContent()); //return empty
    const enteredValue: string = await txtBox.inputValue();
    console.log("text content of Firstname: ", await txtBox.inputValue()); //return Khang Ngo
    expect(enteredValue).toBe('Khang Ngo');

    await page.waitForTimeout(3000);

})

test("Test radio button actions", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const maleRadio: Locator = page.locator("#male");
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    //expect(await maleRadio.isChecked()).toBe(false);
    expect(await maleRadio.isChecked()).toBeFalsy();

    await maleRadio.check()     //select radio button
    //expect(await maleRadio.isChecked()).toBe(true); 
    //expect(await maleRadio.isChecked()).toBeTruthy();
    expect(maleRadio).toBeChecked();    //Preferable

    await page.waitForTimeout(3000);

})

test("Checkbox actions", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. Select specific checkbox
    const sundayCheckbox: Locator = page.getByLabel("Sunday");
    await sundayCheckbox.check();
    await expect(sundayCheckbox).toBeChecked();

    //2. Select all checkboxes and assert each is checked
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    /* 
    for (let i = 0; i < days.length; i++) {
       await page.getByLabel(days[i]).check();
    } 
    */

    const checkboxes: Locator[] = days.map(index => page.getByLabel(index))
    expect(checkboxes.length).toBe(7);

    //3. Select all checkboxes and assert each is checked
    for (const checkbox of checkboxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
    await page.waitForTimeout(3000);


    //4. Uncheck last 3 checkboxes and assert
    for (const checkbox of checkboxes.slice(-3)) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }
    await page.waitForTimeout(3000);


    //5. Toggle checkboxes: If checked, uncheck; if unchecked, check
    for (const checkbox of checkboxes) {

        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        } else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }


    }

    await page.waitForTimeout(3000);

    await page.reload();

    //6. Randomly select checkboxes - Select checkbox by index (1,3,6) and assert
    const indexes: number[] = [1, 3, 6];
    for (const i of indexes) {
        await checkboxes[i].check();
        await expect(checkboxes[i]).toBeChecked();
    }

    await page.reload();

    //7. Select the checkbox based on the label
    const weekname:string = "Friday";
    //await page.getByLabel(weekname).check();

    for(const label of days){
        if(label.toLowerCase() === weekname.toLowerCase()){
            const checkbox = page.getByLabel(label);
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

}) 