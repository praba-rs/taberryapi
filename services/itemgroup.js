const db = require('../support/db');
const helper = require('../support/helper');
const cacheHandler = require('../support/cachehandler');

async function getForRestaurant(){
  let data =  await helper.getDataFromDBorCache('SELECT itemgroup_id, name, (active = 1) as active FROM itemgroup where restaurant_id = ' +  restaurantId +' order by name',cacheHandler.formatCacheKey("ItemGroup"));
  return data;
}

async function create(itemgroup){

  const result = await db.query(
    `INSERT INTO itemgroup 
    (active, name, restaurant_id ) 
    VALUES (1, "${itemgroup.name}", ${restaurantId})`
    );

  let message = 'Error in creating itemgroup';

  if (result.affectedRows) {
    message = 'itemgroup created successfully';
  }

  return {message};
}

async function update(id, itemgroup){
  const result = await db.query(
    `UPDATE itemgroup 
    SET active=${itemgroup.active}
    , name="${itemgroup.name}"
    WHERE restaurant_id=${restaurantId} and itemgroup_id=${id}` 
  );

  let message = 'Error in updating itemgroup';

  if (result.affectedRows) {
    message = 'itemgroup updated successfully';
  }

  return {message};
}  

async function remove(id){
  const result = await db.query(
    `DELETE FROM itemgroup WHERE restaurant_id=${restaurantId} and itemgroup_id=${id}` 
  );

  let message = 'Error in deleting itemgroup';

  if (result.affectedRows) {
    message = 'itemgroup deleted successfully';
  }

  return {message};
}

module.exports = {
  getForRestaurant,
  create,
  update,
  remove
}

