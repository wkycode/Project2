const { Post } = require('../../../models')
const pagesStatic = async function(req, res) {
  const posts = await Post.findAll({ 
    limit: 10,
    include: Post.User
  })

  console.log(posts[0])

  res.render('pages/static/index', { posts })
}

module.exports = [pagesStatic]