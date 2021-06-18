const { Post, Like } = require('../../../models')
const { post } = require('../../../routes/api');
const pagesStatic = async function(req, res) {
  const { currentUser } = res.locals
  const { category } = req.params

  const where = {}
  if (category) {
    if (['Work', 'Social', 'Relationship'].includes(category)) {
      where.category = category
    } else {
      return res.redirect('/')
    }
  }

  const posts = await Post.findAll({ 
    where: where,
    limit: 10,
    order: [['createdAt', 'DESC']],
    include: Post.User
  })

  let postIDs = []
  if (currentUser) {
    const postWithUserLikes = await Post.findAll({ 
      attributes: ['id', 'createdAt'],
      where: where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: {
        association: Post.Likes,
        where: {
          UserId: currentUser.id
        }
      }
    })

    postIDs = postWithUserLikes.map(function(post) {
      return post.id
    })
  }

  res.render('pages/static/index', { posts, postIDs })
}

module.exports = [pagesStatic]