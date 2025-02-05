import mysql from 'mysql2/promise'
import { NextResponse } from 'next/server'

export async function GET() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  })

  try {
    const [rows] = await connection.execute(`
      SELECT 
        product_id, 
        product_model, 
        product_image, 
        product_price, 
        product_quantity,
        product_status
      FROM vulcantunes_products 
      WHERE product_status = 1
      ORDER BY product_sort_order
    `)

    return NextResponse.json(rows)
  } finally {
    await connection.end()
  }
}
