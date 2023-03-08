const db = require("../support/db");
const helper = require("../support/helper");
const cacheHandler = require("../support/cachehandler");

async function getForRestaurant() {
  let data = await helper.getDataFromDBorCache(
    "SELECT servingtable_id, name FROM servingtable where restaurant_id = " +
      restaurantId +
      " order by name",
    cacheHandler.formatCacheKey("ServingTable")
  );
  return data;
}
async function getCurrentOccupied() {
  let data = await db.query(
    "SELECT servingtable_id FROM activeorder where restaurant_id = " +
      restaurantId +
      " order by servingtable_id"
  );
  return data;
}

function getCacheKeys() {
  return [cacheHandler.formatCacheKey("ServingTable")];
}

async function create(servingtable) {
  let SQL = `INSERT INTO servingtable 
  (code, name, restaurant_id) 
  VALUES ("${servingtable.code}", "${servingtable.name}", ${restaurantId})`;
  let ckeys = getCacheKeys();

  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in creating servingtable",
    "servingtable added successfully"
  );
  return { msg };
}

async function update(id, servingtable) {
  let SQL = `UPDATE servingtable 
  SET code="${servingtable.code}"
  , name="${servingtable.name}" 
  WHERE restaurant_id=${restaurantId} and servingtable_id=${id}`;
  let ckeys = getCacheKeys();

  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in updating servingtable",
    "servingtable updated successfully"
  );
  return { msg };
}

async function remove(id) {
  let SQL = `DELETE FROM servingtable WHERE restaurant_id=${restaurantId} and servingtable_id=${id}`;
  let ckeys = getCacheKeys();

  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in deleting servingtable",
    "servingtable deleted successfully"
  );
  return { msg };
}

module.exports = {
  getForRestaurant,
  getCurrentOccupied,
  create,
  update,
  remove,
};
