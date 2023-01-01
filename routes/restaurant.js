const express = require('express');
const router = express.Router();
const restaurant = require('../services/restaurant');
//const users =  require('../services/user');
/* GET itemgroups. */
router.get('/current', async function(req, res, next) {
  try {
    res.json(await restaurant.getCurrent());
  } catch (err) {
    console.error(`Error while getting restaurant `, err.message);
    next(err);
  }
});

module.exports = router;