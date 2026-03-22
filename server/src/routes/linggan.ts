import { Router } from 'express'
import type { OkPacket } from 'mysql2'
import type { DbPool } from '../db'

export function createLingganRouter(db: DbPool) {
  const router = Router()

  // POST /api/linggan — 保存灵感内容
  router.post('/linggan', async (req, res, next) => {
    try {
      const content =
        typeof req.body?.content === 'string' ? req.body.content.trim() : ''

      if (!content) {
        res.status(400).json({ code: 400, data: null, message: 'content is required' })
        return
      }

      const [result] = await db.execute<OkPacket>(
        'INSERT INTO T_linggan (content) VALUES (?)',
        [content]
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
