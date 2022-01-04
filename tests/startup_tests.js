// copying and modifying from Pillars tests
const { expect } = require("chai");

const _app = require("../server/index");
const app = require("supertest")(_app);

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
