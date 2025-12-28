const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
app.use("/posts", require("./routes/PostsRoute"));
app.use("/comments", require("./routes/CommentsRoute"));
app.use("/users", require("./routes/UsersRoute"));
app.use("/likes", require("./routes/LikesRoute"));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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
