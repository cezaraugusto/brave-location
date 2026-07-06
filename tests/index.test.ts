import {describe, expect, test} from 'vitest'

import braveLocation, {getInstallGuidance} from '../src/index'

describe('brave-location module', () => {
  it('returns string or null', () => {
    const res = braveLocation()

    expect(typeof res === 'string' || res === null).toBe(true)
  })

  it('getInstallGuidance renders caller-provided install steps in order', () => {
    const msg = getInstallGuidance({
      steps: [
        {
          summary: 'Install Brave (recommended)',
          command: 'npx extension install brave'
        },
        {
          summary: 'Install Brave Nightly',
          command: 'npx extension install brave-nightly'
        }
      ]
    })

    expect(msg).toMatch(
      /1\) Install Brave \(recommended\)\n {3}npx extension install brave/
    )
    expect(msg).toMatch(
      /2\) Install Brave Nightly\n {3}npx extension install brave-nightly/
    )
    expect(msg).not.toMatch(/from the official site/)
    expect(msg).toMatch(/We couldn't find a Brave browser/)
  })

  it('getInstallGuidance with empty steps keeps the default hint', () => {
    expect(getInstallGuidance({steps: []})).toBe(getInstallGuidance())
  })
})
