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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    const [rows] = await pool.execute(`
    SELECT 
      p.product_id, 
      p.product_image, 
      p.product_price, 
      p.product_quantity,
      p.product_status,
      p.product_sort_order,
      GROUP_CONCAT(f.feature_name) as features
    FROM vulcantunes_products p
    LEFT JOIN vulcantunes_products_to_features pf ON p.product_id = pf.product_id
    LEFT JOIN vulcantunes_features f ON pf.feature_id = f.feature_id
    WHERE p.product_status = 1 AND p.product_id = ?
    GROUP BY p.product_id, p.product_image, p.product_price, p.product_quantity, p.product_status, p.product_sort_order
    `, [productId]);

    const products = rows as any[];

    if (products.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(products[0], {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    })

  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
