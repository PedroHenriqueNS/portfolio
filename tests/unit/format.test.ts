import { describe, expect, it } from 'vitest'
import { formatMonth, formatPeriod, yearOf } from '@/lib/format'

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
  it('formats an experience period', () => {
    expect(formatPeriod({ start: '2026-10', current: true }, 'en')).toBe('October 2026 – present')
    expect(formatPeriod({ start: '2025-05', end: '2026-03' }, 'pt-br')).toBe('maio de 2025 – março de 2026')
    expect(formatPeriod({ start: '2021' }, 'es')).toBe('desde 2021')
  })
})
