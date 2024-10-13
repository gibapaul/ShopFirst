import React, { useState } from 'react'
import { formatMoney } from '../ultils/helpers'
import label from '../assets/label.png'
import labelGreen from '../assets/label-green.png'
import { renderStartFromNumber } from '../ultils/helpers'
import SelectOption from './SelectOption'
import icons from '../ultils/icons'

const {
    AiFillEye,
    BsFillSuitHeartFill,
    AiOutlineMenu,
} = icons
const Product = ({ productData, isNew }) => {
    const [isShowOption, setIsShowOption] = useState(false)

    return (
        <div className='w-full text-base px-[10px]'>
            <div 
                className='w-full border p-[15px] flex flex-col items-center relative'
                onMouseEnter={(e) => {
                    e.stopPropagation()
                    setIsShowOption(true)
                }}
                onMouseLeave={(e) => { 
                    e.stopPropagation()
                    setIsShowOption(false)
                }}
            >
                <div className='relative w-full relative'>
                    
                    {isShowOption && (
                        <div className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top'>
                            <SelectOption icon={<AiFillEye />} />
                            <SelectOption icon={<AiOutlineMenu />} />
                            <SelectOption icon={<BsFillSuitHeartFill />} />
                        </div>
                    )}
                    
                    {/* Hình ảnh sản phẩm */}
                    <img
                        src={productData?.thumb || 'https://apollobattery.com.au/wp-content/uploads/2022/08/default-product-image.png'}
                        alt=""
                        className='w-[274px] h-[274px] object-cover'
                    />
                    
                    {/* Nhãn New/Hot */}
                    <img
                        src={isNew ? labelGreen : label}
                        alt=''
                        className='absolute w-[75px] top-[-18px] left-[-40px] object-contain'
                    />
                    
                    {/* Text New/Hot */}
                    <span className='font-bold top-[-15px] left-[-18px] absolute text-white'>
                        {isNew ? 'New' : 'Hot'}
                    </span>
                </div>

                {/* Thông tin sản phẩm */}
                <div className='flex flex-col gap-1 mt-[15px] items-start w-full'>
                    {/* Tên sản phẩm */}
                    <span className='line-clamp-1'>{productData?.title}</span>
                    
                    {/* Đánh giá sao */}
                    <span className='flex h-4'>{renderStartFromNumber(productData?.totalRatings)?.map((el, index) => (
                    <span key={index}> {el} </span>
                ))}</span>
                    
                    {/* Giá sản phẩm */}
                    <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
                </div>
            </div>
        </div>
    )
}

export default Product
