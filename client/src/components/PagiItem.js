import React, { useEffect } from "react";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";

const PagiItem = ({ children }) => {
  const [params] = useSearchParams();
  useEffect(() => {
    let paramsArray = [];
    for (let i of params.entries()) paramsArray.push(i);
    console.log(params);
  }, [params]);
  return (
    <div
      className={clsx(
        "w-10 h-10 flex justify-center cursor-pointer hover:rounded-full hover:bg-gray-300",
        !Number(children) && "items-end pb-2",
        Number(children) && "items-center"
      )}
    >
      {children}
    </div>
  );
};

export default PagiItem;
