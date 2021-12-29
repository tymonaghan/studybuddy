const Sequelize = require("sequelize");
const db = require("./database"); // <-- points to database instance
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const axios = require("axios");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  //githubId:{
  //type: Sequelize.INTEGER
  //}
});

module.exports = User;

// User instance methods:
User.prototype.correctPassword = (candidatePwd) => {
  // compare supplied and stored password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = () => {
  console.log(`attempting to generate token. JWT is read as:`);
  console.log(process.env.JWT);
  //generate a user token using the secret stored in enviroment path: JWT
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

User.findByToken = async (token) => {
  // this takes a token as an argument. if valid, returns User instance object.
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw `you don't exist`;
    }
    return user;
  } catch (actualError) {
    console.log(`actual error: ${actualError}`);
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

// hookz:
const hashPassword = async (user) => {
  //anytime password changes, encrypt it and store the hash, not the password.
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};
