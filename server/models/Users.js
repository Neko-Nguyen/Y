module.exports = (sequelize, DataTypes) => {

   const Users = sequelize.define("Users", {
      username: {
         type: DataTypes.STRING,
         allowNull: false
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false
      },
      avatar: {
         type: DataTypes.STRING,
         allowNull: true
      },
      bio: {
         type: DataTypes.STRING,
         allowNull: true
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
   };
   return Users;
}