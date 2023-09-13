const client = require("./setup-db");

const { ObjectId } = require("mongodb");

const userId = "613b3c5a24d59045f4f0e3f1";

let date = new Date();
let formattedDate =
  date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }) +
  " " +
  date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

const seedDB = async () => {
  try {
    await client.connect();
    console.log("Awaiting Seed 🌱");
    try {
      await client.db("pomodogo").collection("tasks").drop();
      console.log("Collection dropped successfully");
    } catch (e) {
      if (e.code === 26) {
        console.log("Namespace not found, creating a new one...");
      } else {
        console.log(e);
      }
    }

    await client
      .db("pomodogo")
      .collection("tasks")
      .insertMany([
        {
          userId: new ObjectId(userId),
          task: "Testing backend",
          description: "Testing backend works fine",
          completed_at: formattedDate,
        },
        {
          userId: new ObjectId(userId),
          task: "Second testing backend with frontend",
          description: "Testing backend and frontend work fine together",
          completed_at: formattedDate,
        },
      ]);
    console.log("DB Seeded 🌾");
    await client.close();
  } catch (e) {
    console.log(e);
  }
};

seedDB();
