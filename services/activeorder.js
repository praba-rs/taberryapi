const db = require("../support/db");
const helper = require("../support/helper");

async function getForRestaurant() {
  let data = await db.query(
    "SELECT * FROM activeorder where restaurant_id = " + restaurantId
  );
  return data;
}

async function getForTable(tableID) {
  let data = await db.query(
    "SELECT * FROM activeorder where restaurant_id = " +
      restaurantId +
      " and servingtable_id = " +
      tableID
  );
  return data;
}
async function create(activeorder) {
  let SQL = `INSERT INTO activeorder 
  (restaurant_id, servingtable_id, orderdetails) 
  VALUES (${restaurantId}, ${activeorder.activeorder_id}, "${activeorder.orderdetails} ")`;

  let msg = await helper.fireCRUD(
    SQL,
    "Error in creating activeorder",
    "activeorder created successfully"
  );
  return { msg };
}

async function update(id, activeorder) {
  let SQL = `UPDATE activeorder 
  SET orderdetails="${activeorder.orderdetails}"
  WHERE restaurant_id=${restaurantId} and servingtable_id=${id}`;

  let msg = await helper.fireCRUD(
    SQL,
    "Error in updating activeorder",
    "activeorder updated successfully"
  );
  return { msg };
}

async function remove(id) {
  let SQL = `DELETE FROM activeorder WHERE restaurant_id=${restaurantId} and servingtable_id=${id}`;

  let msg = await helper.fireCRUD(
    SQL,
    "Error in deleting activeorder",
    "activeorder deleted successfully"
  );
  return { msg };
}

module.exports = {
  getForRestaurant,
  getForTable,
  create,
  update,
  remove,
};
