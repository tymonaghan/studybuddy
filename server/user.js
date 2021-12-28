const User = require("./db/User");

const router = require("express").Router();

//all routes prefixed with /api/user
router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
