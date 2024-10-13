const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const data = require('../../data/data2.json');
const slugify = require('slugify');
const categoryData = require('../../data/cate_brand')
const ProductCategory = require('../models/productCategory')

// Hàm chèn sản phẩm
const fn = async (product) => {
    let slug = slugify(product?.name);
    let uniqueSlug = slug;
    let counter = 1;

    // Kiểm tra slug có tồn tại hay không
    while (await Product.exists({ slug: uniqueSlug })) {
        uniqueSlug = `${slug}-${counter++}`;
    }
    // Kiểm tra và lấy màu
    const colorVariant = product?.variants?.find(el => el.label === 'Color');
    const color = colorVariant && colorVariant.variants.length > 0 ? colorVariant.variants[0] : 'UNKNOWN';

    try {
        // Tạo sản phẩm mới
        await Product.create({
            title: product?.name,
            slug: uniqueSlug,
            description: product?.description.join(', '),
            brand: product?.brand || 'Unknown', // Đảm bảo brand không null
            price: Math.round(Number(product?.price?.match(/\d/g).join('')) / 100),
            category: product?.category[1], // Cần đảm bảo category là ObjectId
            quantity: Math.round(Math.random() * 1000),
            sold: Math.round(Math.random() * 100),
            images: product?.images,
            color: color, // Sử dụng color đã kiểm tra
            thumb: product?.thumb,
            totalRatings: Math.round(Math.random()*5)
        });
    } catch (error) {
        if (error.code === 11000) {
            console.log(`Slug đã tồn tại cho sản phẩm: ${product?.name}`);
        } else {
            console.error(`Lỗi khi tạo sản phẩm ${product?.name}:`, error);
            throw error; // Ném lỗi khác lên trên
        }
    }
};

// Hàm xử lý yêu cầu chèn sản phẩm
const insertProduct = asyncHandler(async (req, res) => {
    const promises = []; 
    for (let product of data) promises.push(fn(product)); // Thêm promise vào mảng
    await Promise.all(promises); // Chờ cho tất cả các promise hoàn thành
    return res.json({ success: true, message: 'Products inserted successfully' }); // Gửi phản hồi thành công
});

const fn2 = async(cate) => {
    await ProductCategory.create({
        title: cate?.cate,
        brand: cate?.brand,
        image: cate?.image
    })
}
const insertCategory = asyncHandler(async (req, res) => {
    const promises = []; 
    console.log(categoryData)
    for (let cate of categoryData) promises.push(fn2(cate)); // Thêm promise vào mảng
    await Promise.all(promises); // Chờ cho tất cả các promise hoàn thành
    return res.json({ success: true, message: 'Products inserted successfully' }); // Gửi phản hồi thành công
});

module.exports = {
    insertProduct,
    insertCategory,
    
};
