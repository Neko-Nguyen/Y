module.exports = (sequelize, DataTypes) => {

   const Posts = sequelize.define("Posts", {
      postText: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      username: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   });

   Posts.associate = (models) => {
      Posts.hasMany(models.Comments, {
         onDelete: "cascade"
      });
      Posts.hasMany(models.Likes, {
         onDelete: "cascade"
      });
   };
   return Posts;
}