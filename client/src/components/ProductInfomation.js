import React, { memo, useState } from 'react';
import { ProductInfoTabs } from '../ultils/contants';
import { Button, Votebar, VoteOption } from './';
import { renderStartFromNumber } from '../ultils/helpers';
import { apiRatings } from '../apis'; // Đảm bảo apiRatings đã được import
import { useDispatch, useSelector } from 'react-redux';
import { showModel } from '../store/app/appSlice';
import Swal from 'sweetalert2';
import path from '../ultils/path';
import { useNavigate } from 'react-router-dom';

const activedStyles = 'bg-white border border-b-0';
const notActivedStyles = 'bg-gray-100';

const ProductInformation = ({ totalRatings, ratings, nameProduct, pid, rerender }) => {
    const [activedTab, setActivedTab] = useState(1);
    const dispatch = useDispatch();
    const { isLoggedIn, token } = useSelector(state => ({
        isLoggedIn: state.user.isLoggedIn,
        token: state.user.token,
    }));
    const navigate = useNavigate();

    const handleSubmitVoteOption = async ({ comment, score }) => {
        if (!token) {
            alert('You must be logged in to vote.'); // Thông báo nếu chưa đăng nhập
            return;
        }

        // Kiểm tra các tham số trước khi gọi API
        if (!comment || !pid || !score) {
            alert('Please fill all fields before submitting your vote.');
            return;
        }

        try {
            const response = await apiRatings({ star: score, comment, pid }, token);
            if (response && response.status) {
                // Nếu thành công, gọi lại hàm rerender để cập nhật
                rerender();
                dispatch(showModel({ isShowModel: false, modelChildren: null }));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Vote failed!',
                    text: response.message || 'An error occurred while submitting your vote.',
                });
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while submitting your vote!',
            });
        }
    };

    const handleVoteNow = () => {
        if (!isLoggedIn) {
            Swal.fire({
                text: 'Login to vote',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Go login',
                title: 'Oops!',
                showCancelButton: true,
            }).then((rs) => {
                if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
            });
        } else {
            dispatch(showModel({
                isShowModel: true,
                modelChildren: (
                    <VoteOption
                        nameProduct={nameProduct}
                        handleSubmitVoteOption={handleSubmitVoteOption}
                        closeModal={() => dispatch(showModel({ isShowModel: false }))}
                    />
                )
            }));
        }
    };

    return (
        <div>
            <div className='flex items-center gap-2 relative bottom-[-1px]'>
                {ProductInfoTabs.map(el => (
                    <span
                        className={`p-2 px-4 cursor-pointer ${activedTab === +el.id ? activedStyles : notActivedStyles}`}
                        key={el.id}
                        onClick={() => setActivedTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
                <div
                    className={`p-2 px-4 cursor-pointer ${activedTab === 5 ? activedStyles : notActivedStyles}`}
                    onClick={() => setActivedTab(5)}
                >
                    CUSTOMER REVIEW
                </div>
            </div>
            <div className='w-full border p-4'>
                {ProductInfoTabs.some(el => el.id === activedTab) && ProductInfoTabs.find(el => el.id === activedTab)?.content}
                {activedTab === 5 && (
                    <div>
                        <div className='flex p-4'>
                            <div className='flex-4 flex flex-col items-center justify-center border border-red-500'>
                                <span className='font-semibold text-3xl'>{totalRatings}/5</span>
                                <span className='flex items-center gap-1'>
                                    {renderStartFromNumber(totalRatings)?.map((el, index) => (
                                        <span key={index}>{el}</span>
                                    ))}
                                </span>
                                <span className='text-sm'>{`${ratings?.length} reviewers and commentors`}</span>
                            </div>
                            <div className='flex-6 border flex gap-2 flex-col p-4'>
                                {Array.from(Array(5).keys()).reverse().map(el => (
                                    <Votebar 
                                        key={el} 
                                        number={el + 1} 
                                        ratingTotal={ratings?.length} 
                                        ratingCount={ratings?.filter(i => i.star === el + 1)?.length} 
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='p-4 flex items-center justify-center text-sm flex-col gap-2'>
                            <span>Do you want to review this product?</span>
                            <Button handleOnclick={handleVoteNow}>Vote now!</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(ProductInformation);
