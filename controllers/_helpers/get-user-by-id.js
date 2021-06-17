const { User } = require('../../models')

module.exports = function(format) {
  return async function (req, res, next) {
    const { params: { id } } = req
    const user = await User.findOne({ where: { id: Number(id) || 0 } })

    if (!user) {
      if (format === 'json') {
        return res.status(404).json({ message: `User with ID: ${id} is not found` })
      }

      if (format === 'html') {
        return res.render('not-found', { message: `User with ID: ${id} is not found` })
      }
    }

    res.locals.foundUser = user

    next()
  }
}