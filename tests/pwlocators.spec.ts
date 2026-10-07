/* 
Locator  - Identifies the element on the page
DOM - Document Object Model
DOM is an API provided  by the browser


1. page.getByRole() to locate by explicit and implicit accessibility attributes.
2. page.getByText() to locate by text content.
3. page.getByLabel() to locate a form control by associated label's text.
4. page.getByPlaceholder() to locate an input by placeholder.
5. page.getByAltText() to locate an element, usually image, by its text alternative.
6. page.getByTitle() to locate an element by its title attribute.
7. page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

*/

import {test, expect, Locator} from "@playwright/test";

test("Verify Playwright locators demo", async ({page})=>{

    await page.goto("https://demos.nop-templates.com/");
    
    //1. page.getByAltText() - identifies images (and similar elements) based on the alt attribute.
    //Use this locator when your element supports alt text
    
    const logo:Locator = page.getByAltText("Nop-Templates.com Demo Store");
    
    await expect(logo).toBeVisible();



    //2. page.getByText() - Find an element by the text it contains. You can match by a substring, exact string, or a regular expression
    //Locate by visible text
    //Use this locator to find non interactive elements like div, span, p, etc.
    //For intereactive elements like button, a, input, etc. user role locators

    /*     
    const text:Locator = page.getByText("Welcome to our store");
    await expect(text).toBeVisible();
    */

    //await expect(page.getByText("Welcome to our store")).toBeVisible(); //full string/full text
    //await expect(page.getByText("Welcome to")).toBeVisible(); //provided substring/partial text
    
    await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible(); //



    //3. page.getByRole() - Locating by Role(role is not an attribute)
    /*
    Role locators include buttons, checkboxes, headings, links, lists, tables
    and many more and follow W3C specifications for ARIA role.
    Prefer for interactive elements like buttons, checkboxes, links, lists, headings, tables, etcs...
    */

    await page.getByRole("link",{name:"Register"}).click();
    await expect(page.getByRole("heading",{name:"Register"})).toBeVisible();

    //4. page.getByLabel() - Locate form control by label's text
    //When to use: Ideal for form fields with visible labels

    await page.getByLabel('First name:').fill("John"); //type() is deprecated
    await page.getByLabel('Last name:').fill("Doe");
    await page.getByLabel('Email:').fill("johndoe@gmail.com");


    //5. page.getByPlaceholder() - Finds element with a given placeholder text
    // Best for input without a label but having a placeholder 
    await page.getByPlaceholder("Search store").fill("iMac");


    //6. page.getByTitle() to locate an element by its title attribute
    //When to use: When your element has a meanignful title attribute
    await page.goto("https://practice.expandtesting.com/locators");
    await page.getByTitle("Refresh content").click();


    //7. page.getByTestId() - Locate an element based on its data-testid based on its data-testid attribute (other attributes can be configured)
    //When to use: When text or role-based locators are unstable or not suitable
    await expect(page.getByTestId("status-message")).toHaveText("All systems operationalFree Mock Exams");
    await expect(page.getByTestId("user-name")).toHaveText("Username: Alice");

})



