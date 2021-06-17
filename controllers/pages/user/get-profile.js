const { authenticateCurrentUserByToken, getUserById } = require('../../_helpers')

const pagesUserProfile = async function(req, res) {
  const { foundUser } = res.locals

  const posts = await foundUser.getPosts()

  res.render('pages/user/profile', { posts })
}

module.exports = [authenticateCurrentUserByToken('html'), getUserById('html'), pagesUserProfile]