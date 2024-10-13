import React, { useEffect, useState } from 'react';
import { apiGetProducts } from '../apis/product';
import { Product, CustomSlider } from './';
import { getNewProducts } from '../store/products/asyncAction';
import { useDispatch, useSelector } from 'react-redux';

const tabs = [
    { id: 1, name: 'best sellers' },
    { id: 2, name: 'new arrivals' },
];

const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [activedTab, setActivedTab] = useState(1);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const { newProducts } = useSelector(state => state.products);

    // Hàm để fetch sản phẩm
    const fetchProducts = async () => {
        const response = await apiGetProducts({ sort: '-sold' });
        if (response.success) {
            setBestSellers(response.products);
            setProducts(response.products);
        }
    };

    // Gọi hàm fetchProducts khi component mount
    useEffect(() => {
        fetchProducts();
        dispatch(getNewProducts());
    }, [dispatch]);

    // Cập nhật sản phẩm theo tab được chọn
    useEffect(() => {
        if (activedTab === 1) setProducts(bestSellers);
        if (activedTab === 2) setProducts(newProducts);
    }, [activedTab, bestSellers, newProducts]);

    return (
        <div>
            <div className='flex text-[20px] pb-4 border-b-2 border-main gap-4'>
                {tabs.map(tab => (
                    <span
                        key={tab.id}
                        className={`font-semibold uppercase cursor-pointer text-gray-900 
                            ${activedTab === tab.id ? 'text-main' : 'text-gray-500'}`}
                        onClick={() => setActivedTab(tab.id)}
                    >
                        {tab.name}
                    </span>
                ))}
            </div>

            <div className='mt-4 mx-[-10px]'>
                <CustomSlider products={products} activedTab={activedTab} />
            </div>

            <div className='w-full flex gap-4 mt-4'>
                <img 
                    src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657'
                    alt='banner'
                    className='flex-1 object-contain'
                />
                <img 
                    src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657'
                    alt='banner'
                    className='flex-1 object-contain'
                />
            </div>
        </div>
    );
};

export default BestSeller;
