import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { createPool } from './db'
import { healthRouter } from './routes/health'
import { createNotesRouter } from './routes/notes'

dotenv.config()

const app = express()

app.use(express.json({ limit: '1mb' }))

// Dev-friendly default; in Vite dev we'll mainly rely on proxy.
app.use(
  cors({
    origin: true,
    credentials: true
  })
)

app.use('/api', healthRouter)
app.use('/api', createNotesRouter(createPool()))

app.use((_req, res) => {
  res.status(404).json({ code: 404, data: null, message: 'not found' })
})

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = err instanceof Error ? err.message : 'unknown error'
  res.status(500).json({ code: 500, data: null, message })
})

const port = Number(process.env.PORT || 3001)
app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`)
})

