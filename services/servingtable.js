const db = require('../support/db');
const helper = require('../support/helper');
const cacheHandler = require('../support/cachehandler');

async function getForRestaurant(){
  let data =  await helper.getDataFromDBorCache('SELECT servingtable_id, name FROM servingtable where restaurant_id = ' +  restaurantId +' order by name',cacheHandler.formatCacheKey("ServingTable"));
  return data;
}
async function getCurrentOccupied(){
  let data =  await db.query('SELECT servingtable_id FROM activeorder where restaurant_id = ' +  restaurantId +' order by servingtable_id');
  return data;
}


async function create(servingtable){
  const result = await db.query(
    `INSERT INTO servingtable 
    (code, name, restaurant_id) 
    VALUES ("${servingtable.code}", "${servingtable.name}", ${restaurantId})`
    );

  let message = 'Error in creating servingtable';

  if (result.affectedRows) {
    message = 'servingtable created successfully';
  }

  return {message};
}

async function update(id, servingtable){
  const result = await db.query(
    `UPDATE servingtable 
    SET code="${servingtable.code}"
    , name="${servingtable.name}" 
    WHERE restaurant_id=${restaurantId} and servingtable_id=${id}` 
  );

  let message = 'Error in updating servingtable';

  if (result.affectedRows) {
    message = 'servingtable updated successfully';
  }

  return {message};
}  

async function remove(id){
  const result = await db.query(
    `DELETE FROM servingtable WHERE restaurant_id=${restaurantId} and servingtable_id=${id}` 
  );

  let message = 'Error in deleting servingtable';

  if (result.affectedRows) {
    message = 'servingtable deleted successfully';
  }

  return {message};
}


module.exports = {
  getForRestaurant,
  getCurrentOccupied,
  create,
  update,
  remove
}