import puppeteer from 'puppeteer'


await puppeteerShell()

async function puppeteerShell() {
    console.log('OPENING Browser')
    const browser = await puppeteer.launch({headless:'shell'})
    const page   = await browser.newPage()
    await page.goto('https://example.com')
    await page.screenshot({path:'example.png'})
    await page.close()
    await browser.close()
    console.log(`DONE. Browser Closed`)
}

