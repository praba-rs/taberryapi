const express = require('express');
const router = express.Router();
const paymenttype = require('../services/paymenttype');

router.get('/', async function(req, res, next) {
  try {
    //res.json(await itemgroups.getMultiple(req.query.page));
    res.json(await paymenttype.getForRestaurant());
  } catch (err) {
    console.error(`Error while getting paymenttype `, err.message);
    next(err);
  }
});

module.exports = router;