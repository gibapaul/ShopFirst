import React, { useState, useEffect, memo } from 'react';
import icons from '../ultils/icons';
import { apiGetProducts } from '../apis/product';
import { renderStartFromNumber, formatMoney } from '../ultils/helpers';
import { Countdown } from './';

const { AiFillStar, AiOutlineMenu } = icons;
let idInterval;

const DealDaily = () => {
    const [dealdaily, setDealdaily] = useState(null);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expireTime, setExpireTime] = useState(false);

    const fetchDealDaily = async () => {
        try {
            const response = await apiGetProducts({ limit: 1, page: Math.round(Math.random() * 10), totalRatings: 5 });
            console.log("API Response for Daily Deals:", response); // Log phản hồi từ API
            
            if (response.success) {
                console.log("Deal Daily Product:", response.products[0]); // Log sản phẩm được nhận
                setDealdaily(response.products[0]);

                const h = 24 - new Date().getHours();
                const m = 60 - new Date().getMinutes();
                const s = 60 - new Date().getSeconds();

                setHour(h);
                setMinute(m);
                setSecond(s);
            } else {
                // Nếu không thành công, đặt lại thời gian
                setHour(0);
                setMinute(59);
                setSecond(59);
            }
        } catch (error) {
            console.error("Failed to fetch deal daily:", error);
        }
    };

    useEffect(() => {
        if (expireTime) {
            idInterval && clearInterval(idInterval);
            fetchDealDaily();
        }
    }, [expireTime]);

    useEffect(() => {
        idInterval = setInterval(() => {
            if (second > 0) {
                setSecond(prev => prev - 1);
            } else {
                if (minute > 0) {
                    setMinute(prev => prev - 1);
                    setSecond(59);
                } else {
                    if (hour > 0) {
                        setHour(prev => prev - 1);
                        setMinute(59);
                        setSecond(59);
                    } else {
                        setExpireTime(!expireTime); // Thay đổi trạng thái expireTime
                    }
                }
            }
        }, 1000);

        return () => {
            clearInterval(idInterval);
        };
    }, [second, minute, hour, expireTime]);

    return (
        <div className='border w-full flex-auto'>
            <div className='flex items-center justify-between p-4 w-full'>
                <span className='flex-1 flex justify-center'>
                    <AiFillStar size={20} color='#DD1111' />
                </span>
                <span className='flex-8 font-semibold text-[20px] flex justify-center text-gray-700'>DEAL DAILY</span>
                <span className='flex-1'></span>
            </div>

            {dealdaily ? (
                <div className='w-full flex flex-col items-center pt-8 px-4 gap-2'>
                    <img
                        src={dealdaily.thumb || 'https://apollobattery.com.au/wp-content/uploads/2022/08/default-product-image.png'}
                        alt={dealdaily.title}
                        className='w-full object-contain'
                    />
                    <span className='line-clamp-1 text-center'>{dealdaily.title}</span>

                    {/* Đánh giá sao */}
                    <span className='flex h-4'>{renderStartFromNumber(dealdaily?.totalRatings, 20)}</span>

                    {/* Giá sản phẩm */}
                    <span>{`${formatMoney(dealdaily.price)} VNĐ`}</span>
                </div>
            ) : (
                <div className='w-full flex justify-center items-center py-4'>
                    <span>Loading...</span>
                </div>
            )}
            <div className='px-4 mt-8'>
                <div className='flex justify-center gap-2 items-center mb-4'>
                    <Countdown unit={'Hours'} number={hour} />
                    <Countdown unit={'Minutes'} number={minute} />
                    <Countdown unit={'Seconds'} number={second} />
                </div>
                <button
                    type='button'
                    className='flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2'
                >
                    <AiOutlineMenu />
                    <span>Option</span>
                </button>
            </div>
        </div>
    );
};

export default memo(DealDaily);
