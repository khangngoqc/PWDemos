import { test, expect, Locator } from "@playwright/test";

test("Verify Product Sorting and Information Retrieval", async ({page}) => {
    
    //1. Navigate to the Webpage:
    await page.goto("https://www.bstackdemo.com/");

    //2. Interact with the "Order by" Dropdown:
    //Locate the "Order by" dropdown element.
    const orderByDropdown: Locator = page.locator(".sort>select");

    //Verify the dropdown is displayed and enabled
    await expect(orderByDropdown).toBeVisible();
    await expect(orderByDropdown).toBeEnabled();

    //Select the option "Lowest to highest" from the dropdown.
    await orderByDropdown.selectOption("Lowest to highest");

    await page.waitForTimeout(3000);

    //3. Retrieve and Print Product Information:
    //Retrieve the list of product price elements.
    const priceElements:string[] = await page.locator(".val").allTextContents();

    //console.log(priceElements);

    //Retrieve the list of product name elements.
    const nameElements:string[] = await page.locator(".shelf-item__title").allTextContents();
    //console.log(nameElements);

    //Verify Product names and their prices count are equal.
    expect(priceElements.length).toEqual(nameElements.length);

    //Print each product name along with its corresponding price in the console.
    for(let i =0; i <nameElements.length; i++){
        console.log(`product: ${nameElements[i]} - price: ${priceElements[i]}`);
    }

    //4. Identify and Print the Lowest Priced Product:
    //Access the first element of the product prices list and the first element of the product names list.
    //Print the lowest priced product name and its price in the console.
    firstProductInfo(priceElements, nameElements);
    
    await page.waitForTimeout(3000);
    //5. Identify and Print the Highest Priced Product:
    await orderByDropdown.selectOption("Highest to lowest");

    await page.waitForTimeout(3000);
    //Access the last element of the product prices list and the last element of the product names list.
     //Retrieve the list of product price elements.
    const priceElements2:string[] = await page.locator(".val").allTextContents();
    //Retrieve the list of product name elements.
    const nameElements2:string[] = await page.locator(".shelf-item__title").allTextContents();
    //Print the highest priced product name and its price in the console.
    firstProductInfo(priceElements2, nameElements2);
    


})

function firstProductInfo(price:string[], name:string[]){
    const firstProductPrice = price[0];
    const firstProductName = name[0];

    console.log(`product: ${firstProductPrice} - price:${firstProductName}`);

}