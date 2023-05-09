import React, { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineSearch,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

const InputFields = ({
  type,
  value,
  setValue,
  placeholder,
  disabled,
  style,
  icon,
  iconStyle,
  min,
  max,
  title,
}) => {
  switch (disabled) {
    case true:
      style = "font-3xl bg-slate-300 ";
      placeholder = null;
      break;
  }

  const [isActive, setIsActive] = useState(false);

  return icon ? (
    <div
      className={`flex border border-slate-400 bg-white shadow text-base py-2 outline-none ${style} rounded px-2`}
    >
      {icon == "eye" ? (
        <>
          {isActive ? (
            <>
              <input
                type="text"
                value={value}
                onChange={setValue}
                placeholder={placeholder}
                disabled={disabled}
                title={title}
                className={`${style} outline-none`}
              />
              <button className="cursor-pointer px-2">
                <AiOutlineEye onClick={() => setIsActive(!isActive)} />
              </button>
            </>
          ) : (
            <>
              <input
                type={type}
                value={value}
                onChange={setValue}
                placeholder={placeholder}
                disabled={disabled}
                title={title}
                className={`${style} outline-none`}
              />
              <button className="cursor-pointer px-2">
                <AiOutlineEyeInvisible
                  onClick={() => {
                    setIsActive(!isActive);
                  }}
                />
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <button className="px-1 hover:rounded-full hover:bg-slate-400">
            <AiOutlineSearch />
          </button>
          <input
            type={type}
            value={value}
            onChange={setValue}
            placeholder={placeholder}
            disabled={disabled}
            title={title}
            className={`${style} pl-1 outline-none`}
          />
        </>
      )}
    </div>
  ) : (
    <input
      type={type}
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      disabled={disabled}
      className={`flex border border-slate-400 bg-white shadow rounded px-2 text-base py-2 outline-none ${style}`}
      min={min}
      max={max}
      title={title}
    />
  );
};

export default InputFields;
