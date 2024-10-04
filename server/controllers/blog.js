const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
        throw new Error('Missing inputs');
    }
    const response = await Blog.create(req.body);
    return res.json({
        success: response ? true : false,
        createdBlog: response || 'Cannot create new blog'
    });
});

const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, message: 'Missing inputs' });
    }
    
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
    if (!response) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    return res.json({
        success: true,
        updatedBlog: response
    });
});

const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find();
    return res.json({
        success: true,
        blogs: response || 'Cannot get blogs'
    });
});

// Phương thức like
const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;

    if (!bid) {
        return res.status(400).json({ success: false, message: 'Missing blog ID' });
    }

    const blog = await Blog.findById(bid);
    if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const alreadyLiked = blog.likes?.find(el => el.toString() === _id);
    const alreadyDisliked = blog.dislikes?.find(el => el.toString() === _id);

    if (alreadyDisliked) {
        // Nếu đã dislike, bỏ dislike
        await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
    }

    if (alreadyLiked) {
        // Nếu đã like, bỏ like
        await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
    } else {
        // Nếu chưa làm gì, thêm like
        await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true });
    }

    const updatedBlog = await Blog.findById(bid); // Lấy blog cập nhật để trả về
    return res.json({
        success: true,
        updatedBlog
    });
});

// Phương thức dislike
const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;

    if (!bid) {
        return res.status(400).json({ success: false, message: 'Missing blog ID' });
    }

    const blog = await Blog.findById(bid);
    if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const alreadyDisliked = blog.dislikes?.find(el => el.toString() === _id);
    const alreadyLiked = blog.likes?.find(el => el.toString() === _id);

    if (alreadyLiked) {
        // Nếu đã like, bỏ like và thêm dislike
        await Blog.findByIdAndUpdate(bid, {
            $pull: { likes: _id },
            $push: { dislikes: _id }
        }, { new: true });
    } else {
        // Nếu chưa làm gì, thêm dislike
        await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true });
    }

    const updatedBlog = await Blog.findById(bid); // Lấy blog cập nhật để trả về
    return res.json({
        success: true,
        updatedBlog
    });
});
const getBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const blog = await Blog.findByIdAndUpdate(bid, { $inc: {numberViews: 1}}, {new:true})
    .populate('likes', 'firstname lastname')
    .populate('dislikes', ('firstname lastname'))
    return res.json({
        success: blog? true : false,
        rs: blog
    })
})
const deleteBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const blog = await Blog.findByIdAndDelete(bid)
    return res.json({
        success: blog? true : false,
        deleteBlog: blog || 'Something went wrong'
    })
})
const uploadImageBlog = asyncHandler(async(req, res) => {
    const { bid} = req.params
    if(!req.file) throw Error ('Missing inputs')
    const response = await Blog.findByIdAndUpdate(bid, {image: req.file.path}, {new:true})
    return res.status(200).json({
        status: response ? true : false,
        updatedBlog: response ? response : 'Can not upload images blog'
    })
})
module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteBlog,
    uploadImageBlog,


};
