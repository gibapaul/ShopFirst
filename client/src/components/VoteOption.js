import React, { memo, useRef, useEffect, useState } from 'react';
import vote from '../assets/vote.jpg';
import { voteOptions } from '../ultils/contants';
import { AiFillStar } from 'react-icons/ai';
import { Button } from './';
import { useSelector } from 'react-redux';

const VoteOption = ({ nameProduct, handleSubmitVoteOption, closeModal }) => {
    const modelRef = useRef();
    const [chosenScore, setChosenScore] = useState(null);
    const [comment, setComment] = useState('');
    
    // Lấy token từ Redux store
    const token = useSelector(state => state.user.token);

    useEffect(() => {
        modelRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, []);

    const handleSubmit = async () => {
        if (chosenScore === null) {
            alert('Please select a score before submitting');
            return;
        }
        // Gọi handleSubmitVoteOption với token
        await handleSubmitVoteOption({ comment, score: chosenScore, token });
        closeModal(); // Đóng modal sau khi gửi
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40" onClick={closeModal}>
            <div
                onClick={e => e.stopPropagation()} // Ngăn chặn sự kiện click từ modal
                ref={modelRef}
                className='bg-white w-[700px] p-4 flex-col gap-4 flex items-center justify-center'
            >
                <img src={vote} className='w-[150px] my-8 object-contain' alt="Voting" />
                <h2 className='text-center text-lg'>{`Voting product ${nameProduct}`}</h2>
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder='Type something'
                    className='form-textarea w-full placeholder:italic placeholder:text-xs placeholder:text-gray-500 text-sm'
                />
                <div className='w-full flex flex-col gap-4'>
                    <p>How do you like this product?</p>
                    <div className='flex justify-center gap-4 items-center'>
                        {voteOptions.map(el => (
                            <div
                                onClick={() => setChosenScore(el.id)}
                                className={`w-[100px] cursor-pointer rounded-md p-4 flex items-center justify-center flex-col gap-2 ${chosenScore >= el.id ? 'bg-gray-300' : 'bg-gray-200'}`}
                                key={el.id}
                            >
                                <AiFillStar color={chosenScore !== null && chosenScore >= el.id ? 'orange' : 'gray'} />
                                <span>{el.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <Button handleOnclick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
};

export default memo(VoteOption);
