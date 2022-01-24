// copying and modifying from Pillars tests
const chai = require("chai"),
  expect = chai.expect,
  should = chai.should();

const _app = require("../../server/index"); // import the app to test
const app = require("supertest")(_app); // import supertest - not actually sure what this does yet

describe("Basic GET routes", () => {
  it("allows connections to project", async () => {
    const response = await app.get("/");
    expect(response.status).to.equal(200);
  });
  it("/api/projects returns special message", async () => {
    const response = await app.get("/api/projects");
    expect(response.status).to.equal(418);
  });
});
