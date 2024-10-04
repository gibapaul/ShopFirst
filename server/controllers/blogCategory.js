const BlogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async(req, res) => {
    const response = await BlogCategory.create(req.body)
    return res.json({
        success: response ? true : false,
        createdCategory: response ? response : 'Cannot create new blog-category'
    
    })
})
const getCategories = asyncHandler(async(req, res) => {
    const response = await BlogCategory.find().select('title _id')
    return res.json({
        success: response ? true : false,
        blogCategory: response ? response : 'Cannot get blog-category'
    
    })
})
const updateCategories = asyncHandler(async(req, res) => {
    
    const {bcid} = req.params
    console.log("Updating blog category with ID:", bcid);
    console.log("Request body:", req.body); // Ghi log body yêu cầu
    const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {new:true})
    return res.json({
        success: response ? true : false,
        updatedCategory: response ? response : 'Cannot update blog-category'

    })
})
const deleteCategories = asyncHandler(async(req, res) => {
    const {bcid} = req.params
    const response = await BlogCategory.findByIdAndDelete(bcid)
    return res.json({
        success: response ? true : false,
        deletedCategory: response ? response : 'Cannot delete blog-category'
    
    })
})
module.exports = {
    createCategory,
    getCategories,
    updateCategories,
    deleteCategories
}
