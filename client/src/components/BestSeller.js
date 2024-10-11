import React, { useEffect, useState } from 'react';
import { apiGetProducts } from '../apis/product';
import Product from './Product';
import Slider from "react-slick";

const tabs = [
    { id: 1, name: 'best sellers' },
    { id: 2, name: 'new arrivals' },
];

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [activedTab, setActivedTab] = useState(1);
    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await Promise.all([
                apiGetProducts({ sort: '-sold' }),
                apiGetProducts({ sort: '-createdAt' })
            ]);
            if (response[0]?.success) 
            {
                setBestSellers(response[0].products)
                setProducts(response[0].products)
            }
            if (response[1]?.success) setNewProducts(response[1].products);
            setProducts(response[0].products)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if(activedTab === 1 ) setProducts(bestSellers)
        if(activedTab === 2 ) setProducts(newProducts)
    }, [activedTab, bestSellers, newProducts]);

    return (
        <div>
       <div className='flex text-[20px] pb-4 border-b-2 border-main gap-4'>
    {tabs.map(el => (
        <span
            key={el.id}
            className={`font-semibold capitalize cursor-pointer text-gray-900 
                ${activedTab === el.id ? 'text-main' : 'text-gray-500'}`}
            onClick={() => setActivedTab(el.id)}
        >
            {el.name}
        </span>
    ))}
</div>

            <div className='mt-4 mx-[-10px]' >
                <Slider {...settings}>
                    {products?.map(el => (
                        <Product
                            key={el._id}
                            pid={el._id}
                            productData={el}
                            isNew={activedTab === 1 ? false : true}
                        />
                    ))}
                </Slider>
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
