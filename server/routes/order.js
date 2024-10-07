const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifytoken')
const ctrls = require('../controllers/order')
const uploader = require('../config/cloudinary.config')


router.get('/', verifyAccessToken, ctrls.getUserOrder)
router.post('/', verifyAccessToken, ctrls.createOrder)
router.put('/status/:oid', verifyAccessToken, isAdmin, ctrls.updateStatus)
router.put('/admin', verifyAccessToken, isAdmin, ctrls.getOrders)

module.exports = router  