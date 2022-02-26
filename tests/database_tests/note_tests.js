// copying and modifying from Pillars tests
const chai = require("chai"),
  expect = chai.expect,
  should = chai.should();

const {
  db,
  models: { User, Project, Source, Note },
} = require("../../server/db");
const { cyan } = require("chalk");

// const { logTable } = require("../setup_tests");

const _app = require("../../server/index"); // import the app to test
const app = require("supertest")(_app); // import supertest - not actually sure what this does yet

describe("NOTE db model tests", function () {
  if (process.env.NODE_ENV !== "testing") {
    this.slow(200);
    this.timeout(3000);
    // allow plenty of time when doing CI tests to heroku test db
    // i basically never want this to timeout unless something is completely dead
  }

  describe("basic note validation", function () {
    it("Notes require a headline", async function () {
      await expect(
        Note.create({ headline: "" }),
        "Note headline can't be empty string"
      ).to.be.rejected;
      await expect(Note.create({}), "Note headline can't be empty string").to.be
        .rejected;
    });
  });
});
