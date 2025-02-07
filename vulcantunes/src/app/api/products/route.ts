import { NextResponse } from 'next/server'
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
})

export async function GET() {
  try {
    const [rows] = await pool.execute(`
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

    return NextResponse.json(rows, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    })

  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )  }
}
