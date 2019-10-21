const router = require('express').Router()
const cigars = require('../controllers/cigars')
const users = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.route('/cigars')
  .get(cigars.index)
  .post(secureRoute, cigars.create)

router.route('/cigars/:id')
  .get(cigars.show)
  .delete(secureRoute, cigars.destroy)
  .put(secureRoute, cigars.update)

router.route('/cigars/:id/comments')
  .get(cigars.commentShow)
  .post(secureRoute, cigars.commentCreate)

router.route('/cigars/:id/comments/:commentId')
  .delete(secureRoute, cigars.commentDelete)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/profile')
  .get(secureRoute, users.profile)

module.exports = router
