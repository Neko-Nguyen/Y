const express = require("express");

const router = express.Router();
const { Op } = require("sequelize");
const { Users, Posts, Likes } = require("../models");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const upload = multer({ dest: 'uploads/' });
const { Users, Posts, Comments, Likes } = require("../models");
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

router.get("/search/:key", async (req, res) => {
   const key = req.params.key;
   if (!key) {
      res.status(400).json({ error: "Search key is required" });  
   }

   const values = await Users.findAll({
      where: { username: { [Op.like]: `%${key}%` } }
   });
   res.json(values);
});

router.patch("/basicinfo/:id", upload.single('avatar'), validateToken, async (req, res) => {
   const filename = req.file ? req.file.filename : undefined;
   const id = req.params.id;
   const { username, bio } = req.body;

   await Users.update({
         username: username,
         avatar: filename,
         bio: bio
      }, { where: { id: id } }
   );
   await Posts.update({ 
         username: username,
         avatar: filename
      }, { where: { UserId: id } }
   );
   await Comments.update({ username: username }, { where: { UserId: id } });

   res.json("success");
});

module.exports = router;