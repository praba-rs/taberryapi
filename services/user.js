const helper = require('../support/helper');

async function getAll(){
  let data = await helper.getDataFromDBorCache('SELECT loginname, password, restaurant_id FROM appuser','UserData');
  return data;
}

async function getRestaurantID(uid,pwd){
  let data = (await getAll());

  const rowdata = data.filter(e => e.loginname === uid && e.password === pwd);
  var id = "";
  if (rowdata.length > 0){
    id =  rowdata[0].restaurant_id;
  }
  else
  {
    id =  "null";
  }
  return id;
  
}

module.exports = {
  getAll,
  getRestaurantID
}