import { expect, test, Locator } from "@playwright/test";

test("Handling Dynamic Table", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const rows: Locator[] = await page.locator("#taskTable tbody tr").all();
    const expectedCpu: string = await page.locator(".chrome-cpu").innerText();
    const expectedMemory: string = await page.locator(".firefox-memory").innerText();
    const expectedNetwork: string = await page.locator(".chrome-network").innerText();
    const expectedDisk: string = await page.locator(".firefox-disk").innerText();

    let cpuCell = "";
    for (const row of rows) {
        const nameCell: string = await row.locator("td").nth(0).innerText();
        if (nameCell === "Chrome") {
            cpuCell = await row.locator("td", { hasText: "%" }).innerText();
            break;
        }
    }

    let memoryCell = "";
    for (const row of rows) {
        const nameCell: string = await row.locator("td").nth(0).innerText();
        if (nameCell === "Firefox") {
            memoryCell = await row.locator("td", { hasText: /MB$/ }).innerText();
            break;
        }
    }

    let netWorkCell = "";
    for (const row of rows) {
        const nameCell: string = await row.locator("td").nth(0).innerText();
        if (nameCell === "Chrome") {
            netWorkCell = await row.locator("td", { hasText: "Mbps" }).innerText();
            break;
        }
    }

    let processCell = "";
    for (const row of rows) {
        const nameCell: string = await row.locator("td").nth(0).innerText();
        if (nameCell === "Firefox") {
            processCell = await row.locator("td", { hasText: /MB\/s$/ }).innerText();
            break;
        }
    }

    expect(cpuCell).toEqual(expectedCpu);
    expect(memoryCell).toEqual(expectedMemory);
    expect(netWorkCell).toEqual(expectedNetwork);
    expect(processCell).toEqual(expectedDisk);


});