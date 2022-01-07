const router = require("express").Router();
const {
  models: { Project, Source },
} = require("./db");

// all routes branch from
// ###   /api/projects   ###
router.get("/", (req, res, next) => {
  res.status(418).send("reached the /api/projects GET route, good job");
});

router.get("/:projectId/getSources", async (req, res, next) => {
  try {
    const currentSources = await Source.findAll({
      where: { projectId: req.params.projectId },
    });
    // const currentSources = await t.getSources(currentProject);
    // console.log(Object.keys(currentProject.__proto__));
    // console.dir(currentSources);
    res.send(currentSources);
  } catch (error) {
    console.log(
      `error in router.get /api/projects/:projectId/getSources: ${error.stack}`
    );
  }
});

router.post("/addNew", async (req, res, next) => {
  try {
    const newProject = await Project.create({
      name: req.body.projectName,
      userId: req.body.userId,
      summary: "This is a user-created project. You can edit this summary.",
    });
    res.status(201).send(newProject);
  } catch (error) {
    console.log(
      `error from the router.post /api/projects/addNew route: ${error}`
    );
  }
});

router.get("/countSources", async (req, res, next) => {
  //this was supposed to be a helper function to count the number of notes but it still didn't
  // work when called from within a .map. it's not currently doing anything.

  const projectsArray = req.body;
  const newProjectsArray = [];

  projectsArray.map(async (project) => {
    const projectId = project.id;
    newProjectsArray.push(project);
    const numSources = await countSources(projectId);
  });

  res.send(newProjectsArray);
});

countSources = async (projectId) => {
  return await Source.count({ where: { projectId: projectId } });
};

module.exports = router;
