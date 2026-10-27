import { test, expect, Locator } from "@playwright/test";

test("Comparing methods", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");

    const products: Locator = page.locator(".product-title");

    //1) innerText() vs textContent
    //console.log(await products.nth(1).innerText());
    //console.log(await products.nth(1).textContent());

    const count = await products.count();

    for (let i = 0; i < count; i++) {

        //const productName:string = await products.nth(i).innerText() //Extract plain text. Eliminates Whitespace and line breaks...
        //console.log(productName);

        const productName = await products.nth(i).textContent() //Extracts text inclidng hidden element. Including extra whitespace, linebreak...
        console.log(productName?.trim());
    }

    //2) allInnerText() vs allTextContent()
    console.log("*****Comparing allInnerText() vs allTextContent()******")

    //const productNames: string[] = await products.allInnerTexts();
    //console.log("Product Names captured by allInnerText(): ", productNames);

    const productNames: string[] = await products.allTextContents();
    console.log("Product Names captured by allTextContents(): ", productNames);

    const trimmedNames: string[] = productNames.map(text => text.trim());
    console.log("Product Names captured by allTextContents() and trimmed: ", trimmedNames);

    //3) all()
    const productLocators: Locator[] = await products.all();
    console.log(productLocators);

    //console.log(await productLocators[1].innerText());

    for(let locator of productLocators){
        console.log(await locator.innerText());
    }

})