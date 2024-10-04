const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifytoken')
const ctrls = require('../controllers/blog')
const uploader = require('../config/cloudinary.config')


router.get('/', ctrls.getBlogs)
router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBlog)
router.get('/one/:bid', ctrls.getBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog)
router.put('/likes/:bid', [verifyAccessToken, isAdmin], ctrls.likeBlog)
router.put('/dislike/:bid', [verifyAccessToken, isAdmin], ctrls.dislikeBlog)
router.put('/image/:bid', [verifyAccessToken, isAdmin], uploader.single('image'), ctrls.uploadImageBlog)
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBlog)

module.exports = router  