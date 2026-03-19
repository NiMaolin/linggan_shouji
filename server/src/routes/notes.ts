import { Router } from 'express'
import type { OkPacket, RowDataPacket } from 'mysql2'
import type { DbPool } from '../db'

export type Note = {
  id: string
  title: string
  content: string | null
  createdAt: string
}

export function createNotesRouter(db: DbPool) {
  const router = Router()

  router.get('/notes', async (_req, res, next) => {
    try {
      const [rows] = await db.query<RowDataPacket[]>(
        'SELECT id, title, content, created_at FROM notes ORDER BY created_at DESC, id DESC LIMIT 100'
      )

      const notes: Note[] = rows.map((r) => ({
        id: String(r.id),
        title: String(r.title),
        content: r.content === null || r.content === undefined ? null : String(r.content),
        createdAt:
          r.created_at instanceof Date ? r.created_at.toISOString() : new Date(String(r.created_at)).toISOString()
      }))

      res.json({ code: 0, data: notes, message: 'ok' })
    } catch (err) {
      next(err)
    }
  })

  router.post('/notes', async (req, res, next) => {
    try {
      const title = typeof req.body?.title === 'string' ? req.body.title.trim() : ''
      const content =
        typeof req.body?.content === 'string' ? (req.body.content as string).trim() : null

      if (!title) {
        res.status(400).json({ code: 400, data: null, message: 'title is required' })
        return
      }

      const [result] = await db.execute<OkPacket>(
        'INSERT INTO notes (title, content) VALUES (?, ?)',
        [title, content && content.length ? content : null]
      )

      res.status(201).json({
        code: 0,
        data: { id: result.insertId.toString() },
        message: 'created'
      })
    } catch (err) {
      next(err)
    }
  })

  return router
}

