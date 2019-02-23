import p from 'puppeteer'
// const p = require('puppeteer')

(async () => {
  const browser = await p.launch()
  const page = await browser.newPage()
  await page.goto('https://www.sangam.com')
  await page.screenshot({ path: './screenshots/screenshot.jpg', quality: 100, fullPage: true })
  await browser.close()
})()
