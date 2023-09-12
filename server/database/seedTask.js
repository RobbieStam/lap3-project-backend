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

    let date = new Date();
    let formattedDate =
      date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) +
      " " +
      date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    await client

      .db("tasks")
      .collection("tasks")

      .insertMany([
        {
          task: "History revision",
          description: "Hard",
          completed_at: "hello",
        },
        {
          task: "Testing backend",
          description: "Using jest to test backend",
          completed_at: "Formatted Date:",
          formattedDate,
        },
        {
          task: "Making timer feature",
          description: "Pomodoro app timer feature",
          completed_at: formattedDate,
        },
        {
          task: "Testing to update",
          description: "testing please work",
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
