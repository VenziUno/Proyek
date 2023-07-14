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
  min,
  max,
  title,
}) => {
  switch (disabled) {
    case true:
      style = "font-3xl bg-slate-300 w-full";
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
                autoComplete="off"
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
                autoComplete="off"
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
            autoComplete="off"
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
    <>
      {type == "file" ? (
        <>
          <div class="flex extraOutline bg-white w-full bg-whtie m-auto rounded-lg">
            <div className="file_upload p-5 relative border w-full border-slate-400 rounded-lg">
              <svg
                class="text-primary-300 w-24 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div class="input_field flex flex-col w-max mx-auto text-center">
                <label>
                  <input
                    className="text-sm cursor-pointer w-36 hidden"
                    type="file"
                    multiple
                  />
                  <div className="text bg-primary-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-primary-300">
                    Select
                  </div>
                </label>

                <div className="title text-primary-500 uppercase">
                  or drop files here
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <input
            autoComplete="off"
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
        </>
      )}
    </>
  );
};

export default InputFields;
