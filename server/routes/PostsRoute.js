const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
   const listOfPosts = await Posts.findAll({ include: [Likes] });
   res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
   const id = req.params.id;
   const post = await Posts.findByPk(id, { include: [Likes] });
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

module.exports = router;