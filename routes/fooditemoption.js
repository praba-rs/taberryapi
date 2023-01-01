const express = require('express');
const router = express.Router();
const fooditemoption = require('../services/fooditemoption');

router.get('/', async function(req, res, next) {
  try {

    res.json(await fooditemoption.getForRestaurant());
  } catch (err) {
    console.error(`Error while getting fooditemoption `, err.message);
    next(err);
  }
});
router.get('/:itemid', async function(req, res, next) {
  try {

    res.json(await fooditemoption.getForFooditem(req.params.itemid));
  } catch (err) {
    console.error(`Error while getting fooditemoption `, err.message);
    next(err);
  }
});

module.exports = router;