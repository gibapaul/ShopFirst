import React from 'react'
import { Sidebar, Banner } from '../../components';
const Home = () => {
  return (
    <div className='w-full flex justify-center'>
      <div className='flex flex-col gap-5 w-[30%] border'>
        <Sidebar />
        <span>Deal daily</span>
      </div>
      <div className='flex flex-col gap-5 pl-5 w-[70%] border'>
        <Banner />
        <span>Best Seller</span>
      </div>
    </div>
  );
};
export default Home;
