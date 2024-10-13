import React, {memo} from 'react'
import icons from '../ultils/icons'



const {MdEmail} = icons
const Footer = () => {
  return (
    <div className='w-full'>
      <div className='h-[103px] bg-main w-full flex items-center justify-center'>
        <div className='w-main flex items-center'>
          <div className='flex flex-col flex-1'>
          <span className='text-[20px] text-gray-100'>Sign up to Newsletter</span>
          <small className='text-[13px] text-gray-300'>Subscribe now and receive weekly newsletter</small>
          </div>
          <div className='flex-1 flex items-center'>
          <input type='text' 
          className='p-4 pr-0 rounded-l-full w-full bg-[#F04646] outline-none text-gray-100 
          placeholder:text-sm placeholder:text-gray-200 placeholder:italic placeholder:opacity-70'
          placeholder='Email address'
          />
          <div className='h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex justify-center items-center text-white'>
            <MdEmail size={16}/>
          </div>
          </div>
        </div>
      </div>
      <div className='h-[407px] bg-gray-950 flex items-center justify-center text-white text-[13px]'>
        <div className='w-main flex'>
          <div className='flex-2 flex flex-col gap-2'>
            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>ABOUT US</h3>
            <span>
            <span>Address: </span>
            <span className='opacity-70'>474 Ontario St Toronto, ON M4X 1M7 Canada</span>
            </span>
            <span>
            <span> Phone: </span>
            <span className='opacity-70'>(+1234)56789xxx</span>
            </span>
            <span>
            <span>Mail: </span>
            <span className='opacity-70'>tadathemes@gmail.com</span>
            </span>
          </div>
          <div className='flex-1 flex flex-col gap-2'>
          <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>INFORMATION</h3>
          <span className='opacity-70'>Typography</span>
          <span className='opacity-70'>Gallery</span>
          <span className='opacity-70'>Store Location</span>
          <span className='opacity-70'>Today's Deals</span>
          <span className='opacity-70'>Contact</span>
          </div>
          <div className='flex-1 flex flex-col gap-2'>
          <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>WHO WE ARE</h3>
          <span className='opacity-70'>Help</span>
          <span className='opacity-70'>Free Shipping</span>
          <span className='opacity-70'>FAQs</span>
          <span className='opacity-70'>Return & Exchange</span>
          <span className='opacity-70'>Testimonials</span>
          </div>
          <div className='flex-1 flex flex-col gap-2'>
          <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>#DigitalWorldStore</h3>
          </div>
        </div>
      </div>
      </div>
  )
}

export default memo(Footer)