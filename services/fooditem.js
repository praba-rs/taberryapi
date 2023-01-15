const db = require('../support/db');
const helper = require('../support/helper');
const cacheHandler = require('../support/cachehandler');

async function getForRestaurant(){
  let data =  await helper.getDataFromDBorCache('SELECT item_id, itemname FROM fooditem where restaurant_id = ' +  restaurantId +' and active = 1 order by name',cacheHandler.formatCacheKey("FoodItem"));
  return data;
}
async function getForRestaurantItemgroup(itemgroupID){

  let data =  await helper.getDataFromDBorCache('SELECT item_id, itemname FROM fooditem where restaurant_id = ' +  restaurantId +' and itemgroup_id = '+ itemgroupID+' and active = 1 order by itemname',cacheHandler.formatCacheKeyDouble("FoodItem", itemgroupID));
  return data;
}

async function create(fooditem){

  const result = await db.query(
    `INSERT INTO fooditem 
    (active, itemname, price, spiceapplicable, restaurant_id, itemgroup_id, printer_id ) 
    VALUES (1, "${fooditem.itemname}", ${fooditem.price},${fooditem.spiceapplicable},${restaurantId}, ${fooditem.itemgroup_id}, ${fooditem.printer_id})`
    );

  let message = 'Error in creating fooditem';

  if (result.affectedRows) {
    message = 'fooditem created successfully';
  }

  return {message};
}

async function update(id, fooditem){
  const result = await db.query(
    `UPDATE fooditem 
    SET active=${fooditem.active}
    , itemname="${fooditem.itemname}"
    , price=${fooditem.price}
    , spiceapplicable=${fooditem.spiceapplicable}
    , itemgroup_id=${fooditem.itemgroup_id}
    , printer_id=${fooditem.printer_id}
    WHERE item_id=${id}` 
  );

  let message = 'Error in updating fooditem';

  if (result.affectedRows) {
    message = 'fooditem updated successfully';
  }

  return {message};
}  

async function remove(id){
  const result = await db.query(
    `DELETE FROM fooditem WHERE item_id=${id}` 
  );

  let message = 'Error in deleting fooditem';

  if (result.affectedRows) {
    message = 'fooditem deleted successfully';
  }

  return {message};
}

module.exports = {
  getForRestaurant,
  getForRestaurantItemgroup,
  create,
  update,
  remove
}
