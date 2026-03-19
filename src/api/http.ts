export type ApiEnvelope<T> = {
  code: number
  data: T
  message: string
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {})
    }
  })

  const json = (await res.json()) as ApiEnvelope<T>
  if (!res.ok || json.code !== 0) {
    throw new Error(json?.message || `Request failed (${res.status})`)
  }
  return json.data
}

