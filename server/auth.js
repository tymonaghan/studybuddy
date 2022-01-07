const User = require("./db/User");
const {
  models: { Project, Source },
  ProjectHasManySources,
} = require("./db");

const router = require("express").Router();

//all routes prefixed with /auth

router.get("/getUserByToken", async function (req, res, next) {
  try {
    // console.log(
    //   `here we are inside the getUserByToken route. req.headers.authorization:`
    // );
    // console.dir(req.headers.authorization);
    res.send(await User.findByToken(req.headers.authorization));
  } catch (error) {
    next(error);
    console.log(`error in router.get(/auth/getUserByToken)`);
  }
});

router.post("/login", async (req, res, next) => {
  //should receive {username, password} as req.body (reducer.js loc30)
  // console.dir(req.body);
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(
      {
        // the destructured req.body did not work here for whatever reason
        // create a new user based on the object passed in as req
        username: req.body.username,
        password: req.body.password,
        projects: [
          {
            name: "Example Project",
            summary:
              "This project was created automatically. Check it out to explore StudyBuddy features.",
            status: "active",
          },
        ],
      },
      {
        include: [Project, Source],
      }
    );
    const exampleSource = await Source.create({
      name: "Example Book Source",
      classification: "secondary",
      type: "book",
      authorLastName: "Tilly",
      authorFirstName: "Syliva",
      publicationDate: "3189-01-01",
      notes:
        "These notes were added automatically. You can replace them with your own notes.",
    });

    // associate the new user, project, and source together here:
    // const exampleProject=await Project.findOne({where:{id:req.body.username,}})
    // exampleSource.setProject()

    res.send({ token: await user.generateToken() }); // generate and return their token
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      res
        .status(401)
        .send(
          "You must enter a username. This error should have been caught on the front end with a controlled input."
        );
    } else if (error.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists. Select a different username.");
    } else {
      next(error);
    }
  }
});

module.exports = router;
