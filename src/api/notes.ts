import { apiFetch } from './http'

export type Note = {
  id: string
  title: string
  content: string | null
  createdAt: string
}

export async function listNotes(): Promise<Note[]> {
  return apiFetch<Note[]>('/api/notes')
}

export async function createNote(input: { title: string; content?: string }): Promise<{ id: string }> {
  return apiFetch<{ id: string }>('/api/notes', {
    method: 'POST',
    body: JSON.stringify({ title: input.title, content: input.content ?? null })
  })
}

