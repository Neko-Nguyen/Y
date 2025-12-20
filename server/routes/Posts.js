const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
   const listOfPosts = await Posts.findAll({ include: [Likes] });
   res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
   const id = req.params.id;
   const post = await Posts.findByPk(id);
   res.json(post);
});

router.post("/", validateToken, async (req, res) => {
   const post = req.body;
   post.username = req.user.username;
   post.UserId = req.user.id;
   await Posts.create(post);
   res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
   const postId = req.params.postId;

   await Posts.destroy({
      where: { id: postId }
   });

   res.json("Delete post successfully");
});

router.get("/search/:key", async (req, res) => {
   const key = req.params.key;
   if (!key) {
      res.status(400).json({ error: "Search key is required" });
   }

   const values = await Posts.findAll({
      where: { postText: { [Op.like]: `%${key}%` } }
   });
   res.json(values);
});

module.exports = router;