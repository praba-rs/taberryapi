const express = require('express');
const router = express.Router();
const servingtable = require('../services/servingtable');

router.get('/', async function(req, res, next) {
  try {
    //res.json(await itemgroups.getMultiple(req.query.page));
    res.json(await servingtable.getForRestaurant());
  } catch (err) {
    console.error(`Error while getting servingtable `, err.message);
    next(err);
  }
});

router.get('/current', async function(req, res, next) {
  try {
    //res.json(await itemgroups.getMultiple(req.query.page));
    res.json(await servingtable.getCurrentOccupied());
  } catch (err) {
    console.error(`Error while getting servingtable `, err.message);
    next(err);
  }
});


router.post('/', async function(req, res, next) {
  try {
    res.json(await servingtable.create(req.body));
  } catch (err) {
    console.error(`Error while creating servingtable`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await servingtable.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating servingtable`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await servingtable.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting servingtable`, err.message);
    next(err);
  }
});
module.exports = router;