import p from 'puppeteer'
import fs from 'fs'
import process from 'process'
import config from '../../config.mjs' 

const dir = `${process.cwd()}/dist/ssr`
const getURL = (path='') => `http://localhost:${config.PORT}/${path}`

const prerender = async url => {
  const browser = await p.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle0' })
  const html = await page.content()
  await browser.close()
  return { html }
}

const ssr = async ({ url, filename }) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  const { html } = await prerender(getURL(url))
  fs.writeFileSync(`${dir}/${filename}.html`, html)
}

config.urlsToParse.forEach(async u => {
  await ssr(u)
})

export default ssr
