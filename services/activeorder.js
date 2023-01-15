const db = require('../support/db');

async function getForRestaurant(){
    let data =  await db.query('SELECT * FROM activeorder where restaurant_id = ' +  restaurantId );
    return data;
  }

async function create(activeorder){
    const result = await db.query(
      `INSERT INTO activeorder 
      (restaurant_id, servingtable_id, orderdetails) 
      VALUES (${restaurantId}, ${activeorder.activeorder_id}, "${activeorder.orderdetails} ")`
      );
  
    let message = 'Error in creating activeorder';
  
    if (result.affectedRows) {
      message = 'order created successfully';
    }
  
    return {message};
  }

  async function update(id, activeorder){
    const result = await db.query(
      `UPDATE activeorder 
      SET orderdetails="${activeorder.orderdetails}"
      WHERE restaurant_id=${restaurantId} and servingtable_id=${id}` 
    );
  
    let message = 'Error in updating activeorder';
  
    if (result.affectedRows) {
      message = 'activeorder updated successfully';
    }
  
    return {message};
  }  

  async function remove(id){
    const result = await db.query(
      `DELETE FROM activeorder WHERE restaurant_id=${restaurantId} and servingtable_id=${id}` 
    );
  
    let message = 'Error in deleting activeorder';
  
    if (result.affectedRows) {
      message = 'activeorder deleted successfully';
    }
  
    return {message};
  }

  module.exports = {
    getForRestaurant,
    create,
    update,
    remove
}

