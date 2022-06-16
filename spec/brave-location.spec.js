/* eslint-env jasmine */
const fs = require('fs')
const mock = require('mock-require');
const braveLocation = require('../module')

describe('brave-location', function () {
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
})
