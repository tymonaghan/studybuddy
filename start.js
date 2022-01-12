const { db } = require("./server/db");
const app = require("./server");

// listen for requests
const port = process.env.PORT || 3030; // this can be very useful if you deploy to Heroku!

const start = async () => {
  try {
    //uncomment the next line to force db sync (drop all entries):
    // await db.sync({ force: true }).then(() => {
    //uncomment the next line to sync without force (keep existing table intact)
    db.sync().then(() => {
      app.listen(port, () => {
        console.log(`Snake, tune your Codec to frequency ${port}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

start();
