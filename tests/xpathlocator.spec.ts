import { test, expect, Locator } from "@playwright/test";

test("XPath demo in playwright", async ({ page }) => {

    await page.goto("http://demowebshop.tricentis.com/");

    //1. Absolute xpath
    const absoluteLogo = page.locator("//html/body/div[4]/div[1]/div[1]/div[1]/a/img");
    await expect(absoluteLogo).toBeVisible();

    //2. Relative xpath
    const relativeLogo = page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(relativeLogo).toBeVisible();

    //3. contains()
    const products: Locator = page.locator("//h2//a[contains(@href,'computer')]")
    const productCount = await products.count();
    console.log("Number of computer related products:", productCount);
    expect(productCount).toBeGreaterThan(0);

    const firstProductName = await products.first().textContent();
    const lastProductName = await products.last().textContent();
    const nthProductName = await products.nth(2).textContent(); //index is starting from 0
    console.log("First computer related product name: ", firstProductName);
    console.log("Last computer related product name: ", lastProductName);
    console.log("Nth computer related product name: ", nthProductName);

    console.log("\nAll computer related product titles: ");

    const productTitles: string[] = await products.allTextContents();

    let heading = 1;
    for (let i of productTitles) {

        console.log(`${heading}.`, i);
        heading++;
    }

    //4. starts-with()
    const buildInProducts: Locator = page.locator("//h2//a[starts-with(@href,'/build')]");
    const count: number = await buildInProducts.count();
    expect(count).toBeGreaterThan(0);

    //5. text()
    const reglink: Locator = page.locator("//a[text()='Register']");
    expect(reglink).toBeVisible();

    //6. last()
    const lastElement: Locator = page.locator("//div[@class='column follow-us']/ul/li[last()]");
    await expect(lastElement).toBeVisible();
    console.log("Text content of last element: ", await lastElement.textContent());

    //7. position()
    const positionElement: Locator = page.locator("//div[@class='column follow-us']/ul/li[position()=3]");
    await expect(positionElement).toBeVisible();
    console.log("Text content of positional element: ", await positionElement.textContent());

})