import p from 'puppeteer'
import devices from 'puppeteer/DeviceDescriptors'

(async () => {
  const browser = await p.launch({ headless: false })
  const page = await browser.newPage()

  const iPhone = devices['iPhone 6']
  await page.emulate(iPhone)

  await page.goto('https://www.sangam.com/login')

  await page.type('#email', 'faiyaz.s@peopleinteractive.in')
  await page.type('#password', 'password')
  await page.click('#loginButton')

  await page.waitForNavigation()
  
  await page.waitFor('#self-card')
  await page.waitFor(2000)
  await page.screenshot({ path: './screenshots/sanam-matches.jpg', quality: 100 })

  await page.click('.nav-icon-home')
  await page.waitFor('.cs-dshbrd-crd')
  await page.waitFor(1000)
  await page.screenshot({ path: './screenshots/sangam-dashboard.jpg', quality: 100 })

  await page.click('.nav-icon-prfl-lst')
  await page.waitFor('.prfl-lst-dsply-img-cntnr')
  await page.waitFor(1000)
  await page.screenshot({ path: './screenshots/sangam-album.jpg', quality: 100 })

  const albums = await page.$$('.prfl-lst-dsply-img-cntnr')
  await albums[0].click()
  await page.waitFor('#self-card')
  await page.waitFor(1000)
  await page.screenshot({ path: './screenshots/sangam-album-match.jpg', quality: 100 })

  await page.close()
})()
