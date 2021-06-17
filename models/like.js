const { Model } = require('sequelize')
const LikeSchema = require('./schema/like')
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.User = this.belongsTo(models.User)
      Like.Post = this.belongsTo(models.Post)
    }
  }

  const { tableAttributes } = LikeSchema(sequelize, DataTypes)
  Like.init(tableAttributes, {
    sequelize,
    modelName: 'Like',
  })

  return Like
}