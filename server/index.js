require("dotenv").config();
const api = require("./api");
const PORT = process.env.PORT;

api.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
