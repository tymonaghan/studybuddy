const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const AsciiTable = require("ascii-table");
const { cyan } = require("chalk");

const logTable = () => {
  const table = new AsciiTable("users");
  table
    .setHeading("id", "name", "userType", "mentorId")
    .addRow(1, "Bluey", "bingo", 2)
    .addRow(2, "Bingo", "bluey", "null")
    .addRow(3, "Bandit", "chili", "null")
    .addRow(4, "Chili", "bandit", "null");

  console.log(
    `
      We're seeding the database with five sample users so that our
      Express routes have some data to retrieve. The ids may be different,
      but the table would look something like this:\n`
  );
  console.log(table.toString(), "\n");
};

module.exports = {
  logTable,
};
