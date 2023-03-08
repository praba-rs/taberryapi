const express = require("express");
const app = express();
const port = 4000;
const restaurantRouter = require("./routes/restaurant");
const itemgroupRouter = require("./routes/itemgroup");
const countryRouter = require("./routes/country");
const servingtableRouter = require("./routes/servingtable");
const fooditemRouter = require("./routes/fooditem");
const activeorderRouter = require("./routes/activeorder");
const printerRouter = require("./routes/printer");
const printRouter = require("./routes/print");
const fooditemoptionRouter = require("./routes/fooditemoption");
const paymenttypeRouter = require("./routes/paymenttype");
const appuser = require("./services/user");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

async function authentication(req, res, next) {
  var authheader = req.headers.authorization;

  if (!authheader) {
    var err = new Error(
      "You are not authenticated, credentials not provided..."
    );
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    return next(err);
  }
  var auth = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var user = auth[0];
  var pwd = auth[1];

  global.restaurantId = await appuser.getRestaurantID(user, pwd);

  if (restaurantId === "null") {
    res.json("User id or password is not correct");
  }
  next();
}
app.use(authentication);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/restaurant", restaurantRouter);
app.use("/itemgroup", itemgroupRouter);
app.use("/servingtable", servingtableRouter);
app.use("/fooditem", fooditemRouter);
app.use("/activeorder", activeorderRouter);
app.use("/printer", printerRouter);
app.use("/print", printRouter);
app.use("/fooditemoption", fooditemoptionRouter);
app.use("/paymenttype", paymenttypeRouter);
app.use("/country", countryRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
