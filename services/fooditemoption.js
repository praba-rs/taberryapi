const db = require('../support/db');
const helper = require('../support/helper');
const cacheHandler = require('../support/cachehandler');

async function getForRestaurant(){
  let data =  await helper.getDataFromDBorCache('SELECT itemoption_id, name FROM fooditemoption where restaurant_id = ' +  restaurantId +' order by name',cacheHandler.formatCacheKey("FoodItemoption"));
  return data;
}
async function getForFooditem(itemID){

  let data =  await helper.getDataFromDBorCache('SELECT itemoption_id, name FROM fooditemoption where item_id = ' +  itemID +' order by name',cacheHandler.formatCacheKeyDouble("FoodItemoption", itemID));
  return data;
}
module.exports = {
  getForRestaurant,
  getForFooditem
}