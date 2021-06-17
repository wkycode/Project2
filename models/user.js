const { Model } = require('sequelize')
const UserSchema = require('./schema/user')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.AuthenticityTokens = this.hasMany(models.AuthenticityToken)
      User.Posts = this.hasMany(models.Post)
      User.Comments = this.hasMany(models.Comment)
      User.Likes = this.hasMany(models.Like)
    }
  }

  const { tableAttributes } = UserSchema(sequelize, DataTypes)
  User.init(tableAttributes, {
    sequelize,
    modelName: 'User',
  })
  return User
}