import React, { memo } from 'react';

const Button = ({ children, handleOnclick, style, fw }) => {
  return (
    <button
      type='button'
      className={style ? style : `px-4 py-2 rounded-md text-white bg-main font-semibold my-2 ${fw ? 'w-full' : 'w-fit'}`}
      onClick={handleOnclick}
    >
      {children}
    </button>
  );
};

export default memo(Button);
