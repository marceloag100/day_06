const puppeteer = require('puppeteer')

var domains = require('./example.json')
var errorDomains = []

async function generateSS () {
  for (let i = 0; i < domains.length; i++) {
    const domain = domains[i]
    await console.log(domain.url)
    var webUrl = 'http://www.' + domain.url
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    try {
      await page.goto(webUrl, { waitUntil: 'networkidle2' })
      await page.setViewport({
        width: 1366,
        height: 800
      })
      await page.screenshot({ path: `./captures/${domain.url}.png` })
      await browser.close()
    } catch (e) {
      errorDomains.push(domain.url)
      browser.close()
    }
  }
  console.log(errorDomains)
}

generateSS()
