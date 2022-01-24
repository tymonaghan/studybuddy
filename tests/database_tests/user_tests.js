// copying and modifying from Pillars tests
const chai = require("chai"),
  expect = chai.expect,
  should = chai.should();

const {
  db,
  models: { User, Project, Source },
} = require("../../server/db");

const { logTable } = require("../setup_tests");

const _app = require("../../server/index"); // import the app to test
const app = require("supertest")(_app); // import supertest - not actually sure what this does yet

describe("USER tests: creating and reading users", function () {
  if (process.env.NODE_ENV !== "testing") {
    this.slow(200);
    this.timeout(3000);
    // allow plenty of time when doing CI tests to heroku test db
    // i basically never want this to timeout unless something is completely dead
  }

  before(async function () {
    // tasks to perform once before this entire block
    await db.sync({ force: true });
    // let's syncing the db once before all of these tests; don't use the same namespaces
  });
  describe("regular users", function () {
    describe("Basic Fields: name and userType", function () {
      describe("name", function () {
        it("name is a string", async function () {
          const bluey = await User.create({
            username: "BLUEY",
            password: "bingo",
          });
          expect(bluey.username).to.equal(
            "BLUEY",
            "Was not able to create a user with name BLUEY"
          );
        });

        it("name must be unique", async function () {
          // We shouldn't be able to create two users with the same name.
          // await User.create({
          //   username: "BLUEY",
          //   password: "bingo",
          // });
          // above User.create not needed if we're not force-syncing beforeEach
          await expect(
            User.create({
              username: "BLUEY",
              password: "bingo",
            }),
            "Shouldn't be able to create two users with the same name (BLUEY)"
          ).to.be.rejected;
        });

        it("name cannot be null nor empty string", async function () {
          // We shouldn't be able to create a user without a name.
          await expect(
            User.create({ password: "bingo" }),
            "We shouldn't be able to create a user with null username"
          ).to.be.rejected;
          await expect(
            User.create({ username: "", password: "bingo" }),
            "We shouldn't be able to create a user with an empty username"
          ).to.be.rejected;
        });

        it("password cannot be null nor empty string", async function () {
          // We also shouldn't be able to create a user with an empty name.
          await expect(
            User.create({ username: "bingo" }),
            "We shouldn't be able to create a user with null password"
          ).to.be.rejected;
          await expect(
            User.create({ username: "bandit", password: "" }),
            "We shouldn't be able to create a user with an empty password"
          ).to.be.rejected;
        });
      });
    });
  });

  describe("superusers", function () {
    it("users are NOT superusers by default", async function () {
      const ali = await User.create({ username: "ALI", password: "ALI" });
      expect(ali.superuser).to.equal(false);
    });

    it("can create a superuser", async function () {
      const moana = await User.create({
        username: "MOANA",
        password: "navigator",
        superuser: true,
      });
      should.exist(moana);
      expect(moana.superuser).to.equal(true);
    });
  });

  describe("example projects", function () {
    it("created users include an example project automatically", async function () {
      const raya = await User.create({ username: "RAYA", password: "DRAGON" });
      should.exist(raya);
    });
  });
});
