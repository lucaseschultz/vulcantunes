import mysql from 'mysql2/promise'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [rows] = await PRODUCT_POOL.execute(`
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
