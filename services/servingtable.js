const db = require('../support/db');
const helper = require('../support/helper');
const config = require('../config');
const cacheHandler = require('../support/cachehandler');

async function getForRestaurant(){
  let data =  await helper.getDataFromDBorCache('SELECT servingtable_id, name FROM servingtable where restaurant_id = ' +  restaurantId +' order by name',cacheHandler.formatCacheKey("ServingTable"));
  return data;
}
async function getCurrentOccupied(){
  let data =  await db.query('SELECT servingtable_id FROM activeorder where restaurant_id = ' +  restaurantId +' order by servingtable_id');
  return data;
}
module.exports = {
  getForRestaurant,
  getCurrentOccupied
}