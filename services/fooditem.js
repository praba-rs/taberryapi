const db = require('../support/db');
const helper = require('../support/helper');
const config = require('../config');
const cacheHandler = require('../support/cachehandler');

async function getForRestaurant(){
  let data =  await helper.getDataFromDBorCache('SELECT item_id, itemname FROM fooditem where restaurant_id = ' +  restaurantId +' and active = 1 order by name',cacheHandler.formatCacheKey("FoodItem"));
  return data;
}
async function getForRestaurantItemgroup(itemgroupID){

  let data =  await helper.getDataFromDBorCache('SELECT item_id, itemname FROM fooditem where restaurant_id = ' +  restaurantId +' and itemgroup_id = '+ itemgroupID+' and active = 1 order by itemname',cacheHandler.formatCacheKeyDouble("FoodItem", itemgroupID));
  return data;
}
module.exports = {
  getForRestaurant,
  getForRestaurantItemgroup
}