/* eslint-env jasmine */
const fs = require('fs')
const mock = require('mock-require');
const braveLocation = require('../module')

describe('brave-location', function () {
  afterEach(function () {
    mock.stopAll()
  })
  // Must have Brave installed. Commented as GitHub CI doesn't have it.
  // it('outputs brave path as a node module', function (done) {
  //   const location = braveLocation()

  //   expect(fs.existsSync(location)).toBe(true)
  //   expect(location).toBeDefined()
  //   done()
  // })

  it('outputs brave path as a cli', function (done) {
    mock('child_process', {
      spawnSync: (location) => {
        return {stdout: location}
      }
    });

    const location = braveLocation()

    const {spawnSync} = require('child_process');
    const output = spawnSync(location);

    // expect(fs.existsSync(location)).toBe(true)
    expect(output.stdout).toBe(location)
    done()
  })

  it('module: default is strict, allowFallback=true enables cascade', function () {
    const scannerPath = process.platform === 'darwin'
      ? '../scan/scanOsxPath'
      : (process.platform === 'win32'
        ? '../scan/scanWindowsPath'
        : '../scan/scanUnknownPlatformPath')

    mock(scannerPath, (allow) => allow ? 'FALLBACK' : 'STRICT')
    const locate = mock.reRequire('../module')

    expect(locate()).toBe('STRICT')
    expect(locate(true)).toBe('FALLBACK')
  })
})
