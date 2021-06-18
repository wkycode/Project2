const { authenticateCurrentUserByToken } = require('../../_helpers')
const { Post, Like } = require('../../../models')

const apiPostsLike = async function(req, res) {
  const { params: { id } } = req
  const { locals: { currentUser } } = res

  const post = await Post.findOne({ where: { id: Number(id) || 0 } })
  if (!post) return res.status(404).json({ message: `Post with ID: ${id} not found!` })

  const like = await Like.findOne({ where: { UserId: currentUser.id, PostId: post.id } })

  if (like) {
    await like.destroy()
  } else {
    await Like.create({ UserId: currentUser.id, PostId: post.id })
  }

  res.status(200).json()
}

module.exports = [authenticateCurrentUserByToken('json'), apiPostsLike]