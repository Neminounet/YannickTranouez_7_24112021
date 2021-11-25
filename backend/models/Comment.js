module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Comment.associate = models => {
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Comment.belongsTo(models.Message, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Comment;
}