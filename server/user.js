const router = require("express").Router();
const {
  models: { User, Project },
} = require("./db");

//all routes branch from /api/user/
router.get("/", (req, res, next) => {
  res.status(413).send("reaching /api/user/ get route. payload too large, lol");
});

router.get("/:id/projects", async (req, res, next) => {
  // console.log(`GETting projects for userId ${req.params.id}`);
  const currentUser = await User.findByPk(req.params.id);
  const projects = await currentUser.getProjects();
  // console.dir(projects);
  res.send(projects);
});

module.exports = router;
