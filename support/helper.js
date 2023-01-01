const db = require('./db');
const NodeCache = require( "node-cache" ); 
const myCache = new NodeCache({ stdTTL: 600 });

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}


async function getDataFromDBorCache(SQL,cachename)
{
  let data = myCache.get(cachename);

  if (data == null)
  {
    console.log("not from cache");
    const rows = await db.query(SQL);
    data = emptyOrRows(rows);
    myCache.set(cachename,data);
  }
  else
  {
    console.log("from cache");
  }
  console.log(myCache.keys());
  return data;

}

module.exports = {
  emptyOrRows,
  getDataFromDBorCache
}