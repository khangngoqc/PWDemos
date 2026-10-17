import { test, expect, Locator, Page } from "@playwright/test";

test("1. Input Box Validation: \"FirstName\"", async ({ page }) => {
    //await page.goto("https://demo.wpeverest.com/user-registration/student-registration-form/");
    await page.goto("https://web.archive.org/web/20250124004339/https://demo.wpeverest.com/user-registration/student-registration-form/");

    const firstNameInput: Locator = page.locator("#first_name");

    //Check if the input box is displayed.
    await expect(firstNameInput).toBeVisible();

    //Check if the input box is enabled.
    await expect(firstNameInput).toBeEnabled();

    //Verify the placeholder text
    await expect(firstNameInput).toHaveAttribute("placeholder");
    expect(firstNameInput.getByPlaceholder).not.toBeNull();

    //Validate if it's a mandatory field.
    await expect(firstNameInput).toHaveAttribute("required");
    expect(await firstNameInput.getAttribute("required")).toBe("required");

    //Validate the maximum length of input allowed.
    //const inputMaxLenght = await getMaxLength(page, firstNameInput);
    const inputMaxLenght = await firstNameInput.getAttribute("maxlength");
    console.log("Max length: ", inputMaxLenght);
    expect.soft(inputMaxLenght).not.toBeNull();

    await page.waitForTimeout(3000);

    //Enter a name in the input box.
    await firstNameInput.fill("Khang");
    const enteredInput: string = await firstNameInput.inputValue();

    //Retrieve and print the text from the input box.
    console.log("Entered name: ", enteredInput);

    await page.waitForTimeout(3000);


})

async function getMaxLength(page: Page, locator: Locator): Promise<number | null> {
    const input: Locator = locator;

    // 1. Property (-1 means not set)
    const prop: number = await input.evaluate((el: HTMLInputElement) => el.maxLength);
    if (prop > 0) return prop;

    // 2. Alternate attribute names used by frameworks
    const attrNames = ['data-maxlength', 'data-max-length', 'data-max', 'ng-maxlength', 'data-val-length-max'];
    for (const name of attrNames) {
        const value = await input.getAttribute(name);
        if (value && !isNaN(Number(value))) return Number(value);
    }

    // 3. Probe by typing past the limit (works only if the field truncates)
    await input.fill('');
    await input.pressSequentially('a'.repeat(1000));
    const accepted: number = (await input.inputValue()).length;
    await input.fill('');
    if (accepted < 1000) return accepted;

    return null; // limit isn't enforced on typing
}

test("2. Radio Button Validation: \"Gender\"", async ({ page }) => {
    //await page.goto("https://demo.wpeverest.com/user-registration/student-registration-form/");
    await page.goto("https://web.archive.org/web/20250124004339/https://demo.wpeverest.com/user-registration/student-registration-form/");

    //Get the status of the "Male" radio button
    const maleRadio: Locator = page.locator("input[value=Male]");
    console.log("Is the male radio button checked: ", await maleRadio.isChecked());

    //Select the "Male" radio button.
    if (!await maleRadio.isChecked()) {
        await maleRadio.check();
        await expect(maleRadio).toBeChecked();
    }

    //Retrieve and print the selected status of the "Male" radio button again
    console.log("Is the male radio button checked: ", await maleRadio.isChecked());

})

test("3. Checkbox Validation: \"Hobbies\"", async ({ page }) => {
    //await page.goto("https://demo.wpeverest.com/user-registration/student-registration-form/");
    await page.goto("https://web.archive.org/web/20250124004339/https://demo.wpeverest.com/user-registration/student-registration-form/");

    const singingCheckbox: Locator = page.locator("input[value=Singing]");
    //Select the checkbox for "Singing"
    await singingCheckbox.check();

    //Capture all available hobbies and print the count.
    const hobbies: string[] = ['Drawing', 'Singing', 'Dancing', 'Sketching', 'Other'];
    const hobbiesLocator: Locator[] = hobbies.map(index => page.getByLabel(index))
    console.log("Hobbies count: ", hobbiesLocator.length);

    //Check all hobbies using a loop
    for (const hobby of hobbiesLocator) {
        if (!await hobby.isChecked()) {
            await hobby.check();
            await expect(hobby).toBeChecked();
        }
    }

    await page.waitForTimeout(3000);

    //Uncheck all hobbies using a loop
    for (const hobby of hobbiesLocator) {
        if (!await hobby.isChecked()) {
            await hobby.check();
            await expect(hobby).toBeChecked();
        }

    }

    await page.waitForTimeout(3000);

    //Check the last 2 hobbies using loop.
    for (const hobby of hobbiesLocator.slice(-2)) {
        if (!await hobby.isChecked()) {
            await hobby.check();
            await expect(hobby).toBeChecked();
        }

    }

    await page.waitForTimeout(3000);

    //Check the first 3 hobbies using loop.
    for (const hobby of hobbiesLocator.slice(0, 3)) {
        if (!await hobby.isChecked()) {
            await hobby.check();
            await expect(hobby).toBeChecked();
        }

    }

    await page.waitForTimeout(3000);

    //Check hobbies randomly using a loop.
    for (const hobby of hobbiesLocator) {
        const random: Boolean = Math.random() < 0.5;
        if (random) {
            await hobby.check();
        }
    }

    await page.waitForTimeout(3000);
    await page.reload();

    let hobby: string = "Dancing";
    switch (hobby) {
        case "Drawing": await page.getByLabel("Drawing").check();
        case "Singing": await page.getByLabel("Singing").check();
        case "Dancing": await page.getByLabel("Dancing").check();
        case "Sketching": await page.getByLabel("Sketching").check();
        case "Other": await page.getByLabel("Other").check();
        default: console.log("Invalid input");
    }

    await page.waitForTimeout(3000);
})