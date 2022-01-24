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
  describe("Sequelize", () => {
    before(async () => {
      // tasks to perform once before this entire block
      await db.sync({ force: true });
      // let's try just syncing the db once before all of these tests, and writing tests that don't use the same namespaces
      //console.log(cyan(`      Take a look at server/db/User.js\n`));
    });

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

  describe("superUser checks", () => {
    it("users are NOT superusers by default", async () => {
      const ali = await User.create({ username: "ALI", password: "ALI" });
      expect(ali.superuser).to.equal(false);
    });

    it("can create a superuser", async () => {
      const moana = User.create({
        username: "MOANA",
        password: "navigator",
        admin: true,
      });
      should.exist(moana);
      expect(moana.admin).to.equal(true);
    });
  });
});

//   describe("Class Method: findUnassignedStudents", () => {
//     it("User.findUnassignedStudents is a class method", () => {
//       expect(User.findUnassignedStudents).to.be.a(
//         "function",
//         "findTeachersAndMentees isn't a class method"
//       );
//     });

//     it("User.findUnassignedStudents returns all students who do not have a mentor", async () => {
//       const freddy = await User.create({
//         name: "FREDDY",
//         userType: "TEACHER",
//       });
//       await Promise.all([
//         User.create({ name: "JERRY", mentorId: freddy.id }),
//         User.create({ name: "ALI" }),
//         User.create({ name: "SARAH" }),
//       ]);
//       const unassignedStudents = await User.findUnassignedStudents();
//       expect(unassignedStudents).to.be.a(
//         "array",
//         "User.findUnassignedStudents should return (a Promise that resolves to) an array"
//       );
//       expect(unassignedStudents).to.have.lengthOf(
//         2,
//         "There should be only two unassigned students"
//       );
//       const studentNames = unassignedStudents.map((student) => student.name);
//       expect(studentNames).to.have.members(["ALI", "SARAH"]);
//     });
//   });
// });

// describe("Express", () => {
//   before(() => {
//     console.log(cyan(`      Take a look at server/routes/users.js`));
//   });

//   before(() => {
//     logTable();
//     /*
//       We're seeding the database with five sample users so that our
//       Express routes have some data to retrieve. The ids may be different,
//       but the table would look something like this:
//       .-----------------------------------.
//       |               users               |
//       |-----------------------------------|
//       | id |  name  | userType | mentorId |
//       |----|--------|----------|----------|
//       |  1 | MOE    | STUDENT  |        2 |
//       |  2 | LUCY   | TEACHER  | null     |
//       |  3 | HANNAH | TEACHER  | null     |
//       |  4 | WANDA  | STUDENT  | null     |
//       |  5 | EDDY   | STUDENT  | null     |
//       '-----------------------------------'
//     */
//   });

//   beforeEach(async () => {
//     await db.sync({ force: true });
//     const _users = await Promise.all([
//       User.create({ name: "MOE" }),
//       User.create({ name: "LUCY", userType: "TEACHER" }),
//       User.create({ name: "HANNAH", userType: "TEACHER" }),
//       User.create({ name: "WANDA" }),
//       User.create({ name: "EDDY" }),
//     ]);
//     const [moe, lucy] = _users;
//     await moe.setMentor(lucy, { hooks: false });
//   });

//   describe("GET /api/users/unassigned", () => {
//     it("responds with all unassigned students", async () => {
//       const response = await app.get("/api/users/unassigned");
//       expect(response.status).to.equal(200);
//       expect(response.body).to.be.an("array");
//       const names = response.body.map((user) => user.name);
//       expect(names).to.include("WANDA");
//       expect(names).to.include("EDDY");
//     });

//     it("does not include any teachers in the response", async () => {
//       const response = await app.get("/api/users/unassigned");
//       const names = response.body.map((user) => user.name);
//       expect(names).to.not.include(
//         "LUCY",
//         "LUCY is a teacher, but was included in the response"
//       );
//       expect(names).to.not.include(
//         "HANNAH",
//         "HANNAH is a teacher, but was included in the response"
//       );
//     });

//     it("does not include any students who have a mentor", async () => {
//       const response = await app.get("/api/users/unassigned");
//       const names = response.body.map((user) => user.name);
//       expect(names).to.not.include(
//         "MOE",
//         "Students with a mentor should not be included"
//       );
//       expect(response.body.length).to.equal(2);
//     });
//   });
// });
// });
