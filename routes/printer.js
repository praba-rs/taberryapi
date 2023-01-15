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

router.post('/', async function(req, res, next) {
  try {
    res.json(await printer.create(req.body));
  } catch (err) {
    console.error(`Error while creating printer`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await printer.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating printer`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await printer.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting printer`, err.message);
    next(err);
  }
});
module.exports = router;