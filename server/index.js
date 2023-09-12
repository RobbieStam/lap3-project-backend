require("dotenv").config();
const api = require("./api");
const PORT = process.env.PORT;

let date = new Date();
let formattedDate =
  date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }) +
  " " +
  date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

api.listen(PORT, () => {
  console.log(`API running on port ${PORT}`, formattedDate);
});
