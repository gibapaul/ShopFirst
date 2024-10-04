const router = require('express').Router()
const ctrls = require('../controllers/blogCategory')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifytoken')

router.post('/', [verifyAccessToken,isAdmin], ctrls.createCategory)
router.get('/', ctrls.getCategories)
router.put('/:bcid', [verifyAccessToken,isAdmin], ctrls.updateCategories)
router.delete('/:bcid', [verifyAccessToken,isAdmin], ctrls.deleteCategories)



module.exports = router