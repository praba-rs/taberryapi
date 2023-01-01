const express = require('express');
const router = express.Router();
const servingtables = require('../services/servingtable');

router.get('/', async function(req, res, next) {
  try {
    //res.json(await itemgroups.getMultiple(req.query.page));
    res.json(await servingtables.getForRestaurant());
  } catch (err) {
    console.error(`Error while getting servingtable `, err.message);
    next(err);
  }
});

router.get('/current', async function(req, res, next) {
  try {
    //res.json(await itemgroups.getMultiple(req.query.page));
    res.json(await servingtables.getCurrentOccupied());
  } catch (err) {
    console.error(`Error while getting servingtable `, err.message);
    next(err);
  }
});

module.exports = router;