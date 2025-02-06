import mysql from "mysql2/promise";

export const PRODUCT_POOL = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export const FEATURE_FILTERS = {
  "Bluetooth": false,
  "USB Charger": false,
  "AUX Input": false,
  "AUX Output": false,
  "Audio Jack": false
} as const
