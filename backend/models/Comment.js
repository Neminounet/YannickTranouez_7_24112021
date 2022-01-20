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
            },
            onDelete: "cascade"
        });
        Comment.belongsTo(models.Message, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "cascade"
        });
    };

    return Comment;
}