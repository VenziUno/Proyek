import React from "react";

const TextArea = ({ placeholder, style, value, setValue, disabled }) => {
  switch (disabled) {
    case true:
      style = "bg-gray-200";
      placeholder = null;
      break;
  }
  return (
      <textarea
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e)}
        placeholder={placeholder}
        className={`w-full border shadow bg-white h-fit px-4 py-3 text-xs rounded outline-none inline-flex ${style}`}
      />
  );
};

export default TextArea;