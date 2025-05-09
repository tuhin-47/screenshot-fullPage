import puppeteer from 'puppeteer'


try{
    await saveFullpageScreenshot()
}catch(err){
    console.log(err)
}

async function saveFullpageScreenshot() {
    console.log('OPENING Browser')
    const browser = await puppeteer.launch(
        {
            headless: false,
            defaultViewport: null
        }
    )
    //args:[`--start-maximized`,`--disable-notifications`]
    const page   = await browser.newPage()
    /*
    await page.setViewport({
        width:1280,
        height:720,
        deviceScaleFactor:1
    })
    */
        
    const recorder = await page.screencast({path:'recording.webm'})
    await page.goto('https://www.prothomalo.com/',{
        waitUntil:'networkidle2'
    })
    //now scroll to bottom of the page
    /*    
    await page.evaluate(()=>{
        window.scrollTo(0,document.body.scrollHeight)
    })
    // scroll to bottom missed header, top navigation bar on screenshot. trying scroll to top again
    await page.evaluate(()=>{
        window.scrollTo(0,0)
    })
    */
   
    // trying code from chatgpt...

    const body = await page.$('body')
    const { height } = await body.boundingBox()
    await body.dispose()

    await page.setViewport({width:1280,height:Math.ceil(height)})
    // GPT Code ENDs here.... It's working

    await page.screenshot(
        {
            path:'prothom-alo.png', 
            fullPage: true
        }
    )
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