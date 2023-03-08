const db = require("../support/db");
const helper = require("../support/helper");
const cacheHandler = require("../support/cachehandler");

async function getForRestaurant() {
  let data = await helper.getDataFromDBorCache(
    "SELECT itemgroup_id, name, (active = 1) as active FROM itemgroup where restaurant_id = " +
      restaurantId +
      " order by name",
    cacheHandler.formatCacheKey("ItemGroup")
  );
  return data;
}

async function getForRestaurantActive() {
  let data = await helper.getDataFromDBorCache(
    "SELECT itemgroup_id, name FROM itemgroup where restaurant_id = " +
      restaurantId +
      " and active = 1 order by name",
    cacheHandler.formatCacheKey("ItemGroupActive")
  );
  return data;
}

function getCacheKeys() {
  return [
    cacheHandler.formatCacheKey("ItemGroup"),
    cacheHandler.formatCacheKey("ItemGroupActive"),
  ];
}

async function create(itemgroup) {
  let SQL = `INSERT INTO itemgroup 
  (active, name, restaurant_id ) 
  VALUES (1, "${itemgroup.name}", ${restaurantId})`;

  let ckeys = getCacheKeys();

  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in creating itemgroup",
    "itemgroup created successfully"
  );
  return { msg };
}

async function update(id, itemgroup) {
  let SQL = `UPDATE itemgroup 
  SET active=${itemgroup.active}
  , name="${itemgroup.name}"
  WHERE restaurant_id=${restaurantId} and itemgroup_id=${id}`;

  let ckeys = getCacheKeys();
  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in updating itemgroup",
    "activeorder updated successfully"
  );
  return { msg };
}

async function remove(id) {
  let SQL = `DELETE FROM itemgroup WHERE restaurant_id=${restaurantId} and itemgroup_id=${id}`;
  let ckeys = getCacheKeys();

  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in deleting itemgroup",
    "itemgroup deleted successfully"
  );
  return { msg };
}
module.exports = {
  getForRestaurant,
  getForRestaurantActive,
  create,
  update,
  remove,
};
