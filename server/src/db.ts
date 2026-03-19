import mysql from 'mysql2/promise'

export type DbPool = mysql.Pool

function required(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

export function createPool(): DbPool {
  const host = required('DB_HOST')
  const port = Number(process.env.DB_PORT || 3306)
  const user = required('DB_USER')
  const password = process.env.DB_PASSWORD || ''
  const database = required('DB_NAME')

  return mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 5,
    idleTimeout: 60_000,
    enableKeepAlive: true
  })
}

