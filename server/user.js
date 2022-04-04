const router = require("express").Router();
const {
  models: { User, Project, Claim },
} = require("./db");

//all routes branch from /api/user/
router.get("/", (req, res, next) => {
  res.status(418).send("reaching /api/user/ get route.");
});

router.get("/:id/projects", async function (req, res, next) {
  try {
    const currentUser = await User.findByPk(req.params.id);
    const projects = await currentUser.getProjects({ include: Claim });
    // console.dir(projects);
    res.send(projects);
  } catch (error) {
    console.log(`error getting projects: ${error.stack}`);
  }
});

module.exports = router;
