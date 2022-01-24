const Sequelize = require("sequelize");
const db = require("./database"); // <-- points to database instance
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { red } = require("chalk");
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
  //newField:{
  //type: Sequelize.DATATYPE
  //}
});

module.exports = User;

// User instance methods:
User.prototype.correctPassword = function (candidatePwd) {
  // compare supplied and stored password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  console.log(`attempting to generate token. JWT is read as:`);
  console.log(process.env.JWT);
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
    const { id } = await jwt.verify(token, process.env.JWT || "atlantis");
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
