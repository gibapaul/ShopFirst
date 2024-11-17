import React, { memo } from "react";

const InputSelect = ({ value, changValue, options }) => {
  return (
    <select
      className="form-select text-sm"
      value={value}
      onChange={(e) => changValue(e.target.value)}
    >
      <option value="">Random</option>
      {options?.map((el) => (
        <option key={el.id} value={el.value}>
          {el.text}
        </option>
      ))}
    </select>
  );
};

export default memo(InputSelect);
