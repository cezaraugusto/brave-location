const fs = require('fs')
const path = require('path')

module.exports = function scanWindowsPath (allowFallback = false) {
  const prefixes = [
    process.env.LOCALAPPDATA,
    process.env.PROGRAMFILES,
    process.env['PROGRAMFILES(X86)']
  ].filter(Boolean)

  const suffixesAll = [
    '\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    '\\BraveSoftware\\Brave-Browser-Beta\\Application\\brave.exe',
    '\\BraveSoftware\\Brave-Browser-Nightly\\Application\\brave.exe'
  ]

  const suffixes = allowFallback ? suffixesAll : [suffixesAll[0]]

  for (const prefix of prefixes) {
    for (const suffix of suffixes) {
      const exe = path.join(prefix, suffix)
      if (fs.existsSync(exe)) return exe
    }
  }

  return null
}
