module.exports = (sequelize, DataTypes) => {

   const Follows = sequelize.define("Follows", {
      followerId: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      followingId: {
         type: DataTypes.INTEGER,
         allowNull: false
      }
   });

   Follows.associate = (models) => {
      Follows.belongsTo(models.Users, {
         as: "Follower",
         foreignKey: "followerId"
      });
      Follows.belongsTo(models.Users, {
         as: "Following",
         foreignKey: "followingId"
      });
   };

   return Follows;
};