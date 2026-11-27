import { describe, expect, it } from 'vitest'
import { GROUP_ICON, KIND_ICON } from '../../src/data/icons'

describe('icons', () => {
  it('KIND_ICON tem os 7 tipos de projeto', () => {
    expect(Object.keys(KIND_ICON).sort()).toEqual(['campaign', 'desktop', 'institutional', 'internal', 'mobile', 'saas', 'web'])
    for (const v of Object.values(KIND_ICON)) expect(v).toBeTruthy()
  })
  it('GROUP_ICON tem os 3 grupos de skills', () => {
    expect(Object.keys(GROUP_ICON).sort()).toEqual(['backend', 'featured', 'frontend'])
    for (const v of Object.values(GROUP_ICON)) expect(v).toBeTruthy()
  })
})
