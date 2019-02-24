import express from 'express'
import path from 'path'
import process from 'process'
import config from '../config.mjs'

const dir = process.cwd()
const app = express()

const trimPath = path => path.replace('/', '')
const containsQ = req => req.query.ssr === 'true'
const validURL = req => config.urlsToParse.some(u => u.url === trimPath(req.path))

const getSSRFile = p => {
  let seoPage = ''
  if (p === '/') seoPage = path.resolve(dir, 'dist/ssr', 'index.html')
  else seoPage = path.resolve(dir, 'dist/ssr', `${trimPath(p)}.html`)
  return seoPage
}

const ssr = req => {
  const doSSR = containsQ(req) && validURL(req)
  let content = ''
  if (doSSR) content = getSSRFile(req.path)
  else content = path.join(dir, 'dist', `index.html`)
  return content
}

app.use(express.static(path.resolve(dir, 'dist')));

app.get('/users', async (req, res) => {
  const file = ssr(req)
  res.sendFile(file)
})

app.listen(config.PORT, () => {
  console.log(`App running on ${config.PORT}..`)
})
