const client = require("./setup-db");

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
          task: "History revision",
          description: "Hard",
          completed_at: "11:39PM-9/11/2023",
        },
        {
          task: "Testing backend",
          description: "Using jest to test backend",
          completed_at: "11:39PM-9/09/2023",
        },
        {
          task: "Making timer feature",
          description: "Pomodoro app timer feature",
          completed_at: "12:29PM-9/01/2023",
        },
      ]);
    console.log("DB Seeded 🌾");
    await client.close();
  } catch (e) {
    console.log(e);
  }
};

seedDB();
