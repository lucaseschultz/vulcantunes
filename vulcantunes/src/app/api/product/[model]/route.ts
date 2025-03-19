import { NextResponse } from 'next/server'
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
})

export async function GET(
  request: Request,
  { params }: { params: { model: string } }
) {
  try {
    const resolvedParams = await (params as unknown as Promise<typeof params>);
    const productModel = resolvedParams.model;

    if (!productModel || !/^[A-Z0-9_]+$/.test(productModel)) {
      return NextResponse.json(
        { error: 'Invalid product model' },
        { status: 400 }
      );
    }

    const [rows] = await pool.execute(`
    SELECT 
      p.product_id,
      p.product_model,
      p.product_image,
      p.product_price,
      p.product_quantity,
      p.product_status,
      p.product_sort_order,
      d.product_name,
      d.product_description,
      GROUP_CONCAT(DISTINCT f.feature_name) as features,
      GROUP_CONCAT(DISTINCT CONCAT(
        po.product_options_name, ':',
        pov.product_option_values_name, ':',
        pa.options_values_price, ':',
        pa.price_prefix, ':',
        po.product_options_type, ':',
        pa.attribute_default
      )) as options
    FROM vulcantunes_products p
            LEFT JOIN vulcantunes_product_descriptions d ON p.product_id = d.product_id
            LEFT JOIN vulcantunes_products_to_features pf ON p.product_id = pf.product_id
            LEFT JOIN vulcantunes_features f ON pf.feature_id = f.feature_id
            LEFT JOIN vulcantunes_product_attributes pa ON p.product_id = pa.product_id
            LEFT JOIN vulcantunes_product_options po ON pa.options_id = po.product_options_id
            LEFT JOIN vulcantunes_product_option_values pov ON pa.options_values_id = pov.product_option_values_id
    WHERE p.product_model = ?
    GROUP BY p.product_id, d.product_name, d.product_description
    LIMIT 1
    `, [productModel]);

    const products = rows as any[];

    if (!products.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(products[0], {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=600',
        'ETag': `"product-${productModel}"`,
        'Vary': 'Accept-Encoding'
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({
      error: 'Failed to fetch product',
      code: 'DB_ERROR',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
