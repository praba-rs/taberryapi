const express = require('express');
const router = express.Router();
const itemgroups = require('../services/itemgroup');
//const users =  require('../services/user');
/* GET itemgroups. */
router.get('/', async function(req, res, next) {
  try {
    //res.json(await itemgroups.getMultiple(req.query.page));
    res.json(await itemgroups.getForRestaurant());
    //res.json(await users.getRestaurantID("fffff","welcome123"));
  } catch (err) {
    console.error(`Error while getting itemgroup `, err.message);
    next(err);
  }
});

module.exports = router;