const express = require("express");

const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const { Users, Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
   const { username, password } = req.body;

   bcrypt.hash(password, 10).then((hash) => {
      Users.create({
         username: username,
         password: hash,
      });
      res.json("Sign In Success");
   });
});

router.post("/login", async (req, res) => {
   const { username, password } = req.body;
   const user = await Users.findOne({ where: { username: username } });

   if (!user) return res.json({ error: "User Doesn't Exist" });

   bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) return res.json({ error: "Wrong Username or Password" });

      const accessToken = sign(
         { username: user.username, id: user.id }, 
         "important secret"
      );
      res.json({
         token: accessToken,
         username: user.username,
         id: user.id
      });
   })
});

router.get("/auth", validateToken, async (req, res) => {
   res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
   const id = req.params.id;
   const basicInfo = await Users.findByPk(id, { 
      attributes: { exclude: ["password"] }, 
      include: [{
         model: Posts,
         include: [Likes]  
      }]
   });
   res.json(basicInfo);
});

router.patch("/basicinfo/:id", upload.single('avatar'), validateToken, async (req, res) => {
   Users.update({
         username: req.body.username,
         avatar: req.file,
         bio: req.body.bio
      }, { where: { id: req.params.id } }
   );
   res.json();
});

module.exports = router;