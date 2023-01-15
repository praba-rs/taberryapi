const express = require('express');
const router = express.Router();
const itemgroup = require('../services/itemgroup');
/* GET itemgroups. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await itemgroup.getForRestaurant());
  } catch (err) {
    console.error(`Error while getting itemgroup `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await itemgroup.create(req.body));
  } catch (err) {
    console.error(`Error while creating itemgroup`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await itemgroup.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating itemgroup`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await itemgroup.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting itemgroup`, err.message);
    next(err);
  }
});

module.exports = router;