const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!email || !password || !lastname || !firstname || !mobile) {
        return res.status(400).json({
            success: false,
            message: 'Missing inputs'
        });
    }

    const response = await User.create(req.body);

    return res.status(201).json({
        success: true,
        response
    });
});

module.exports = {
    register
};
