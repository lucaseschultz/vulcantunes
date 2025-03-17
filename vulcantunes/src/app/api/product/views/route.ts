import { NextResponse } from 'next/server';
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 30000,
  maxIdle: 10,
  idleTimeout: 60000
});

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();

    if (!productId || isNaN(Number(productId))) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    await pool.execute(`
      UPDATE vulcantunes_product_descriptions 
      SET product_viewed = product_viewed + 1 
      WHERE product_id = ?
    `, [productId]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({
      error: 'Failed to update view count',
      code: 'DB_ERROR',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
