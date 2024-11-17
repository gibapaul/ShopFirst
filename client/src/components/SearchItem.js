import React, { memo, useEffect, useState } from "react";
import icons from "../ultils/icons";
import { colors } from "../ultils/contants";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { apiGetProducts } from "../apis";
import useDebounce from "../hooks/useDebounce";

const { AiOutlineDown } = icons;

const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const { category } = useParams();
  const [bestPrice, setBestPrice] = useState(null);
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });

  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl)
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
    changeActiveFilter(null);
  };

  const fetchBestPriceProduct = async () => {
    const response = await apiGetProducts({ sort: "-price", limit: 1 });
    if (response.success) setBestPrice(response.products[0].price);
  };

  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(","),
        }).toString(),
      });
    } else {
      navigate(`/${category}`);
    }
  }, [selected]);

  useEffect(() => {
    if (type === "input") fetchBestPriceProduct();
  }, [type]);
  useEffect(() => {
    if (price.from > price.to) alert("From price cannot greater than to price");
  }, [price]);
  const deboucePriceFrom = useDebounce(price.from, 500);
  const deboucePriceTo = useDebounce(price.to, 500);
  useEffect(() => {
    const data = {};
    if (Number(price.from) > 0) data.from = price.from;
    if (Number(price.to) > 0) data.to = price.to;
    navigate({
      path: `/${category}`,
      search: createSearchParams(data).toString(),
    });
  }, [deboucePriceFrom, deboucePriceTo]);

  return (
    <div
      onClick={() => changeActiveFilter(name)}
      className="p-3 text-gray-500 text-xs gap-6 relative border border-gray-800 flex justify-center items-center"
    >
      <span className="capitalize">{name}</span>
      <AiOutlineDown />
      {activeClick === name && (
        <div className="absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[150px]">
          {type === "checkbox" && (
            <div className="">
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  className="underline hover:text-main cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]); // Reset selected colors
                  }}
                >
                  Reset
                </span>
              </div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-3 mt-4"
              >
                {colors.map((el, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={el}
                      onChange={handleSelect}
                      id={el}
                      checked={selected.some(
                        (selecteditem) => selecteditem === el
                      )}
                    />
                    <label className="capitalize text-gray-700" htmlFor={el}>
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeClick === name && type === "input" && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[150px]"
            >
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`Giá cao nhất là ${Number(
                  bestPrice
                ).toLocaleString()} VND`}</span>
                <span
                  className="underline hover:text-main cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrice({ from: "", to: "" });
                    changeActiveFilter(null);
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">Từ</label>
                  <input
                    className="form-input"
                    type="text"
                    id="from"
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">Đến</label>
                  <input
                    className="form-input"
                    type="text"
                    id="to"
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
