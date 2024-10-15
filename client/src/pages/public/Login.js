import React, { useState, useCallback } from 'react';
import { InputField, Button } from '../../components';
import { apiRegister, apiLogin, apiForgotPassword } from '../../apis/user';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import path from '../../ultils/path';
import { register } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Đổi từ dispath thành dispatch
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: ''
    });

    const [isRegister, setIsRegister] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: ''
        });
    };
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({ email });
        if (response.success) {
            toast.success("Email khôi phục đã được gửi. Hãy check mail!", { theme: 'colored' });
        } else {
            toast.error(response.message || "Có lỗi xảy ra!", { theme: 'colored' });
        }
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
                toast.success("Đăng ký thành công!", { theme: 'colored' });
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
                dispatch(register({ isLoggedIn: true, token: rs.accessToken, userData: rs.userData }));
                navigate(`/${path.HOME}`);
                toast.success("Đăng nhập thành công!", { theme: 'colored' });
            } else {
                const errorMessage = rs.message || 'Something went wrong!';
                if (errorMessage === "User not found") {
                    toast.error("Tài khoản không tồn tại. Vui lòng kiểm tra lại email hoặc đăng ký tài khoản mới.", { theme: 'colored' });
                } else {
                    Swal.fire({
                        title: 'Oops!',
                        text: errorMessage,
                        icon: 'error'
                    });
                }
            }
        }
    }, [payload, isRegister, dispatch, navigate]);

    return (
        <div className='w-screen h-screen relative'>
            {isForgotPassword && (
                <div className='absolute animate-scale-up-center top-0 left-0 bottom-0 right-0 bg-overlay flex flex-col items-center justify-center py-8 z-50 '>
                    <div className='flex flex-col gap-4 bg-white rounded-lg pt-4 pb-4'>
                        <label htmlFor='email'>Enter your email: </label>
                        <input type='text'
                            id='email'
                            className='w-[800px] pb-2 border-b outline-none placeholder:text-sm rounded-lg'
                            placeholder='Exp: email@gmail.com'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center justify-center w-full gap-4'>
                        <Button
                            name='Back'
                            handleOnclick={() => setIsForgotPassword(false)} />
                        <Button
                            name='Submit'
                            handleOnclick={handleForgotPassword}
                            style='px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2'
                        />
                    </div>
                </div>
            )}
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
                            <span onClick={() => setIsForgotPassword(true)} className='text-blue-500 hover:underline cursor-pointer'>
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
            <ToastContainer />
        </div>
    );
};

export default Login;
