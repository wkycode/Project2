const { Model } = require('sequelize')
const PostSchema = require('./schema/post')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.User = this.belongsTo(models.User)
      Post.Comments = this.hasMany(models.Comment)
      Post.Likes = this.hasMany(models.Like)
    }
  }

  const { tableAttributes } = PostSchema(sequelize, DataTypes)
  Post.init(tableAttributes, {
    sequelize,
    modelName: 'Post',
  })

  return Post

}