const router = require("express").Router();
const {
  models: { Project, Source },
} = require("./db");

// all routes branch from
// ###   /api/projects   ###
router.get("/", (req, res, next) => {
  res.status(418).send("reached the /api/projects GET route, good job");
});

router.post("/addNew", (req, res, next) => {
  try {
    const newProject = Project.create({
      name: req.body.project.name,
      status: req.body.project.status,
      userId: req.body.userId,
    });
    res.send(`hi from the add new project route.`);
  } catch (error) {
    console.log(
      `error from the router.post /api/projects/addNew route: ${error}`
    );
  }
});

router.get("/countSources", async (req, res, next) => {
  // res.status(418).send(`you suck!`);
  // res.send(req.body);

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
