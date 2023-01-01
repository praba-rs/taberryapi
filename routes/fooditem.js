const express = require('express');
const router = express.Router();
const fooditems = require('../services/fooditem');

/* GET fooditem. */
router.get('/:groupid', async function(req, res, next) {
  try {

    res.json(await fooditems.getForRestaurantItemgroup(req.params.groupid));
    //res.json(await users.getRestaurantID("fffff","welcome123"));
  } catch (err) {
    console.error(`Error while getting foodtiem `, err.message);
    next(err);
  }
});

module.exports = router;