const chai = require("chai"),
  expect = chai.expect,
  should = chai.should();
const {
  db,
  models: { User, Project, Source, Note },
} = require("../../server/db");
const _app = require("../../server/index"); // import the app to test
const app = require("supertest")(_app); // import supertest - not actually sure what this does yet

describe("Express route security tests", function () {
  let users;
  this.slow(200);
  this.timeout(5000);
  before(async function () {
    await db.sync({ force: true });
    const _users = await User.bulkCreate(
      [
        { username: "MOE", password: "pwd1" },
        { username: "LUCY", password: "pwd2" },
        { username: "HANNAH", password: "pwd3" },
        { username: "WANDA", password: "pwd4", superuser: true },
        { username: "EDDY", password: "pwd5", superuser: true },
      ]
      // { hooks: false }
    );
    const admins = [_users.filter((user) => user.superuser)];
  });

  describe("the GET /api/user route:", () => {
    it("responds with 418 and the updated user", async () => {
      const response = await app.get(`/api/user`);
      expect(response.status).to.equal(418);
      // expect(response.body).to.("get route");
    });

    it("responds with a user's projects to anyone who asks", async () => {
      const response = await app.get("/api/user/1/projects");
      expect(response.body).to.be.a("array");
      // expect(response.body[0]).to.have.property("name");
    });
  });
  // it("responds with a users projects to any 'superuser' with a valid token", async () => {
  //   const response = await app.get("/api/user/2/projects").send({
  //     name: "NO ONE HERE",
  //   });
  //   expect(response.status).to.equal(404);
  // });
});
// describe("Error Handling", () => {
//   before(() => {
//     console.log(
//       cyan(
//         `
//     HINT: Express documentation on Error Handling:
//     https://expressjs.com/en/guide/error-handling.html \n`
//       )
//     );
//   });

//   const UserMethods = [
//     "findAll",
//     "findOne",
//     "findByPk",
//     "findOrCreate",
//     "create",
//     "bulkCreate",
//     "destroy",
//     "update",
//   ];
//   beforeEach(() => {
//     const error = new Error("OH NO! The database is on fire!");
//     UserMethods.forEach((method) => {
//       sinon.stub(User, method).rejects(error);
//     });
//   });
//   afterEach(() => {
//     UserMethods.forEach((method) => {
//       User[method].restore();
//     });
//   });

//   it("GET /api/users/unassigned", async () => {
//     const response = await app.get("/api/users/unassigned").timeout(200);
//     expect(response.status).to.equal(500);
//   });

//   it("GET /api/users/teachers", async () => {
//     const response = await app.get("/api/users/teachers").timeout(200);
//     expect(response.status).to.equal(500);
//   });

//   it("DELETE /api/users/:id", async () => {
//     const response = await app.delete("/api/users/1").timeout(200);
//     expect(response.status).to.equal(500);
//   });

//   it("POST /api/users", async () => {
//     const response = await app
//       .post("/api/users", { name: "TINA" })
//       .timeout(200);
//     expect(response.status).to.equal(500);
//   });

//   it("PUT /api/users/:id", async () => {
//     const response = await app
//       .put("/api/users/1", { name: "TINA" })
//       .timeout(200);
//     expect(response.status).to.equal(500);
//   });
// });
// });
