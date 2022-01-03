const User = require("./db/User");

const router = require("express").Router();

//all routes prefixed with /auth
router.post("/login", async (req, res, next) => {
  //should receive {username, password} as req.body (reducer.js loc30)
  // console.dir(req.body);
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  // res.send("hey buuudddy");
  // res.send(req.body);
  console.log(
    `hello from the router.post route which should be at /auth/signup`
  );
  // res.send(
  //   `username is ${req.body.username}\npassword is ${req.body.password}`
  // );
  // console.dir(req.body);
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.send({ token: await user.generateToken() });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.status(401).send("reading username as undefined, inexplicably");
    } else if (error.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(error);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (error) {
    next(error);
    console.log(`error in router.get(/auth/me)`);
  }
});

module.exports = router;
