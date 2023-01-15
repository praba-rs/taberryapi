const db = require('../support/db');
const helper = require('../support/helper');
const cacheHandler = require('../support/cachehandler');

async function getForRestaurant(){
  let data =  await helper.getDataFromDBorCache('SELECT paymenttype_id, name, defaulttype FROM paymenttype where restaurant_id = ' +  restaurantId +' order by name',cacheHandler.formatCacheKey("paymenttype"));
  return data;
}

async function create(paymenttype){
  const result = await db.query(
    `INSERT INTO paymenttype 
    (active, name, restaurant_id, defaultType ) 
    VALUES (1, "${paymenttype.name}", ${restaurantId}, ${paymenttype.defaultType})`
    );

  let message = 'Error in creating paymenttype';

  if (result.affectedRows) {
    message = 'paymenttype created successfully';
  }

  return {message};
}

async function update(id, paymenttype){
  const result = await db.query(
    `UPDATE paymenttype 
    SET active=${paymenttype.active}
    , name="${paymenttype.name}"
    , defaultType=${paymenttype.defaultType}
    WHERE restaurant_id=${restaurantId} and paymenttype_id=${id}` 
  );

  let message = 'Error in updating paymenttype';

  if (result.affectedRows) {
    message = 'paymenttype updated successfully';
  }

  return {message};
}  

async function remove(id){
  const result = await db.query(
    `DELETE FROM paymenttype WHERE restaurant_id=${restaurantId} and paymenttype_id=${id}` 
  );

  let message = 'Error in deleting paymenttype';

  if (result.affectedRows) {
    message = 'paymenttype deleted successfully';
  }

  return {message};
}

module.exports = {
  getForRestaurant,
  create,
  update,
  remove
}

