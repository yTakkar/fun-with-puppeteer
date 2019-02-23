import p from 'puppeteer'

(async () => {
  const browser = await p.launch({ headless: false })
  const page = await browser.newPage()

  await page.setViewport({ width: 1680, height: 1050 })
  await page.goto('https://www.youtube.com')
  
  const vidItems = 'ytd-thumbnail.ytd-video-renderer'
  await page.type('#search', 'Jan Garbarek')
  await page.click('button#search-icon-legacy')
  await page.waitForSelector(vidItems)
  await page.screenshot({
    path: './screenshots/yt-search.jpg',
    fullPage: true,
    quality: 100
  })
  const videos = await page.$$(vidItems)
  await videos[2].click()
  await page.waitForSelector('.html5-video-container')
  await page.waitFor(5000)
  await page.screenshot({
    path: './screenshots/yt-search-player.jpg',
    quality: 100
  })
  await page.close()
})()
