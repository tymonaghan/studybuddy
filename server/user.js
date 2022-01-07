const router = require("express").Router();
const {
  models: { User, Project },
} = require("./db");

//all routes branch from /api/user/
router.get("/", (req, res, next) => {
  res.status(413).send("reaching /api/user/ get route. payload too large, lol");
});

router.get("/:id/projects", async function (req, res, next) {
  // console.log(`req.params are ${req.params}`);
  // console.dir(req.params);
  if (req.params.id === "undefined") {
    //this is a stupid hack because this gets hit once before userId
    //is defined from the ProjectViewWrapper component. it was throwing (and catching, but still)
    // an error because it was trying to findByPk(undefined)
    res.send({});
  } else {
    try {
      const currentUser = await User.findByPk(req.params.id);
      const projects = await currentUser.getProjects();
      // console.dir(projects);
      res.send(projects);
    } catch (error) {
      console.log(`error getting projects: ${error}`);
    }
  }
});

module.exports = router;
