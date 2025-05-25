const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const testConnection = async () => {
  try {
    // Test the database connection with a simple query
    const [rows] = await db.query('SELECT 1');
    console.log('Database connection successful!');
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
};

// Test the connection immediately
testConnection();

module.exports = db;
