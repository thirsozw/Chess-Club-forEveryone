const PREFIX = 'chess4everyone_'

export function saveData<T>(key: string, data: T): void {
  localStorage.setItem(PREFIX + key, JSON.stringify(data))
}

export function loadData<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(PREFIX + key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function clearData(key: string): void {
  localStorage.removeItem(PREFIX + key)
}
