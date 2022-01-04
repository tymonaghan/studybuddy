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
  } catch (projectError) {
    console.log(red(`error seeding projects! ${projectError}`));
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
