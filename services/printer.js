const helper = require('../support/helper');
const config = require('../config');
const cacheHandler = require('../support/cachehandler');

async function getForRestaurant(){
  let data =  await helper.getDataFromDBorCache('SELECT printer_id, name, ipaddress, portnumber, bill FROM printer where restaurant_id = ' +  restaurantId +' and active = 1 order by name',cacheHandler.formatCacheKey("printer"));
  return data;
}
module.exports = {
  getForRestaurant
}