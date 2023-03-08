const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 600 });
function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function deleteAllCacheForRestaurant(restaurantid) {
  allkeys = myCache.keys();
}

function formatCacheKey(key) {
  return key + "-" + restaurantId;
}

function formatCacheKeyDouble(key, secondID) {
  return formatCacheKey(key) + "-" + secondID;
}

module.exports = {
  formatCacheKey,
  formatCacheKeyDouble,
};
