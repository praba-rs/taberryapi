const db = require('../support/db');
const helper = require('../support/helper');
const config = require('../config');


async function getAll(){
  let data = await helper.getDataFromDBorCache('SELECT countrycode, countryname FROM country','country');

  return {
    data
  }
}
module.exports = {
  getAll
}