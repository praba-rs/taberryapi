const db = require("../support/db");
const helper = require("../support/helper");
const cacheHandler = require("../support/cachehandler");

async function getForRestaurant() {
  let data = await helper.getDataFromDBorCache(
    "SELECT paymenttype_id, name, defaulttype FROM paymenttype where restaurant_id = " +
      restaurantId +
      " order by name",
    cacheHandler.formatCacheKey("paymenttype")
  );
  return data;
}

function getCacheKeys() {
  return [cacheHandler.formatCacheKey("paymenttype")];
}

async function create(paymenttype) {
  let SQL = `INSERT INTO paymenttype 
  (active, name, restaurant_id, defaultType ) 
  VALUES (1, "${paymenttype.name}", ${restaurantId}, ${paymenttype.defaultType})`;
  let ckeys = getCacheKeys();

  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in creating paymenttype",
    "paymenttype added successfully"
  );
  return { msg };
}

async function update(id, paymenttype) {
  let SQL = `UPDATE paymenttype 
  SET active=${paymenttype.active}
  , name="${paymenttype.name}"
  , defaultType=${paymenttype.defaultType}
  WHERE restaurant_id=${restaurantId} and paymenttype_id=${id}`;
  let ckeys = getCacheKeys();

  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in updating paymenttype",
    "paymenttype updated successfully"
  );
  return { msg };
}

async function remove(id) {
  let SQL = `DELETE FROM paymenttype WHERE restaurant_id=${restaurantId} and paymenttype_id=${id}`;
  let ckeys = getCacheKeys();

  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in deleting paymenttype",
    "paymenttype deleted successfully"
  );
  return { msg };
}

module.exports = {
  getForRestaurant,
  create,
  update,
  remove,
};
