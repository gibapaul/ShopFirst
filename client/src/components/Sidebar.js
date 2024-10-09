import React, { useState, useEffect } from 'react';
import { apiGetCategories } from '../apis/app';
import { NavLink } from 'react-router-dom';
import { createSlug } from '../ultils/helpers';

const Sidebar = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await apiGetCategories();
            console.log("Fetched Categories:", response);

            if (response.success) {
                setCategories(response.prodCategory || []);
            } else {
                setError("Failed to fetch categories");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError("Error fetching categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) {
        return <div>Loading categories...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='flex flex-col'>
            {categories.length > 0 && categories.map(el => (
                <NavLink
                    key={createSlug(el.title)}
                    to={createSlug(el.title)}
                    className={({ isActive }) => 
                        isActive ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main' : 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                    }
                >
                    {el.title}
                </NavLink>
            ))}
        </div>
    );
};

export default Sidebar;
