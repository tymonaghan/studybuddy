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

describe("USER tests: creating and reading users", () => {
  before(async () => {
    // tasks to perform once before this entire block
    await db.sync({ force: true });
    // let's try just syncing the db once before all of these tests, and writing tests that don't use the same namespaces
    //console.log(cyan(`      Take a look at server/db/User.js\n`));
  });
  describe("regular users", () => {
    beforeEach(() => {
      // i believe this will happen before EACH test in this block (that's a lotta syncs)
      // await db.sync({ force: true });
    });

    describe("Basic Fields: name and userType", () => {
      describe("name", () => {
        it("name is a string", async () => {
          const bluey = await User.create({
            username: "BLUEY",
            password: "bingo",
          });
          expect(bluey.username).to.equal(
            "BLUEY",
            "Was not able to create a user with name BLUEY"
          );
        });

        it("name must be unique", async () => {
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

        it("name cannot be null nor empty string", async () => {
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

        it("password cannot be null nor empty string", async () => {
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

  describe("superusers", () => {
    it("users are NOT superusers by default", async () => {
      const ali = await User.create({ username: "ALI", password: "ALI" });
      expect(ali.superuser).to.equal(false);
    });

    it("can create a superuser", async () => {
      const moana = await User.create({
        username: "MOANA",
        password: "navigator",
        superuser: true,
      });
      should.exist(moana);
      expect(moana.superuser).to.equal(true);
    });
  });

  describe("example projects", () => {
    it("created users include an example project automatically", async () => {
      const raya = await User.create({ username: "RAYA", password: "DRAGON" });
      should.exist(raya);
      //   const example = await Project.findOne({
      //     where: { userId: +raya.id },
      //   });

      //   console.log(example);
      //   // should.exist(example);
      //   expect(example.name).to.equal(false);
    });

    // it("can create a superuser", async () => {
    //   const moana = await User.create({
    //     username: "MOANA",
    //     password: "navigator",
    //     superuser: true,
    //   });
    //   // should.exist(moana);
    //   expect(moana.superuser).to.equal(true);
    // });
  });
});
