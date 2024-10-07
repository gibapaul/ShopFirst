const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createNewCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body;
    if (!name || !discount || !expiry) {
        throw new Error('Missing inputs');
    }
    const response = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry*24*60*60*1000
    });
    return res.json({
        success: response ? true : false,
        createdCoupon: response || 'Cannot create new Coupon'
    });
});
const getCoupons = asyncHandler(async (req, res) => {
    const response = await Coupon.find().select('-createdAt -updatedAt')
    return res.json({
        success: true,
        coupons: response || 'Cannot get coupons'
    });
});
const updateCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ success: false, message: 'Missing inputs' });
    }
    if(req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry * 24 *60*60*1000
    const response = await Coupon.findByIdAndUpdate(cid, req.body, { new: true });
    if (!response) {
        return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    return res.json({
        success: true,
        updatedBlog: response
    });
}); const deleteCoupon = asyncHandler(async(req, res) => {
        const {cid} = req.params
        const response = await Coupon.findByIdAndDelete(cid)
        return res.json({
            success: response ? true : false,
            deletedCoupon: response ? response : 'Cannot delete coupon'
        
        })
    })
module.exports = {
    createNewCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon,

     

}