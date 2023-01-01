const db = require('../support/db');
const helper = require('../support/helper');
const config = require('../config');
const cacheHandler = require('../support/cachehandler');

async function getForRestaurant(){
  let data =  await helper.getDataFromDBorCache('SELECT paymenttype_id, name, defaulttype FROM paymenttype where restaurant_id = ' +  restaurantId +' order by name',cacheHandler.formatCacheKey("paymenttype"));
  return data;
}
module.exports = {
  getForRestaurant
}