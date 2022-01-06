const { green, red } = require("chalk");
const {
  db,
  models: { Project, User, Source },
} = require(".");

const seed = async () => {
  try {
    await db.sync({ force: true });
  } catch (error) {
    console.log(red(`error on db.sync: ${error}`));
  }
  try {
    const jimmy = await User.create(
      {
        username: "jimmy",
        password: "jimmay",
        projects: [
          {
            name: "Example Project",
            status: "active",
          },
        ],
      },
      { include: [Project] }
    );

    const ricky = await User.create(
      {
        username: "ricky",
        password: "rickay",
        projects: [
          {
            name: "Example Project",
            status: "active",
          },
        ],
      },
      { include: [Project] }
    );
    const bluey = await User.create(
      {
        username: "bluey",
        password: "bingo",
        projects: [
          {
            name: "Example Project",
            status: "active",
          },
        ],
      },
      { include: [Project] }
    );
  } catch (userError) {
    console.log(red(`error seeding users! ${userError}`));
  }
  try {
    const historyDay = await Project.create({
      name: "history day",
      summary: "debate and diplomacy documentary",
      status: "active",
    });
    const researchPaper = await Project.create({
      name: "research paper",
      summary: "Ms. Morrison's 6th period Social Studies",
      status: "active",
    });
    const biography = await Project.create({
      name: "biography",
      summary: "My Hero: Bandit",
      status: "dormant",
    });
  } catch (projectError) {
    console.log(red(`error seeding projects! ${projectError}`));
  }
  try {
    const fairNoteOne = await Source.create({
      name: "history.com",
      classification: "secondary",
      type: "website",
      authorLastName: "Editors",
      authorFirstName: "History Dot Com",
      publicationDate: "2021-01-19",
      projectId: 1,
    });
    const fairNoteTwo = await Source.create({
      name: "Year of Hope for Farmers in a Free Ghana",
      classification: "secondary",
      type: "newspaper",
      authorLastName: "Appiah-Danquah",
      authorFirstName: "Martin",
      publicationDate: "1958-03-06",
      projectId: 1,
    });
    const fairNoteThree = await Source.create({
      name: "Kwame Nkrumah archives",
      classification: "primary",
      type: "archival document",
      authorLastName: "Nkrumah",
      authorFirstName: "Kwame",
      projectId: 1,
    });
    const fairNoteFour = await Source.create({
      name: "Ghana: The Autobiography of Kwame Nkrumah",
      classification: "primary",
      type: "book",
      authorLastName: "Nkrumah",
      authorFirstName: "Kwame",
      publicationDate: "1957-01-01",
      projectId: 1,
    });
    const biographyNoteOne = await Source.create({
      name: "Britannica encyclopedia",
      classification: "secondary",
      type: "website",
      authorLastName: "Lewis",
      authorFirstName: "James",
      publicationDate: "2022-01-01",
      projectId: 3,
    });
  } catch (sourceError) {
    console.log(red(`error seeding sources! ${sourceError}`));
  }

  try {
    const historyDay = await Project.findOne({
      where: { name: "history day" },
    });
    const jimmy = await User.findOne({ where: { username: "jimmy" } });
    await historyDay.setUser(jimmy);

    const researchPaper = await Project.findOne({
      where: { name: "research paper" },
    });
    await researchPaper.setUser(jimmy);

    const biography = await Project.findOne({
      where: { name: "biography" },
    });
    const bluey = await User.findOne({ where: { username: "bluey" } });
    await biography.setUser(bluey);
  } catch (studentToProjectError) {
    console.log(
      red(`error associating students and projects! ${studentToProjectError}`)
    );
  }
  // try {
  //   // const userList = await User.findAll();
  //   // // console.log(Array.isArray(userList));
  //   // for (let i = 0; i < userList.length; i++) {
  //   //   const currentUser = userList[i];

  //   //   await Source.create({
  //   //     name: "Example Book Source",
  //   //     classification: "secondary",
  //   //     type: "book",
  //   //     authorLastName: "Tilly",
  //   //     authorFirstName: "Syliva",
  //   //     publicationDate: "3189-01-01",
  //   //   });
  //   // }
  // } catch (error) {
  //   console.log(red(`error creating sample sources: ${error}`));
  // }
};

seed()
  .then(() => {
    console.log(green(`seeding successful`));
    db.close();
  })
  .catch((error) => {
    console.error(red(`looks like there was an error. seeding unsuccessful.`));
    console.error(error);
    db.close();
  });
