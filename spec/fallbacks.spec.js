/* eslint-env jasmine */
const mock = require('mock-require')

describe('brave-location fallbacks', function () {
  afterEach(function () {
    mock.stopAll()
  })

  it('macOS: strict returns null, fallback finds Beta', function () {
    mock('fs', {
      existsSync: (p) => p.includes('Brave Browser Beta.app')
    })

    const scanOsxPath = mock.reRequire('../scan/scanOsxPath')
    const strictResult = scanOsxPath(false)
    const fallbackResult = scanOsxPath(true)

    expect(strictResult).toBeNull()
    expect(fallbackResult).toContain('Brave Browser Beta.app')
  })

  it('Windows: strict returns null; fallback finds Beta/Nightly', function () {
    const originalEnv = { ...process.env }
    delete process.env.PROGRAMFILES
    delete process.env['PROGRAMFILES(X86)']
    process.env.LOCALAPPDATA = 'C\\\\Users\\\\user\\\\AppData\\\\Local'

    mock('fs', {
      existsSync: (p) => p.includes('Brave-Browser-Beta')
    })

    const scanWindowsPath = mock.reRequire('../scan/scanWindowsPath')
    const strictResult = scanWindowsPath(false)
    const fallbackResult = scanWindowsPath(true)

    // restore env
    process.env = originalEnv

    expect(strictResult).toBeNull()
    expect(fallbackResult).toContain('Brave-Browser-Beta')
  })

  it('Unknown/Linux: strict tries only stable; fallback tries beta/nightly on PATH', function () {
    let calls = []
    mock('which', {
      sync: (cmd) => {
        calls.push(cmd)
        if (cmd === 'brave-browser-beta') return '/usr/bin/brave-browser-beta'
        throw new Error('not found')
      }
    })

    const scanUnknown = mock.reRequire('../scan/scanUnknownPlatformPath')
    const strictResult = scanUnknown(false)
    const fallbackResult = scanUnknown(true)
    expect(strictResult).toBeNull()
    expect(fallbackResult).toBe('/usr/bin/brave-browser-beta')
    expect(calls.slice(0, 3)).toEqual(['brave-browser', 'brave-browser', 'brave-browser-beta'])
  })
})


