import Sidebar from '../../components/Sidebar';
import Banner from '../../components/Banner';
import BestSeller from '../../components/BestSeller';
import DealDaily from '../../components/DealDaily';
import React from 'react';



const Home = () => {
    return (
        <>
            <div className='flex'>
                <div className='flex flex-col gap-5 w-[25%] flex-auto'>
                    <Sidebar />
                    <DealDaily/>
                </div>
                <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
                    <Banner />
                    <BestSeller />
                </div>
                {/* <div className='w-full h-[500px]'> </div> */}
            </div>

        </>
    );
};

export default Home;
