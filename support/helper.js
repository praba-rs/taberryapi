const db = require("./db");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 600 });

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

async function getDataFromDBorCache(SQL, cachename) {
  let data = myCache.get(cachename);

  if (data == null) {
    console.log("not from cache");
    const rows = await db.query(SQL);
    data = emptyOrRows(rows);
    myCache.set(cachename, data);
  } else {
    console.log("from cache");
  }
  console.log(myCache.keys());
  return data;
}

async function fireCRUD(SQL, CacheKey, failMessage, successMessage) {
  const result = await db.query(SQL);

  myCache.del(CacheKey);

  let message = failMessage;

  if (result.affectedRows) {
    message = successMessage;
  }

  return { message };
}

module.exports = {
  emptyOrRows,
  getDataFromDBorCache,
  fireCRUD,
};
