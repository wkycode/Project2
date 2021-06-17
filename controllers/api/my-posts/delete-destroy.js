const { authenticateCurrentUserByToken } = require('../../_helpers')
const { Post } = require('../../../models')

const apiMyPostsDestroy = async function(req, res) {
  const { params: { id } } = req
  const { locals: { currentUser } } = res
  const post = await Post.findOne({
    where: {
      UserId: currentUser.id,
      id: Number(id) || 0
    }
  })
  if (!post) return res.status(404).json({ message: `Post with ID: ${id} not found!` })

  await post.destroy()
  res.status(204).json('Post Deleted')
}

module.exports = [authenticateCurrentUserByToken('json'), apiMyPostsDestroy]