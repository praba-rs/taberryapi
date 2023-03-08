const db = require("../support/db");
const helper = require("../support/helper");
const cacheHandler = require("../support/cachehandler");

async function getForRestaurant() {
  let data = await helper.getDataFromDBorCache(
    "SELECT printer_id, name, ipaddress, portnumber, (bill = 1) as bill, (active = 1) as active FROM printer where restaurant_id = " +
      restaurantId +
      " order by name",
    cacheHandler.formatCacheKey("printer")
  );
  return data;
}

function getCacheKeys() {
  return [cacheHandler.formatCacheKey("printer")];
}

async function create(printer) {
  let SQL = `INSERT INTO printer 
  ( name,restaurant_id, ipaddress,portnumber,active,bill) 
  VALUES ("${printer.name}", ${restaurantId}, "${printer.ipaddress}", "${printer.portnumber}",1, ${printer.bill})`;
  let ckeys = getCacheKeys();

  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in creating printer",
    "printer added successfully"
  );
  return { msg };
}

async function update(id, printer) {
  let SQL = `UPDATE printer 
  SET 
  active=${printer.active}
  , name="${printer.name}"
  , ipaddress="${printer.ipaddress}"
  , portnumber="${printer.portnumber}"
  , bill=${printer.bill}
  WHERE restaurant_id=${restaurantId} and printer_id=${id}`;
  let ckeys = getCacheKeys();

  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in updating printer",
    "printer updated successfully"
  );
  return { msg };
}

async function remove(id) {
  let SQL = `DELETE FROM printer WHERE printer_id=${id}`;
  let ckeys = getCacheKeys();

  let msg = await helper.fireCRUD(
    SQL,
    ckeys,
    "Error in deleting printer",
    "printer deleted successfully"
  );

  return { msg };
}

module.exports = {
  getForRestaurant,
  create,
  update,
  remove,
};
