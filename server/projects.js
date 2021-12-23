const router = require("express").Router();

// all routes branch from
// ###   /api/projects   ###
router.get("/", (req, res, next) => {
  res.send("reached the /api/projects GET route, good job");
});

module.exports = router;
