const router = require("express").Router();
const {
  models: { Project, Source, Note, Claim },
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
    const currentSource = await Source.findByPk(sourceId);
    const currentNotes = await Note.findAll({ where: { sourceId } });
    res.send(currentNotes);
  } catch (error) {
    console.log(`error in router.get /projects/id/source/id: ${error}`);
  }
});

// Get all the notes for a given project
router.get("/:projectId/getNotes", async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const currentProject = await Project.findByPk(projectId);
    const currentSourceList = await currentProject.getSources();
    const currentNotes = await Promise.all(
      currentSourceList.map((source) => {
        return source.getNotes({ include: [Source, Claim] });
      })
    );
    res.status(200).send(currentNotes[0]);
    // need to take a closer look at why this is returning inside of a nested array (using [0] as workaround)
  } catch (error) {
    console.log(`error in the get route for getNotes: ${error}`);
  }
});

//remove source
router.delete("/:projectId/source/:sourceId", async (req, res, next) => {
  try {
    const { projectId, sourceId } = req.params;
    const currentSource = await Source.findByPk(sourceId);
    await currentSource.destroy();
    res.status(200).send(`source deleted.`);
  } catch (error) {
    console.log(`error in router.delete /projects/id/source/id: ${error}`);
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
// expects body: {projectName, userId}
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
    // console.log(currentProject);

    const newSource = await currentProject.createSource(req.body);
    res.status(201).send(newSource);
  } catch (error) {
    console.log(
      `error from the router.post /api/projects/projectId/addSource route: ${error}`
    );
  }
});

//add a new claim to a project's argument
router.post("/:projectId/addClaim", async (req, res, next) => {
  try {
    const { projectId } = req.params;
    // const {claimNumber, claimText}
    const currentProject = await Project.findByPk(projectId);

    const newClaim = await currentProject.createClaim({ ...req.body });
    res.status(200).send(newClaim);
  } catch (error) {
    console.log(`error in the add claim route: ${error}`);
  }
});

// delete a claim from a project
router.delete("/:projectId/claim/:claimId", async (req, res, next) => {
  try {
    const { projectId, claimId } = req.params;
    const currentClaim = await Claim.findOne({
      where: { claimNumber: claimId, projectId: projectId },
    });
    await currentClaim.destroy();
    res.status(200).send({ projectId, claimId });
  } catch (error) {
    console.log(`error in the delete claim route: ${error}`);
  }
});

// update a claim's text
// expects body: {claim: "the new text of the claim"}
// returns the updated claim object
router.put("/:projectId/claim/:claimId", async (req, res, next) => {
  try {
    const { projectId, claimId } = req.params;
    // console.log(`hello, it's your friendly endpoint here.\n
    // projectId:${projectId}\n
    // claimId: ${claimId}\n
    // new claim text: ${req.body.claim}`);
    // console.dir(req);
    const currentClaim = await Claim.findOne({
      where: { claimNumber: claimId, projectId: projectId },
    });
    await currentClaim.update({ claimText: req.body.claim });
    res.status(200).send(currentClaim);
  } catch (error) {
    console.log(`error in the delete claim route: ${error}`);
  }
});

// modify project info
// expects body: a project object
router.put("/:projectId/updateProject", async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const currentProject = await Project.findOne({ where: { id: +projectId } });
    // console.log(currentProject);
    await currentProject.update(req.body);
    res.status(200).send(currentProject);
  } catch (error) {
    console.log(`error from the router.put method: ${error}`);
  }
});

// modify project thesis
// expects body: {thesis: "the text of the new thesis"}
router.put("/:projectId/updateThesis", async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const currentProject = await Project.findOne({ where: { id: projectId } });
    // console.log(currentProject);
    await currentProject.update({ thesis: req.body.thesis });
    res.status(200).send(currentProject);
  } catch (error) {
    console.log(`error from the router.put method: ${error}`);
  }
});

// add a new note to a project
// expects body: a note object
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

router.put(
  "/:projectId/note/:noteId/attachToClaim/:claimId",
  async (req, res, next) => {
    try {
      const currentNote = await Note.findByPk(req.params.noteId);
      await currentNote.setClaim(req.params.claimId);
      res.send(currentNote);
    } catch (error) {
      console.log(`error in the add claim to note PUT route: ${error}`);
    }
  }
);

module.exports = router;
