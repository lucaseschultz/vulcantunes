import { NextResponse } from 'next/server'
import { PRODUCT_POOL } from "@/src/app/lib/constants";

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
