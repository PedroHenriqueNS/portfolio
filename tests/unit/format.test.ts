import { describe, expect, it } from 'vitest'
import { formatMonth, yearOf } from '@/lib/format'

describe('format', () => {
  it('formats months per locale', () => {
    expect(formatMonth('2024-12', 'pt-br')).toBe('dezembro de 2024')
    expect(formatMonth('2024-12', 'en')).toBe('December 2024')
    expect(formatMonth('2024-12', 'es')).toBe('diciembre de 2024')
    expect(formatMonth(undefined, 'en')).toBeUndefined()
  })
  it('extracts the year', () => {
    expect(yearOf('2026-10')).toBe('2026')
    expect(yearOf(undefined)).toBeUndefined()
  })
})
