import React, {useState} from 'react'
import { Button } from '../../components'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis/user'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const {token} = useParams()

  const handleResetPassword = async () => {
    const response = await apiResetPassword({password, token})
    if (response.success) {
      toast.success("Email khôi phục đã được gửi. Hãy check mail!", { theme: 'colored' });
  } else {
      toast.error(response.message || "Có lỗi xảy ra!", { theme: 'colored' });
  }


  }
  return (
    <div className='absolute animate-scale-up-center top-0 left-0 bottom-0 right-0 bg-overlay flex flex-col items-center justify-center py-8 z-50 '>
                    <div className='flex flex-col gap-4 bg-white rounded-lg pt-4 pb-4'>
                        <label htmlFor='email'>Enter your new password: </label>
                        <input type='text'
                            id='password'
                            className='w-[800px] pb-2 border-b outline-none placeholder:text-sm rounded-lg'
                            placeholder='Type here'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center justify-center w-full gap-4'>
                        <Button
                            name='Submit'
                            handleOnclick={handleResetPassword}
                            style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2'
                        />
                    </div>
                </div>
  )
}

export default ResetPassword