import { getStorageItem, setStorageItem } from './storage'

describe('storage utils', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  describe('getStorageItem', () => {
    it('returns the fallback when the key is missing', () => {
      expect(getStorageItem('missing-key', 'fallback')).toBe('fallback')
    })

    it('returns the parsed value when the key is present', () => {
      window.localStorage.setItem('my-key', JSON.stringify({ value: 42 }))

      expect(getStorageItem('my-key', { value: 0 })).toEqual({ value: 42 })
    })

    it('returns the fallback when the stored value is not valid JSON', () => {
      window.localStorage.setItem('broken-key', '{not valid json')

      expect(getStorageItem('broken-key', 'fallback')).toBe('fallback')
    })
  })

  describe('setStorageItem', () => {
    it('stores the value as JSON', () => {
      setStorageItem('my-key', { value: 42 })

      expect(window.localStorage.getItem('my-key')).toBe(JSON.stringify({ value: 42 }))
    })
  })
})
