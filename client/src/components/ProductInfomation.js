import React, { memo, useState } from 'react';
import { ProductInfoTabs } from '../ultils/contants';

const activedStyles = 'bg-white border border-b-0'; // Lớp cho tab được chọn
const notActivedStyles = 'bg-gray-100'; // Lớp cho tab không được chọn

const ProductInfomation = () => {
    const [activedTab, setActivedTab] = useState(1);

    return (
        <div>
            <div className='flex items-center gap-2 relative bottom-[-1px]'>
                {ProductInfoTabs.map(el => (
                    <span
                        className={`p-2 px-4 cursor-pointer ${activedTab === el.id ? activedStyles : notActivedStyles}`}
                        key={el.id}
                        onClick={() => setActivedTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='w-full border p-4'>
                {ProductInfoTabs.some(el => el.id === activedTab) && ProductInfoTabs.find(el => el.id === activedTab)?.content}
            </div>
        </div>
    );
};

export default memo(ProductInfomation);
