const { body } = require('express-validator')

const { authenticateCurrentUserByToken, checkValidation, MulterParser } = require('../../_helpers')
const { Post } = require('../../../models')

const permittedChangeParams = ['caption', 'content', 'category']

const validation = [
  body('caption').isString().withMessage('Caption must be a String').notEmpty().withMessage('Caption is Required'),
  body('content').isString().withMessage('Content must be a String').notEmpty().withMessage('Content is Required'),
  body('category').notEmpty().withMessage('Category is Required').isString().withMessage('Category must be valid')
]

const apiMyPostsUpdate = async function(req, res) {
  const { body, params: { id } } = req
  const { locals: { currentUser } } = res

  const post = await Post.findOne({
    where: {
      UserId: currentUser.id,
      id: Number(id) || 0
    }
  })
  if (!post) return res.status(404).json({ message: `Post with ID: ${id} not found!` })

  await post.update(body, { fields: permittedChangeParams })
  res.status(200).json(post)
}

module.exports = [authenticateCurrentUserByToken('json'), MulterParser.none(), validation, checkValidation, apiMyPostsUpdate]