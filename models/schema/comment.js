const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Comments',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Comments_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
