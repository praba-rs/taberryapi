const express = require('express');
const router = express.Router();
const printer = require('../services/printer');
router.get('/', async function(req, res, next) {
  try {
    res.json(await printer.getForRestaurant());
  } catch (err) {
    console.error(`Error while getting printer `, err.message);
    next(err);
  }
});

module.exports = router;