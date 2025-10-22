const fs = require('fs')
const userhome = require('userhome')

module.exports = function scanOsxPath () {
  const apps = [
    { app: 'Brave Browser.app', exec: 'Brave Browser' },
    { app: 'Brave Browser Beta.app', exec: 'Brave Browser Beta' },
    { app: 'Brave Browser Nightly.app', exec: 'Brave Browser Nightly' }
  ]

  const systemBase = '/Applications'
  const userBase = userhome('Applications')

  const candidates = []
  for (const { app, exec } of apps) {
    candidates.push(`${systemBase}/${app}/Contents/MacOS/${exec}`)
    candidates.push(`${userBase}/${app}/Contents/MacOS/${exec}`)
  }

  for (const p of candidates) {
    if (fs.existsSync(p)) return p
  }

  return null
}
