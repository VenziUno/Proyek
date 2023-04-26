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
  label,
  style,
  icon,
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
      className={`flex border border-slate-400 bg-white shadow rounded px-2 text-base py-2 outline-none ${style}`}
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
                label={label || placeholder}
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
                label={label || placeholder}
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
          <input
            type={type}
            value={value}
            onChange={setValue}
            placeholder={placeholder}
            disabled={disabled}
            label={label || placeholder}
            className={`${style} outline-none`}
          />
          <button>
            <AiOutlineSearch />
          </button>
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
      label={label || placeholder}
      className={`flex border border-slate-400 bg-white shadow rounded px-2 text-base py-2 outline-none ${style}`}
    />
  );
};

export default InputFields;
