const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
   const { username, password } = req.body;
   bcrypt.hash(password, 10).then((hash) => {
      Users.create({
         username: username,
         password: hash,
      });
      res.json("success");
   });
});

router.post("/login", async (req, res) => {
   const { username, password } = req.body;
   const user = await Users.findOne({ where: { username: username } });

   if (!user) res.json({ error: "User Doesn't Exist" });
   bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: "Wrong Username or Password" });
      res.json("You Logged in");
   })
});

module.exports = router;