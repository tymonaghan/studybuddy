const router = require("express").Router();
const {
  models: { Project, Source, Note },
} = require("./db");

// all routes branch from
// ###   /api/projects   ###
router.get("/", (req, res, next) => {
  res.status(418).send("reached the /api/projects GET route, good job");
});

// Get Source by ID
router.get("/:projectId/source/:sourceId", async (req, res, next) => {
  try {
    const { projectId, sourceId } = req.params;
    const currentSource = Source.findByPk(sourceId);
    const currentNotes = await Note.findAll({ where: { sourceId } });
    res.send(currentNotes);
  } catch (error) {
    console.log(`error in router.get /projects/id/source/id: ${error}`);
  }
});

// get all sources for project by ID
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

// add a new project
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

// add a new source to a project
router.post("/:projectId/addSource", async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const currentProject = await Project.findByPk(projectId);
    console.log(currentProject);

    const newSource = await currentProject.createSource(req.body);
    res.status(200).send(newSource);
  } catch (error) {
    console.log(
      `error from the router.post /api/projects/projectId/addSource route: ${error}`
    );
  }
});

// add a new note to a project
router.post("/:projectId/source/:sourceId/addNote", async (req, res, next) => {
  try {
    const { sourceId } = req.params;
    const newNote = req.body;
    // console.log(req.body);
    const currentSource = await Source.findByPk(sourceId);
    // console.log(Object.keys(currentSource.__proto__));
    const addedNote = await currentSource.createNote(newNote);
    res.status(201).send(addedNote);
  } catch (error) {
    console.log(`error in the add new note to project express route: ${error}`);
  }
});

// count number of sources
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
