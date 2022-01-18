module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id:{
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: 'John',
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: 'Doe'
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },{
        timestamps:true,
    }, {});
    User.associate = function (models) {
        /*User.belongsToMany(User, {as: "User", foreignKey: "UserId", through: "Follow"});
        User.belongsToMany(User, {as: "Followed", foreignKey: "FollowedId", through: "Follow"});
        User.hasMany(models.Tweet, {
            foriegnKey: {
            type: DataTypes.UUID,
            allowNull: false
            }
        });
        User.hasOne(models.ContactInfo, {
            foriegnKey: {
            type: DataTypes.UUID,
            allowNull: false
            }
        });*/
    }
        return User;
    };