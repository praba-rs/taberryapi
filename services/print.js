const { json } = require("express");
const db = require("../support/db");
const activeorder = require("./activeorder");
const bill = require("../support/bill");

async function printBillMain(order) {
  const orderObj = order;
  // const orderObj = JSON.parse(order);
  //return orderObj.OrderedItems;
  return bill.getAllText(orderObj);
  //send data to printbuffer token
  //send data history tables
  //delete row from activeorder
}

async function printBillDuplicate() {}

async function printToken(tableID) {
  let data = activeorder.getForTable(tableID);
  //if active order available for table
  if (data != null) {
    //send data to printbuffertoken
    //update the json
    //write back to active order table
  }
}
module.exports = {
  printBillMain,
  printBillDuplicate,
  printToken,
};
