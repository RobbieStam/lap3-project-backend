const client = require("./setup-db");

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
      await client.db("tasks").collection("tasks").drop();
      console.log("Collection dropped successfully");
    } catch (e) {
      if (e.code === 26) {
        console.log("Namespace not found, creating a new one...");
      } else {
        console.log(e);
      }
    }

    await client

      .db("tasks")
      .collection("tasks")

      .insertMany([
        {
          task: "Testing backend",
          description: "Testing backend works fine",
          completed_at: `Completed on: ${formattedDate}`,
        },
        {
          task: "Second testing backend with frontend",
          description: "Testing backend and frontend work fine together",
          completed_at: `Completed on: ${formattedDate}`,
        },
      ]);
    console.log("DB Seeded 🌾");
    await client.close();
  } catch (e) {
    console.log(e);
  }
};

seedDB();
