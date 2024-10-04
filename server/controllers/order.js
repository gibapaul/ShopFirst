const Order = require('../models/order');
const asyncHandler = require('express-async-handler');


const createOrder = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
        throw new Error('Missing inputs');
    }
const response = await Order.create(req.body);
    return res.json({
        success: response ? true : false,
    createdOrder: response || 'Cannot create new Order'
    })
})
    module.exports = {
        createOrder,    
    };
