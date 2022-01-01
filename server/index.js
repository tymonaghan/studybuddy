// create Express app
const express = require("express"); // npm install --save express
const app = express();

// http logging
const volleyball = require("volleyball"); // npm install --save volleyball
app.use(volleyball);

// static middleware
const path = require("path"); // no npm install needed
const staticMiddleWare = express.static(path.join(__dirname, "../public"));
app.use(staticMiddleWare);

// parse all the bodies; enables use of req.body
const bodyParser = require("body-parser"); // needs npm install --save body-parser
app.use(bodyParser.json()); // for json requests
app.use(bodyParser.urlencoded({ extended: true })); // for url-encoded requests

// some routes
app.use("/api/projects", require("./projects"));
// app.use("/api/sources", require("./sources"));

//login post route:
app.use("/auth", require("./auth"));

//favicon
// app.get("/favicon.ico", (req, res) => {
//   console.log(`reaching favicon express GET route`);
//   res.sendFile(path.join(__dirname, "../public/favicon.ico)"));
// });
// i shouldn't need this bc of the static middleware

// index redirector. how does this work with the 404? idk!
app.get("*", (req, res) => {
  console.log(
    `app.get(*) caught ${req.method} request to ${req.url}\nserving ${path.join(
      __dirname,
      "../public/index.html"
    )}`
  );
  // console.dir(req);
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 404
app.use((req, res, next) => {
  const artificialFourOhFour = new Error("404 not found sucka!");
  next(artificialFourOhFour);
  res.status(404).send("soth knew you were there.");
});

// 500 error handler/logger/we blew it-catcher
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// export router
module.exports = app;
