import React, {useState, useCallback} from 'react';
import { InputField, Button } from '../../components';
import { apiRegister, apiLogin } from '../../apis/user';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import { register } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';



const Login = () => {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const [payload, setPayload] = useState({
        email:'',
        password:'',
        firstname:'',
        lastname:'',
        mobile:''
    });
    const [isRegister, setIsRegister] = useState(false);

    const resetPayload = () => {
        setPayload({
            email:'',
            password:'',
            firstname:'',
            lastname:'',
            mobile:''
        });
    };

    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload;
        if (isRegister) {
            const response = await apiRegister(payload);
            if (response?.success) {
                Swal.fire({
                    title: 'Congratulation',
                    text: response?.mes || 'Registration successful!',
                    icon: 'success'
                }).then(() => {
                    setIsRegister(false);
                    resetPayload();
                });
            } else {
                Swal.fire({
                    title: 'Oops!',
                    text: response?.mes || 'Something went wrong!',
                    icon: 'error'
                });
            }
        } else {
            const rs = await apiLogin(data);
            if (rs?.success) {
                dispath(register({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
                navigate(`/${path.HOME}`)
            } else {
                Swal.fire({
                    title: 'Oops!',
                    text: rs?.mes || 'Something went wrong!',
                    icon: 'error'
                });
            }
        }
    }, [payload, isRegister]);

    return (
        <div className='w-screen h-screen relative'>
            <img 
                src='https://t4.ftcdn.net/jpg/04/57/38/53/240_F_457385355_CXnsttlVDuzZipUwPksSiMDuaIl2hCu5.jpg' 
                alt=''
                className='w-full h-full object-cover'
            />
            <div className='absolute top-0 bottom-0 left-1/2 right-0 items-center justify-center flex'>
                <div className='p-8 bg-white rounded-md min-w-[500px] flex flex-col items-center'>
                    <h1 className='text-[28px] font-semibold text-main mb-8'>{isRegister ? 'Register' : 'Login'}</h1>
                    {isRegister && (
                        <div className='flex items-center gap-2'>
                            <InputField
                                value={payload.firstname}
                                setValue={setPayload}
                                nameKey='firstname'
                            />
                            <InputField
                                value={payload.lastname}
                                setValue={setPayload}
                                nameKey='lastname'
                            />
                        </div>
                    )}
                    <InputField
                        value={payload.email}
                        setValue={setPayload}
                        nameKey='email'
                    />
                    {isRegister && (
                        <InputField
                            value={payload.mobile}
                            setValue={setPayload}
                            nameKey='mobile'
                        />
                    )}
                    <InputField
                        value={payload.password}
                        setValue={setPayload}
                        nameKey='password'
                        type='password'
                    />
                    <Button
                        name={isRegister ? 'Register' : 'Login'}
                        handleOnclick={handleSubmit}
                        fw
                    />
                    <div className='flex items-center justify-between my-2 w-full text-sm'>
                        {!isRegister && (
                            <span className='text-blue-500 hover:underline cursor-pointer'>
                                Forgot your account?
                            </span>
                        )}
                        {!isRegister && (
                            <span
                                className='text-blue-500 hover:underline cursor-pointer'
                                onClick={() => setIsRegister(true)}
                            >
                                Create account
                            </span>
                        )}
                        {isRegister && (
                            <span
                                className='text-blue-500 hover:underline cursor-pointer w-full text-center'
                                onClick={() => setIsRegister(false)}
                            >
                                Go login
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
