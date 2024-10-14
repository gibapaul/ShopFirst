const router = require('express').Router()
const ctrls = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifytoken')

router.post('/register', ctrls.register)
router.get('/finalregister/:token', ctrls.finalregister)
router.post('/login', ctrls.login)
router.get('/current', verifyAccessToken, ctrls.getCurrent)
router.post('/refreshtoken', ctrls.refreshAccessToken)
router.get('/logout', ctrls.logout)
router.get('/forgotpassword', ctrls.forgotPassword)
router.put('/resetpassword', ctrls.resetPassword)
router.get('/', [verifyAccessToken, isAdmin], ctrls.getUsers)
router.delete('/', [verifyAccessToken, isAdmin], ctrls.deleteUser)
router.put('/current', [verifyAccessToken], ctrls.updateUser)
router.put('/:uid', [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin)
router.put('/address/:uid', [verifyAccessToken], ctrls.updateUserAddress)
router.put('/cart/:uid', [verifyAccessToken], ctrls.updateCart)

module.exports = router

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETEeee
// CREATE (POST) + PUT - body
// GET + DELETE - query // ?fdfdsf&fdfs