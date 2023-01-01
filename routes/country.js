const express = require('express');
const router = express.Router();
const country = require('../services/country');
/* GET countries. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await country.getAll());
  } catch (err) {
    console.error(`Error while getting country `, err.message);
    next(err);
  }
});

module.exports = router;