const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql) {
  const pool = await mysql.createPool(config.db);
  const [results] = await pool.query(sql);

  return results;
}

module.exports = {
  query,
};
