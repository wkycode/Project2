const { Router } = require('express')
const router = Router()

router.get('/', require('../controllers/pages/static/get-index'))              
router.get('/:category', require('../controllers/pages/static/get-index'))     
router.get('/user/:id', require('../controllers/pages/user/get-profile')) 

router.use(function (req, res) {
  res.render('not-found', { message: "Sorry! Page does not exist!" })
})
module.exports = router