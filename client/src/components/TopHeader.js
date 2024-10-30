import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import path from '../ultils/path';
import { getCurrent } from '../store/user/asyncAction';
import { useDispatch, useSelector } from 'react-redux';
import icons from '../ultils/icons';
import { logout } from '../store/user/userSlice';

const { AiOutlineLogout } = icons;

const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector(state => state.user);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if(isLoggedIn) dispatch(getCurrent())
    }, 300);
  return () => {
    clearTimeout(setTimeoutId)
  }
  }, [dispatch, isLoggedIn]);

  return (
    <div className='h-[38px] w-full bg-main flex items-center justify-center'>
      <div className='w-main flex items-center justify-between text-xs text-white '>
        <span>ORDER ONLINE OR CALL US (+84) 382 531 088</span>
        {isLoggedIn && current 
          ? (
            <div className='flex gap-2 text-sm items-center'>
              <span>{`Welcome, ${current?.firstname || ''} ${current?.lastname || ''}`}</span>
              <span 
                onClick={() => dispatch(logout())}
                className='hover:rounded-full hover:bg-gray-200 cursor-pointer p-4'>
                <AiOutlineLogout size={18} />
              </span>
            </div>
          )
          : (
            <Link className='hover:text-gray-800' to={`/${path.LOGIN}`}>Sign In or Create Account</Link>
          )}
      </div>
    </div>
  );
}

export default memo(TopHeader);
