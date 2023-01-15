const helper = require('../support/helper');


async function getAll(){
  let data = await helper.getDataFromDBorCache('SELECT countrycode, countryname FROM country','country');

  return {
    data
  }
}
module.exports = {
  getAll
}