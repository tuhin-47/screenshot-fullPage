import puppeteer from 'puppeteer'



await puppeteerShell()

async function puppeteerShell() {
    console.log('OPENING Browser')
    const browser = await puppeteer.launch(
        {
            headless:'shell',
            args :[`--disable-notifications`]
        }
    )
    const page   = await browser.newPage()
    await page.setViewport({
        width:1920,
        height:1080,
        deviceScaleFactor:1
    })
    await page.goto('https://www.prothomalo.com/')
    await page.screenshot({path:'prothom-alo.png', fullPage: true})
    await page.close()
    await browser.close()
    console.log(`DONE. Browser Closed`)
}

