const { body } = require('express-validator')

const { authenticateCurrentUserByToken, checkValidation, MulterParser } = require('../../_helpers')

const permittedSignupParams = ['username', 'email','avatar']

const validation = [
  body('email')
    .notEmpty().withMessage('Email is Required')
    .isEmail().withMessage('Email must be valid'),
  body('username')
  .notEmpty().withMessage('Username is Require')
]

const userSerializer = function(values) {
  const { ...user } = values.dataValues
  delete user.passwordHash
  return user
}

const apiMyProfilePut = async function(req, res) {
  const { body: userParams } = req
  const { locals: { currentUser } } = res

  await currentUser.update(userParams, { fields: permittedSignupParams })

  res.status(200).json(userSerializer(currentUser))
}

module.exports = [authenticateCurrentUserByToken('json'), MulterParser.none(), validation, checkValidation, apiMyProfilePut]