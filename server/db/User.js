const Sequelize = require("sequelize");
const db = require("./database"); // <-- points to database instance
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { red } = require("chalk");
const Project = require("./Project");
// const axios = require("axios");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  superuser: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;

// User instance methods:
User.prototype.correctPassword = async function (candidatePwd) {
  // console.log(`correctPasword`);
  // compare supplied and stored password
  return await bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  //generate a user token using the secret stored in enviroment path: JWT (this isn't working!)
  return jwt.sign({ id: this.id }, process.env.JWT || "atlantis");
};

// User class methods:
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: { username }, // destructure username: username
  });
  if (!user || !(await user.correctPassword(password))) {
    // if the user doesn't exist or if the wrong password is supplied, creatre and throw error
    const error = Error("incorrect username/password errorid:01");
    error.status = 401;
    throw error;
  }
  //otherwise, generate and return a token for the user
  return user.generateToken();
};

User.findByToken = async function (token) {
  // this takes a token as an argument. if valid, returns User instance object.
  try {
    // console.log(`JWT is: `);
    // console.dir(process.env.JWT);
    const { id } = jwt.verify(token, process.env.JWT || "atlantis");
    const user = await User.findByPk(id);
    if (!user) {
      throw `That user doesn't seem to exist.`;
    }
    return user;
  } catch (actualError) {
    console.log(`actual error: ${actualError}`);
    const error = Error(
      red(
        "The token supplied was not recognized. This usually means that you tried to sign on to a different version of the project than the version where you created the token/account."
      )
    );

    error.status = 401;
    throw error;
  }
};

// hookz:
User.beforeCreate(async (user) => {
  //anytime password changes, encrypt it and store the hash, not the password.
  const hashedPw = await bcrypt.hash(user.password, SALT_ROUNDS);
  user.password = hashedPw;
});

User.beforeUpdate(async (user) => {
  //anytime password changes, encrypt it and store the hash, not the password.
  const hashedPw = await bcrypt.hash(user.password, SALT_ROUNDS);
  user.password = hashedPw;
});

User.afterCreate(async (user) => {
  // console.log(Object.keys(user.__proto__));
  await user.createProject({
    name: "Example Project",
    summary:
      "This project was created automatically. Check it out to explore StudyBuddy features.",
    status: "active",
    topic:
      "Starship Diplomacy: The formation of the United Federation of Planets",
    thesis:
      "The formation of the United Federation of Planets would not be possible without the warp technology developed by Zefram Cochrane, and similar technology developed by the other founding species of the Federation.",
  });
});
