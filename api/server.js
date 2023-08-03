const express = require("express");
const app = express();
const db = require("./config/db");
const storageRoutes = require("./routes/storage");
const packageRoutes = require("./routes/package");
const packageMovement = require("./routes/movement");

const PORT = 5000;
app.use(express.json());
app.use("/storage", storageRoutes);
app.use("/package", packageRoutes);
app.use("/packagemovement", packageMovement);

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
