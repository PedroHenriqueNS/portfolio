import { describe, expect, it } from 'vitest'
import { checkMessages } from '../../scripts/check-messages.mjs'

describe('checkMessages', () => {
  it('reports missing and empty keys', () => {
    expect(checkMessages({ 'pt-br': { a: 'x', b: 'y' }, en: { a: 'x' }, es: { a: 'x', b: '' } })).toEqual([
      'en: falta "b"',
      'es: "b" está vazia',
    ])
  })
  it('accepts complete files', () => {
    expect(checkMessages({ 'pt-br': { a: 'x' }, en: { a: 'x' }, es: { a: 'x' } })).toEqual([])
  })
})
