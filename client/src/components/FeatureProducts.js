import React, { useState, useEffect } from "react";
import { ProductCard } from './';
import { apiGetProducts } from '../apis';

const FeatureProducts = () => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await apiGetProducts({ limit: 9, page: Math.floor(Math.random() * 4) });
            if (response.success) {
                setProducts(response.products);
            } else {
                setError('Failed to fetch products');
            }
        } catch (err) {
            setError('An error occurred while fetching products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="w-full">
            <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
                FEATURED PRODUCTS
            </h3>
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="flex flex-wrap mt-[15px] mx-p-0px]">
                    {products?.map(el => (
                        <ProductCard
                            key={el._id}
                            price={el.price}
                            title={el.title}
                            totalRatings={el.totalRatings}
                            image={el.thumb} // Đảm bảo el.thumb có giá trị hợp lệ
                        />
                    ))}
                </div>
            )}
            <div className="flex justify-between">
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
                    alt=""
                    className="w-[49%] object-contain"
                />
                <div className="flex flex-col justify-between gap-4 w-[24%]">
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
                    alt=""
                    
                />
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
                    alt=""
                    
                />

                </div>
                 <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
                    alt=""
                    className="w-[24%] object-contain"
                />
            </div>
        </div>
    );
};

export default FeatureProducts;
