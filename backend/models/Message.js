module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message", {
          text: {
              type: DataTypes.STRING,
              allowNull: false
          },
          image: {
              type: DataTypes.STRING,
              allowNull: true
          }
    });

    Message.associate = models => {
        Message.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Message.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    };

    return Message;
}