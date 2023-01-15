const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
  const pool = await mysql.createPool(config.db);
  const [results, ] = await pool.query(sql, params);

  return results;
}

module.exports = {
  query
}