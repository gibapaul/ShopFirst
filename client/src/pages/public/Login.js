import React, { useState, useCallback, useEffect } from 'react';
import { InputField, Button } from '../../components';
import { apiRegister, apiLogin, apiForgotPassword, apiFinalRegister } from '../../apis/user';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import path from '../../ultils/path';
import { login } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { validate } from '../../ultils/helpers';
import { getCurrent } from '../../store/user/asyncAction'; // Import getCurrent

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: ''
    });
    const [isVerifieldEmail, setIsVerifieldEmail] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    // Reset payload when switching between modes
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: ''
        });
    };

    // Handle forgot password logic
    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({ email });
        if (response.success) {
            toast.success("Email khôi phục đã được gửi. Hãy kiểm tra email của bạn!", { theme: 'colored' });
        } else {
            toast.error(response.message || "Có lỗi xảy ra!", { theme: 'colored' });
        }
    };

    // Reset payload when register state changes
    useEffect(() => {
        resetPayload();
    }, [isRegister]);

    // Validate input fields
    const validateInput = () => {
        const errors = [];
        if (!payload.email.includes('@')) {
            errors.push('Email không hợp lệ');
        }
        if (payload.password.length < 6) {
            errors.push('Mật khẩu phải có ít nhất 6 ký tự');
        }
        return errors;
    };

    const handleSubmit = useCallback(async () => {
        const validationErrors = validateInput();
        if (validationErrors.length) {
            toast.error(validationErrors.join('. '), { theme: 'colored' });
            return;
        }

        const { firstname, lastname, mobile, ...data } = payload;
        const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
        
        if (invalids === 0) {
            if (isRegister) {
                const response = await apiRegister(payload);
                if (response?.success) {
                    setIsVerifieldEmail(true);
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
                    dispatch(login({ isLoggedIn: true, token: rs.accessToken })); // Cập nhật trạng thái đăng nhập
                    dispatch(getCurrent()); // Gọi getCurrent() để lấy thông tin người dùng
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
        }
    }, [payload, isRegister, dispatch, navigate]);

    const finalRegister = async () => {
        const response = await apiFinalRegister(token);
        if (response.success) {
            Swal.fire('Congratulation!', response.mes, 'success').then(() => {
                setIsRegister(false);
                resetPayload();
            });
        } else {
            Swal.fire({
                title: 'Oops!',
                text: response.message || 'Something went wrong!',
                icon: 'error'
            });
            setIsVerifieldEmail(false);
            setToken('');
        }
    };

    return (
        <div className='w-screen h-screen relative'>
            {isVerifieldEmail && (
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay z-50 flex flex-col items-center justify-center'>
                    <div className='bg-white w-[500px] rounded-md p-8'>
                        <h4 className=''>Check your mail and enter code here</h4>
                        <input
                            type='text'
                            value={token}
                            onChange={e => setToken(e.target.value)}
                            className='p-2 border rounded-e-md outline-none'
                        />
                        <button
                            type='button'
                            className='px-4 py-3 bg-blue-500 font-semibold text-white rounded-md ml-4'
                            onClick={finalRegister}>
                            Submit
                        </button>
                    </div>
                </div>
            )}
            {isForgotPassword && (
                <div className='absolute animate-scale-up-center top-0 left-0 bottom-0 right-0 bg-overlay flex flex-col items-center justify-center py-8 z-50 '>
                    <div className='flex flex-col gap-4 bg-white rounded-lg pt-4 pb-4'>
                        <label htmlFor='email'>Enter your email: </label>
                        <input
                            type='text'
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
                            handleOnclick={() => setIsForgotPassword(false)}
                        />
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
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                            <InputField
                                value={payload.lastname}
                                setValue={setPayload}
                                nameKey='lastname'
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                        </div>
                    )}
                    <InputField
                        value={payload.email}
                        setValue={setPayload}
                        nameKey='email'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    {isRegister && (
                        <InputField
                            value={payload.mobile}
                            setValue={setPayload}
                            nameKey='mobile'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                    )}
                    <InputField
                        value={payload.password}
                        setValue={setPayload}
                        nameKey='password'
                        type='password'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <Button
                        handleOnclick={handleSubmit}
                        fw
                    > {isRegister ? 'Register' : 'Login'}
                    </Button>
                    <div className='flex items-center justify-between my-2 w-full text-sm'>
                        {!isRegister && (
                            <span
                                onClick={() => setIsForgotPassword(true)}
                                className='text-blue-500 hover:underline cursor-pointer'>
                                Forgot your account?
                            </span>
                        )}
                        {!isRegister && (
                            <span
                                className='text-blue-500 hover:underline cursor-pointer'
                                onClick={() => setIsRegister(true)}>
                                Create account
                            </span>
                        )}
                        {isRegister && (
                            <span
                                className='text-blue-500 hover:underline cursor-pointer w-full text-center'
                                onClick={() => setIsRegister(false)}>
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
