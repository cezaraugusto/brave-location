import {describe, expect, test} from 'vitest'

import braveLocation from '../src/index'

describe('brave-location module', () => {
  it('returns string or null', () => {
    const res = braveLocation()

    expect(typeof res === 'string' || res === null).toBe(true)
  })
})
