import React from "react";

const InputFields = ({
  type,
  value,
  setValue,
  placeholder,
  disabled,
  label,
  style,
}) => {
  switch (disabled) {
    case true:
      style = "font-3xl bg-slate-300 ";
      placeholder = null;
      break;
  }

  return (
    <input
      type={type}
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      disabled={disabled}
      label={label || placeholder}
      className={`border border-slate-400 bg-white shadow rounded px-2 text-base py-2 outline-none ${style}`}
    />
  );
};

export default InputFields;
