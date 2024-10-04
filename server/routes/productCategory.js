const router = require('express').Router()
const ctrls = require('../controllers/productCategory')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifytoken')

router.post('/', [verifyAccessToken,isAdmin], ctrls.createCategory)
router.get('/', ctrls.getCategories)
router.put('/:pcid', [verifyAccessToken,isAdmin], ctrls.updateCategories)
router.delete('/:pcid', [verifyAccessToken,isAdmin], ctrls.deleteCategories)



module.exports = router