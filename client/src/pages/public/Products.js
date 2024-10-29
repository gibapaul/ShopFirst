import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumb, Product, SearchItem } from '../../components';
import { apiGetProducts } from '../../apis';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

const Products = () => {
    const [products, setProducts] = useState(null);
    const [activeClick, setActiveClick] = useState(null);
    const [params] = useSearchParams();
    const { category } = useParams();

    const fetchProductsByCategory = async (queries) => {
        try {
            const response = await apiGetProducts(queries);
            console.log("API Response:", response); // Log phản hồi từ API để kiểm tra
            if (response.success) {
                setProducts(response.products);
            } else {
                console.error("Failed to fetch products", response.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        let paramsArray = [];
        for (let i of params.entries()) paramsArray.push(i);
        const queries = {};
        let priceQuery = {};
    
        for (let i of paramsArray) queries[i[0]] = i[1];
    
        // Chuyển đổi giá trị price sang số nếu có
        if (queries.from || queries.to) {
            priceQuery.price = {};
            if (queries.from) {
                const fromPrice = Number(queries.from); // Chuyển đổi 'from' thành số
                if (!isNaN(fromPrice)) {
                    priceQuery.price.$gte = fromPrice; // Đảm bảo giá trị là số hợp lệ
                } else {
                    console.error("Invalid 'from' price:", queries.from);
                }
            }
            if (queries.to) {
                const toPrice = Number(queries.to); // Chuyển đổi 'to' thành số
                if (!isNaN(toPrice)) {
                    priceQuery.price.$lte = toPrice; // Đảm bảo giá trị là số hợp lệ
                } else {
                    console.error("Invalid 'to' price:", queries.to);
                }
            }
        }
    
        // Xóa các tham số không cần thiết sau khi đã xử lý
        delete queries.from;
        delete queries.to;
    
        const q = { ...priceQuery, ...queries };
        console.log("Final Query:", q); // Kiểm tra query cuối cùng
    
        fetchProductsByCategory(q); // Truyền queries vào hàm fetchProductsByCategory
    }, [params]);
    

    const changeActiveFilter = useCallback(
        (name) => {
            if (activeClick === name) setActiveClick(null);
            else setActiveClick(name);
        },
        [activeClick]
    );

    return (
        <div className="w-full">
            <div className="h-[81px] flex bg-gray-100 justify-center items-center">
                <div className="w-main">
                    <h3 className="font-semibold uppercase">{category}</h3>
                    <Breadcrumb category={category} />
                </div>
            </div>
            <div className="w-main border p-4 flex justify-between mt-8 m-auto">
                <div className="w-4/5 flex-auto flex flex-col gap-3">
                    <span className="font-semibold text-sm">Filter by</span>
                    <div className="flex items-center gap-4">
                        <SearchItem
                            name="Price"
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                            type="input"
                        />
                        <SearchItem
                            name="Color"
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                        />
                    </div>
                </div>
                <div className="w-1/5">Sort by</div>
            </div>
            <div className="mt-8 w-main m-auto">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column"
                >
                    {products?.map((el) => (
                        <Product key={el._id} pid={el.id} productData={el} normal={true} />
                    ))}
                </Masonry>
            </div>
            <div className="w-full h-[500px]"></div>
        </div>
    );
};

export default Products;
