const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
  const pool = await mysql.createPool(config.db);
  const [results, ] = await pool.query(sql, params);

  return results;
}


// async function query(sql, params) {
//   const connection = await mysql.createConnection(config.db);
//   const [results, ] = await connection.execute(sql, params);

//   return results;
// }


module.exports = {
  query
}