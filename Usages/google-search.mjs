import p from 'puppeteer'

(async () => {
  const browser = await p.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport({ width: 1680, height: 1050 })
  await page.goto('https://www.google.com')
  await page.type('input[name="q"]', 'Jan Garbarek')
  await page.waitFor(1000)
  const items = await page.$$('.sbct')
  await items[0].click()
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
  await page.screenshot({ path: './screenshots/google-search.jpg', quality: 100 })
  await browser.close()
})()
