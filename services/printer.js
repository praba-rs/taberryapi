const db = require('../support/db');
const helper = require('../support/helper');
const cacheHandler = require('../support/cachehandler');

async function getForRestaurant(){
  let data =  await helper.getDataFromDBorCache('SELECT printer_id, name, ipaddress, portnumber, (bill = 1) as bill, (active = 1) as active FROM printer where restaurant_id = ' +  restaurantId +' order by name',cacheHandler.formatCacheKey("printer"));
  return data;
}

async function create(printer){
  const result = await db.query(
    `INSERT INTO printer 
    ( name,restaurant_id, ipaddress,portnumber,active,bill) 
    VALUES ("${printer.name}", ${restaurantId}, "${printer.ipaddress}", "${printer.portnumber}",1, ${printer.bill})`
    );

  let message = 'Error in creating printer';

  if (result.affectedRows) {
    message = 'printer created successfully';
  }

  return {message};
}

async function update(id, printer){
  const result = await db.query(
    `UPDATE printer 
    SET 
    active=${printer.active}
    , name="${printer.name}"
    , ipaddress="${printer.ipaddress}"
    , portnumber="${printer.portnumber}"
    , bill=${printer.bill}
    WHERE restaurant_id=${restaurantId} and printer_id=${id}` 
  );

  let message = 'Error in updating printer';

  if (result.affectedRows) {
    message = 'printer updated successfully';
  }

  return {message};
}  

async function remove(id){
  const result = await db.query(
    `DELETE FROM printer WHERE printer_id=${id}` 
  );

  let message = 'Error in deleting printer';

  if (result.affectedRows) {
    message = 'printer deleted successfully';
  }

  return {message};
}

module.exports = {
  getForRestaurant,
  create,
  update,
  remove
}

