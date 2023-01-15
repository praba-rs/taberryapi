const express = require('express');
const router = express.Router();
const fooditem = require('../services/fooditem');

/* GET fooditem. */
router.get('/', async function(req, res, next) {
  try {

    res.json(await fooditem.getForRestaurant());
  } catch (err) {
    console.error(`Error while getting foodtiem `, err.message);
    next(err);
  }
});
router.get('/:groupid', async function(req, res, next) {
  try {

    res.json(await fooditem.getForRestaurantItemgroup(req.params.groupid));
  } catch (err) {
    console.error(`Error while getting foodtiem `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await fooditem.create(req.body));
  } catch (err) {
    console.error(`Error while creating fooditem`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await fooditem.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating fooditem`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await fooditem.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting fooditem`, err.message);
    next(err);
  }
});

module.exports = router;