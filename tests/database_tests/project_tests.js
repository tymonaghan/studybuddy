// copying and modifying from Pillars tests
const chai = require("chai"),
  expect = chai.expect,
  should = chai.should();

const {
  db,
  models: { User, Project, Source },
} = require("../../server/db");

// const { logTable } = require("../setup_tests");

const _app = require("../../server/index"); // import the app to test
const app = require("supertest")(_app); // import supertest - not actually sure what this does yet

describe("PROJECT tests: creating and reading projects", function () {
  if (process.env.NODE_ENV !== "testing") {
    this.slow(200);
    this.timeout(3000);
    // allow plenty of time when doing CI tests to heroku test db
    // i basically never want this to timeout unless something is completely dead
  }

  before(async function () {
    // tasks to perform once before this entire block
    await db.sync({ force: true });
    const userOne = await User.create({
      username: "testuser1",
      password: "pwd",
    });
    const userTwo = await User.create({
      username: "testuser2",
      password: "pwd",
    });
  });
  describe("basic project validation", function () {
    it("Projects require a name", async function () {
      await expect(
        Project.create({ name: "" }),
        "Project name can't be empty string"
      ).to.be.rejected;
      await expect(Project.create({}), "Project name can't be empty string").to
        .be.rejected;
    });

    it("project can be created with only a name and sets defaults correctly", async function () {
      // We shouldn't be able to create two users with the same name.
      const project1 = await Project.create({ name: "Project1" });
      should.exist(project1);
      expect(project1.name).to.equal(
        "Project1",
        "incorrectly set project name"
      );
      expect(project1.status).to.equal(
        "active",
        "status did not default to active"
      );
      expect(project1.trashed).to.equal(
        false,
        "project trashed state is not false"
      );
    });
  });
});
