const db = require("../support/db");
const helper = require("../support/helper");
const cacheHandler = require("../support/cachehandler");

async function getForRestaurant() {
  let data = await helper.getDataFromDBorCache(
    "SELECT item_id, itemname, (active = 1) as active FROM fooditem where restaurant_id = " +
      restaurantId +
      " order by name",
    cacheHandler.formatCacheKey("FoodItem")
  );
  return data;
}
async function getForRestaurantActive() {
  let data = await helper.getDataFromDBorCache(
    "SELECT item_id, itemname FROM fooditem where restaurant_id = " +
      restaurantId +
      " and active = 1 order by name",
    cacheHandler.formatCacheKey("FoodItemActive")
  );
  return data;
}
async function getForRestaurantItemgroup(itemgroupID) {
  let data = await helper.getDataFromDBorCache(
    "SELECT item_id, itemname, (active = 1) as active FROM fooditem where restaurant_id = " +
      restaurantId +
      " and itemgroup_id = " +
      itemgroupID +
      " order by itemname",
    cacheHandler.formatCacheKeyDouble("FoodItem", itemgroupID)
  );
  return data;
}
async function getForRestaurantItemgroupActive(itemgroupID) {
  let data = await helper.getDataFromDBorCache(
    "SELECT item_id, itemname FROM fooditem where restaurant_id = " +
      restaurantId +
      " and itemgroup_id = " +
      itemgroupID +
      " and active = 1 order by itemname",
    cacheHandler.formatCacheKeyDouble("FoodItemActive", itemgroupID)
  );
  return data;
}

function getCacheKeys() {
  return [
    cacheHandler.formatCacheKey("FoodItem"),
    cacheHandler.formatCacheKey("FoodItemActive"),
  ];
}
async function create(fooditem) {
  let SQL = `INSERT INTO fooditem 
  (active, itemname, price, spiceapplicable, restaurant_id, itemgroup_id, printer_id ) 
  VALUES (1, "${fooditem.itemname}", ${fooditem.price},${fooditem.spiceapplicable},${restaurantId}, ${fooditem.itemgroup_id}, ${fooditem.printer_id})`;
  let ckeys = getCacheKeys();

  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in creating fooditem",
    "fooditem created successfully"
  );
  return { msg };
}

async function update(id, fooditem) {
  let SQL = `UPDATE fooditem 
  SET active=${fooditem.active}
  , itemname="${fooditem.itemname}"
  , price=${fooditem.price}
  , spiceapplicable=${fooditem.spiceapplicable}
  , itemgroup_id=${fooditem.itemgroup_id}
  , printer_id=${fooditem.printer_id}
  WHERE item_id=${id}`;
  let ckeys = getCacheKeys();

  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in updating fooditem",
    "fooditem updated successfully"
  );
  return { msg };
}

async function remove(id) {
  let SQL = `DELETE FROM fooditem WHERE item_id=${id}`;
  let ckeys = getCacheKeys();
  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in deleting fooditem",
    "fooditem deleted successfully"
  );
  return { msg };
}

module.exports = {
  getForRestaurant,
  getForRestaurantActive,
  getForRestaurantItemgroup,
  getForRestaurantItemgroupActive,
  create,
  update,
  remove,
};
