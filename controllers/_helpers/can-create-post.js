const moment = require('moment')
const { Post } = require('../../models')

module.exports = async function (req, res, next) {
  const currentUser = res.locals.currentUser

  const latestPost = Post.findOne({
    where: {
      UserId: currentUser.id
    },
    order: [['createdAt', 'DESC']]
  })

  if (latestPost) {
    const currentDate = moment()
    const expireDate = moment(latestPost.createdAt).add(1, 'days')
    if (!currentDate.isAfter(expireDate)) return res.status(403).json({ message: 'Cannot create another post too quickly' })    
  }

  next()
}