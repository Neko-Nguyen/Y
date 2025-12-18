const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Follows, Users } = require("../models");

router.post("/:followingId", validateToken, async (req, res) => {
   const followerId = req.user.id;
   const followingId = req.params.followingId;

   if (followerId === followingId) {
      res.status(400).json("Cannot follow ourselves");
   }

   const follow = { followerId, followingId };
   const found = await Follows.findOne({ 
      where: {
         followerId: followerId,
         followingId: followingId
      }
   });

   if (!found) {
      await Follows.create(follow);
      res.json({ followed: true });
   } else {
      await Follows.destroy({
         where: {
            followerId: followerId,
            followingId: followingId
         }
      });
      res.json({ followed: false });
   }
});

router.get("/followinfo/:id", async (req, res) => {
   const id = req.params.id;

   const followers = await Follows.findAll({
      where: { followingId: id },
      include: [{ model: Users, as: "Follower" }]
   });
   const followings = await Follows.findAll({
      where: { followerId: id },
      include: [{ model: Users, as: "Following" }]
   });

   res.json({
      followers: followers,
      followings: followings
   });
});

module.exports = router;