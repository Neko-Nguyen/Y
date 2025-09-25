const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
app.use("/posts", require("./routes/Posts"));
app.use("/comments", require("./routes/Comments"));
app.use("/users", require("./routes/Users"));
app.use("/likes", require("./routes/Likes"));

db.sequelize
   .sync()
   .then(() => {
      app.listen(process.env.PORT || 3001, () => {
         console.log("Server running on port 3001");
      });
   })
   .catch((err) => {
      console.log(err);
   });
