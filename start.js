const { db } = require("./server/db");
const app = require("./server");

// listen for requests
const port = process.env.PORT || 3030; // this can be very useful if you deploy to Heroku!
// db.sync({ force: true }).then(() => {
db.sync().then(() => {
  app.listen(port, () => {
    console.log(`Snake, tune your Codec to frequency ${port}`);
  });
});
