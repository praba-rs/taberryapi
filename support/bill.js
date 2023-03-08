//const StringBuilder = require("node-stringbuilder");
const restaurant = require("../services/restaurant");
const config = require("../config");
const { json } = require("express");

var linefeed;
var linewidth;
constructor(linefeed, linewidth);
{
  this.linefeed = "\r\n";
  this.linewidth = config.app.printwidth;
}

async function getAllText(order) {
  var text = "";
  text = getHeader();
  console.log("sdsdsd");
  text += order.PaymentTypeID;
  //  text.appendline(order.PaymentTypeID);
  var myRestaurant = restaurant.getCurrent();
  //const myRestaurant = restaurant.getCurrent().PaymentTypeID;
  //const myRestaurant = JSON.parse(JSON.stringify(restaurant.getCurrent()));

  //console.log(typeof myRestaurant);

  // for (let element of myRestaurant) {
  //   for (let e of element) {
  //     console.log(e);
  //   }
  // }

  return myRestaurant;
}

async function getHeader() {
  const myRestaurant = restaurant.getCurrent();
  // const myRestaurant = JSON.parse(restaurant.getCurrent());

  var headerstr = "";
  headerstr += textWhenNotEmpty(myRestaurant.name);
  headerstr += textWhenNotEmpty(myRestaurant.address1);
  headerstr += textWhenNotEmpty(myRestaurant.address2);
  headerstr += textWhenNotEmpty(myRestaurant.address3);
  headerstr += textWhenNotEmpty(myRestaurant.phone);
  headerstr += printLine();

  // appendWhenNotEmpty(text, myRestaurant.name);
  // appendWhenNotEmpty(text, myRestaurant.address1);
  // appendWhenNotEmpty(text, myRestaurant.address2);
  // appendWhenNotEmpty(text, myRestaurant.address3);
  // appendWhenNotEmpty(text, myRestaurant.phone);
  // printLine(sb);
}

async function appendWhenNotEmpty(sb, str1) {
  if (str1 != null && str1.trim()) {
    sb.appendline(str1);
    sb.appendline(this.linefeed);
  }
}

async function textWhenNotEmpty(str1) {
  var str = "";
  if (str1 != null && str1.trim()) {
    str += str1;
    str += this.linefeed;
  }
  return str;
}
// async function printLine(sb) {
//   sb.appendline("-".repeat(this.linewidth));
//   sb.appendline(this.linefeed);
// }

async function printLine() {
  return "-".repeat(this.linewidth) + this.linefeed;
}
module.exports = {
  getAllText,
};
