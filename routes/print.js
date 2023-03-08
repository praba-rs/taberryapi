const express = require("express");
const router = express.Router();
const print = require("../services/print");

router.post("/", async function (req, res, next) {
  try {
    res.json(await print.printBillMain(req.body));
  } catch (err) {
    console.error(`Error while printing`, err.message);
    next(err);
  }
});

module.exports = router;
