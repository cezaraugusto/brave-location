/* eslint-env jasmine */
const mock = require('mock-require')

describe('brave-location fallbacks', function () {
  afterEach(function () {
    mock.stopAll()
  })

  it('macOS: falls back to Beta then Nightly', function () {
    mock('fs', {
      existsSync: (p) => p.includes('Brave Browser Beta.app')
    })

    const scanOsxPath = mock.reRequire('../scan/scanOsxPath')
    const result = scanOsxPath()
    expect(result).toContain('Brave Browser Beta.app')
  })

  it('Windows: handles missing envs and finds Beta/Nightly', function () {
    const originalEnv = { ...process.env }
    delete process.env.PROGRAMFILES
    delete process.env['PROGRAMFILES(X86)']
    process.env.LOCALAPPDATA = 'C\\\\Users\\\\user\\\\AppData\\\\Local'

    mock('fs', {
      existsSync: (p) => p.includes('Brave-Browser-Beta')
    })

    const scanWindowsPath = mock.reRequire('../scan/scanWindowsPath')
    const result = scanWindowsPath()

    // restore env
    process.env = originalEnv

    expect(result).toContain('Brave-Browser-Beta')
  })

  it('Unknown/Linux: tries beta/nightly on PATH', function () {
    let calls = []
    mock('which', {
      sync: (cmd) => {
        calls.push(cmd)
        if (cmd === 'brave-browser-beta') return '/usr/bin/brave-browser-beta'
        throw new Error('not found')
      }
    })

    const scanUnknown = mock.reRequire('../scan/scanUnknownPlatformPath')
    const result = scanUnknown()
    expect(result).toBe('/usr/bin/brave-browser-beta')
    expect(calls.slice(0, 2)).toEqual(['brave-browser', 'brave-browser-beta'])
  })
})


