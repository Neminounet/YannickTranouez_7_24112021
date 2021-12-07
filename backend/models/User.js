module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        } ,
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: "Cet Email est déjà pris."
            },
            allowNull:false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: `http://${process.env.HOST}/images/default_user.png`
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    User.associate = models => {
        User.hasMany(models.Message, {
            onDelete: "cascade"
        });
        User.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    };

    return User;
};