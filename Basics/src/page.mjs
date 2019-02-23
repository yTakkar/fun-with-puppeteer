import p from 'puppeteer'
import devices from 'puppeteer/DeviceDescriptors'

(async () => {
  const browser = await p.launch({ headless: false })
  const page = await browser.newPage()

  const iphone = devices['iPhone 6']
  await page.emulate(iphone)

  await page.setRequestInterception(true)

  page.on('console', msg => console.log(msg.text()));

  page.on('request', request => {
    if (request.resourceType() === 'font') return request.abort()
    request.continue()
  })

  // page.on('requestfinished', async request => {
  //   if (request.resourceType() === 'xhr' && request.method() === 'GET') {
  //     console.log('request')
  //     console.log('resourceType: ', request.resourceType())
  //     console.log('method: ', request.method())
  //     console.log('response: ', await request.response().json());
  //     console.log('url: ', request.url());
  //     console.log(`
  //   `)
  //   }
  // })

  page.on('domcontentloaded', () => console.log('domcontentloaded'))

  await page.goto('https://www.sangam.com/login', { waitUntil: 'networkidle0' })

  // const elem = await page.$eval('#root', element => element.innerHTML)
  // console.log(elem);

  // const hrefs = await page.$$eval('a', hrefs => {
  //   return hrefs.map(a => a.href)
  // });
  // console.log(hrefs);

  // const h = await page.evaluate(() => {
  //   const href = document.querySelectorAll('a')
  //   return [...href].map(a => a.href)
  // })
  // console.log('evaluate');
  // console.log(h)

  // await page.click('button')

  // await page.exposeFunction('hellofy', text => `Hello, ${text}!!`);
  
  // await page.evaluate(async () => {
  //   const myHash = await window.hellofy('faiyaz');
  //   console.log('window.myHash', myHash);
  // });

  // await page.type('input[type="email"]', 'Hello, World!!')

  // const inputValue = await page.$eval('input[type="email"]', input => input.getAttribute('value'))
  // console.log(inputValue)

  await browser.close()
})()
