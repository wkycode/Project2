const { body } = require('express-validator')
const { checkValidation, MulterParser, authenticateCurrentUserByToken, canCreatePost } = require('../../_helpers')

const permittedCreatePostParams = ['photo', 'caption', 'content']

const validation = [
  body('caption')
    .notEmpty().withMessage('Caption is Required')
    .isString().withMessage('Caption must be valid'),
  body('content')
    .notEmpty().withMessage('Content is Required')
    .isString().withMessage('Content must be valid')
]

const apiCreatePost = async function(req, res) {
  const { body: postParams } = req
  const currentUser = res.locals.currentUser

  const data = postParams
  if (req.file && req.file.location) {
    data.photo = req.file.location
  }

  const post = await currentUser.createPost(data, { attributes: permittedCreatePostParams })

  res.status(200).json(post)
}
// canCreatePost,
module.exports = [authenticateCurrentUserByToken('json'), MulterParser.single('photo'), validation, checkValidation, apiCreatePost]