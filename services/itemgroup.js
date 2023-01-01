const helper = require('../support/helper');
const config = require('../config');
const cacheHandler = require('../support/cachehandler');

async function getForRestaurant(){
  let data =  await helper.getDataFromDBorCache('SELECT itemgroup_id, name FROM itemgroup where restaurant_id = ' +  restaurantId +' and active = 1 order by name',cacheHandler.formatCacheKey("ItemGroups"));
  return data;
}
module.exports = {
  getForRestaurant
}