import puppeteer from 'puppeteer'



await puppeteerShell()

async function puppeteerShell() {
    console.log('OPENING Browser')
    const browser = await puppeteer.launch(
        {
            headless: false,
            slowMo:500,
            args:[`--start-maximized`]
        }
    )
    // args :[`--disable-notifications`]
    const page   = await browser.newPage()
    await page.setViewport({
        width:1920,
        height:1080,
        deviceScaleFactor:1
    })
    const recorder = await page.screencast({path:'recording.webm'})
    await page.goto('https://www.prothomalo.com/')
    await page.screenshot({path:'prothom-alo.png', fullPage: true})
    await recorder.stop()
    await page.close()
    await browser.close()
    console.log(`DONE. Browser Closed`)
}

/*
 => For Screen Record ffmpeg needs to be installed on system.
 => All recording weill be WebM format, Using VP9 Video Codec, Fram Rate 30FPS
 
 Code Example
 -------------
 const recorder = await page.screencast({path:'recording.webm'})
 await recoder.stop()


*/