const express = require('express');
const router = express.Router();
const activeorders = require('../services/activeorder');
router.get('/', async function(req, res, next) {
  try {
    
    res.json(await activeorders.getForRestaurant());
  } catch (err) {
    console.error(`Error while getting all activeorders `, err.message);
    next(err);
  }
});

router.get('/:tableID', async function(req, res, next) {
  try {
    
    res.json(await activeorders.getForTable(req.params.tableID));
  } catch (err) {
    console.error(`Error while getting activeorder for table `, err.message);
    next(err);
  }
});



router.post('/', async function(req, res, next) {
  try {
    res.json(await activeorders.create(req.body));
  } catch (err) {
    console.error(`Error while creating activeorders`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await activeorders.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating activeorders`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await activeorders.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting activeorders`, err.message);
    next(err);
  }
});
module.exports = router;