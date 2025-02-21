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
      p.product_id,
      p.product_model,
      p.product_image, 
      p.product_price, 
      p.product_quantity,
      p.product_status,
      p.product_sort_order,
      GROUP_CONCAT(f.feature_name) as features,
      d.product_name,
      d.product_description
    FROM vulcantunes_products p
    LEFT JOIN vulcantunes_products_to_features pf ON p.product_id = pf.product_id
    LEFT JOIN vulcantunes_features f ON pf.feature_id = f.feature_id
    LEFT JOIN vulcantunes_product_descriptions d ON p.product_id = d.product_id
    WHERE p.product_status = 1 OR p.product_quantity > 0
    GROUP BY p.product_id, p.product_model, p.product_image, p.product_price, p.product_quantity, p.product_status, p.product_sort_order, d.product_name, d.product_description
    ORDER BY p.product_sort_order
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
