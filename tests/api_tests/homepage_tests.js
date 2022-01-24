const { expect } = require("chai");
const _app = require("../../server/index");
const app = require("supertest")(_app);

describe("homepage_tests", () => {
  it("homepage main div with id of 'app' exists", async () => {
    const response = await app.get("/");
    // console.log(`response to app.get /`);
    // console.dir(response.text);
    expect(response.text).to.include('main id="app"');
  });
});
