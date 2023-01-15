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


router.post('/', async function(req, res, next) {
  try {
    res.json(await paymenttype.create(req.body));
  } catch (err) {
    console.error(`Error while creating paymenttype`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await paymenttype.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating paymenttype`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await paymenttype.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting paymenttype`, err.message);
    next(err);
  }
});
module.exports = router;