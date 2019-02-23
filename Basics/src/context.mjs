import p from 'puppeteer'

(async () => {
  const browser = await p.launch({ defaultViewport: {
    isMobile: true,
    width: 360,
    hasTouch: true,
    height: 600,
  } })
  const context = await browser.createIncognitoBrowserContext()

  console.log('isIncognito', await context.isIncognito());

  const page = await context.newPage()
  await page.goto('https://www.sangam.com')
  await browser.close()
})()