module.exports = (sequelize, DataTypes) => {

   const Users = sequelize.define("Users", {
      username: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   });

   Users.associate = (models) => {
      Users.hasMany(models.Posts, {
         onDelete: "cascade"
      });
      Users.hasMany(models.Comments, {
         onDelete: "cascade"
      });
      Users.hasMany(models.Likes, {
         onDelete: "cascade"
      });
      Users.belongsToMany(models.Users, {
         through: models.Follows,
         as: "Following",
         foreignKey: "followerId",
         otherKey: "followingId"
      });
      Users.belongsToMany(models.Users, {
         through: models.Follows,
         as: "Follower",
         foreignKey: "followingId",
         otherKey: "followerId"
      });
   };
   return Users;
}