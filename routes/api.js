const { Router } = require('express')
const router = Router()

router.post('/auth/signup', require('../controllers/api/auth/post-signup'))                   // SIGNUP POST    /api/auth/signup
router.post('/auth/login', require('../controllers/api/auth/post-login'))                     // LOGIN  GET     /api/auth/login
router.delete('/auth/logout', require('../controllers/api/auth/delete-logout'))               // LOGOUT DELETE  /api/auth/logout

router.post('/my/posts', require('../controllers/api/my-posts/create-post'))                  // Create Post    /api/my/posts
router.put('/my/posts/:id', require('../controllers/api/my-posts/put-update'))                // Update Post    /api/my/posts/:id
router.delete('/my/posts/:id', require('../controllers/api/my-posts/delete-destroy'))         // Delete Post    /api/my/posts/:id

router.put('/my/profile', require('../controllers/api/my-profile/put-profile'))               // Update Profile /api/my/profile

router.use(function (req, res) {
  res.status(404).json({ message: "Sorry! API does not exist!" })
})

module.exports = router