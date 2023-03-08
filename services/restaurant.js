const helper = require("../support/helper");
const cacheHandler = require("../support/cachehandler");

async function getCurrent() {
  let data = await helper.getDataFromDBorCache(
    "SELECT * FROM restaurant where restaurant_id = " + restaurantId,
    cacheHandler.formatCacheKey("restaurant")
  );
  return data;
}
module.exports = {
  getCurrent,
};
