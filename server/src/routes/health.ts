import { Router } from 'express'

export const healthRouter = Router()

healthRouter.get('/health', (_req, res) => {
  res.json({ code: 0, data: { ok: true }, message: 'ok' })
})

