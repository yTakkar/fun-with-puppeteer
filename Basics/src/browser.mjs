import p from 'puppeteer'

(async () => {
  const browser = await p.launch()
  const page = await browser.newPage()
  await page.goto('https://www.sangam.com')

  // console.log(await browser.pages())
  // console.log(await browser.defaultBrowserContext())
  console.log(await browser.userAgent())

  await browser.on('disconnected', _ => console.log('DISCONNECTED'))

  await browser.close();
})()