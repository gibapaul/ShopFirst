import React from 'react';
import { NavLink } from 'react-router-dom';
import { createSlug } from '../ultils/helpers';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const { categories } = useSelector(state => state.app);
    console.log("Categories from Redux Store:", categories); // Để kiểm tra categories

    return (
        <div className='flex flex-col border'>
            {Array.isArray(categories) && categories.length > 0 ? (
                categories.map(el => (
                    <NavLink
                        key={createSlug(el.title)}
                        to={createSlug(el.title)}
                        className={({ isActive }) => 
                            isActive ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main' : 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                        }
                    >
                        {el.title}
                    </NavLink>
                ))
            ) : (
                <span>No categories available</span>
            )}
        </div>
    );
};

export default Sidebar;
