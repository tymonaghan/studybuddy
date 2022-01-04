const express = require("express"); // npm install --save express
const app = express();
const volleyball = require("volleyball"); // npm install --save volleyball
const path = require("path"); // no npm install needed
const bodyParser = require("body-parser"); // needs npm install --save body-parser

// parse all the bodies; enables use of req.body
app.use(bodyParser.json()); // for json requests
app.use(bodyParser.urlencoded({ extended: true })); // for url-encoded requests

// http logging
if (process.env.NODE_ENV !== "testing") {
  console.log(`testing mode OFF. logging enabled`);
  app.use(volleyball);
} else {
  console.log(`testing mode ON. logging disabled`);
}

// some routes
app.use("/api/projects", require("./projects"));
// app.use("/api/sources", require("./sources"));

//login post route:
app.use("/auth", require("./auth"));

// static index/home and static middleware
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);
const staticMiddleWare = express.static(path.join(__dirname, "../public"));
app.use(staticMiddleWare);

// 404
app.use((req, res, next) => {
  // catch any requests to stuff with a file extension and 404
  if (path.extname(req.path).length) {
    const artificialFourOhFour = new Error("404 not found sucka!");
    next(artificialFourOhFour);
    res
      .status(404)
      .send(
        "You are requesting a file that doesn't exist. Please go back and try again"
      );
  } else {
    next();
  }
});

// index redirector for requests without an extension name
app.use("*", (req, res) => {
  //logging:
  console.log(
    `app.use(*) caught ${req.method} request to ${req.url}\nserving ${path.join(
      __dirname,
      "../public/index.html"
    )}`
  ); // end logging
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 500 error handler/logger/we blew it-catcher
// print the error to our console and send the user a generic "internal server error" message
app.use(function (err, req, res) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// export router
module.exports = app;
