import { Sidebar, Banner, BestSeller, DealDaily, FeatureProducts, CustomSlider } from '../../components';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../store/app/asyncActions'; // Đảm bảo đúng tên file
import icons from '../../ultils/icons';
import { IoIosArrowForward } from 'react-icons/io';

const Home = () => {
    const dispatch = useDispatch();
    const { newProducts } = useSelector(state => state.products);
    const { categories } = useSelector(state => state.app);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <>
            <div className='w-main flex'>
                <div className='flex flex-col gap-5 w-[25%] flex-auto'>
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
                    <Banner />
                    <BestSeller />
                </div>
            </div>

            <div className='mt-8'>
                <FeatureProducts />
            </div>

            <div className='mt-8'>
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
                    NEW ARRIVALS
                </h3>
                <div className='mt-4 mx-[-10px]'>
                    <CustomSlider products={newProducts} />
                </div>
            </div>

            <div>
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
                    HOT COLLECTIONS
                </h3>
                <div className='flex flex-wrap gap-4 mt-4'>
                    {categories && categories.length > 0 ? (
                        categories.filter(el => el.brand.length > 0).map(el => (
                            <div key={el._id} className='w-[396px]'>
                                <div className='border flex p-4 gap-4 min-h-[190px]'>
                                    <img src={el?.image} alt={el.title} className='flex-1 w-[144px] h-[129px] object-cover' />
                                    <div className='flex-1 text-gray-700'>
                                        <h4 className='font-semibold uppercase'>{el.title}</h4>
                                        <ul className='text-sm'>
                                            {el?.brand?.map((item, index) => (
                                                <span key={index} className='flex gap-1 items-center text-gray-500'>
                                                    <IoIosArrowForward size={14} />
                                                    <li>{item}</li>
                                                </span>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No categories available</p>
                    )}
                </div>
            </div>

            <div className='my-8 w-full'>
                <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
                    BLOG POSTS
                </h3>
            </div>
        </>
    );
};

export default Home;
