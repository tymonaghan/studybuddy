const { green, red } = require("chalk");
const {
  db,
  models: { Project, User },
} = require(".");

const seed = async () => {
  try {
    await db.sync({ force: true });
  } catch (error) {
    console.log(red(`error on db.sync: ${error}`));
  }
  try {
    const jimmy = await User.create({ username: "jimmy", password: "jimmay" });
    const ricky = await User.create({ username: "ricky", password: "rickay" });
    const bluey = await User.create({ username: "bluey", password: "bingo" });
  } catch (userError) {
    console.log(red(`error seeding users! ${userError}`));
  }
  try {
    const historyDay = await Project.create({
      name: "history day",
      status: "active",
    });
    const researchPaper = await Project.create({
      name: "research paper",
      status: "active",
    });
    const biography = await Project.create({
      name: "biography",
      status: "dormant",
    });
  } catch (projectError) {
    console.log(red(`error seeding projects! ${projectError}`));
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
