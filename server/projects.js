const router = require("express").Router();
const {
  models: { Project, Source },
} = require("./db");

// all routes branch from
// ###   /api/projects   ###
router.get("/", (req, res, next) => {
  res.status(418).send("reached the /api/projects GET route, good job");
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
