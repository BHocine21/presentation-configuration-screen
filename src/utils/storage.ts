export const getStorageItem = <T>(key: string, fallback: T): T => {
  const rawValue = window.localStorage.getItem(key)
  if (rawValue === null) {
    return fallback
  }

  try {
    return JSON.parse(rawValue) as T
  } catch {
    return fallback
  }
}

export const setStorageItem = <T>(key: string, value: T): void => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
