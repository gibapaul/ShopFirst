import React, { memo, useState } from 'react';
import { ProductInfoTabs } from '../ultils/contants';
import { Button, Votebar, VoteOption, Comment } from './';
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
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const token = useSelector(state => state.user.token);
    const navigate = useNavigate();

    const handleSubmitVoteOption = async ({ comment, score }) => {
        if (!token) {
            alert('You must be logged in to vote.');
            return;
        }

        if (!comment || !pid || !score) {
            alert('Please fill all fields before submitting your vote.');
            return;
        }

        try {
            const response = await apiRatings({ star: score, comment, pid }, token);
            if (response && response.status) {
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
            </div>
            <div className='w-full border p-4'>
                {ProductInfoTabs.some(el => el.id === activedTab) && ProductInfoTabs.find(el => el.id === activedTab)?.content}
            </div>
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
            <div className='flex flex-col gap-4'>
                {ratings?.map(el => (
                    <Comment
                        key={el._id}
                        star={el.star}
                        updatedAt={el.updatedAt}
                        comment={el.comment}
                        name={el.postedBy ? `${el.postedBy.lastname} ${el.postedBy.firstname}` : 'Anonymous'}
    />
                ))}
            </div>
        </div>
    );
};

export default memo(ProductInformation);
