import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import Button from "../Buttons";

const Selects = ({
  list,
  size,
  description,
  handleChange,
  value,
  search,
  disable,
}) => {
  const [selected, setSelected] = useState({
    label: value ? value.label : "",
    value: value ? value.value : "",
  });

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={`${size}`}>
      <div
        onClick={() => setOpen(!open)}
        className={
          disable
            ? `bg-gray-200 px-4 py-2 text-xs flex items-center justify-between rounded border shadow capitalize ${size}`
            : `bg-white px-4 py-2 text-xs flex items-center justify-between rounded border shadow capitalize ${size}`
          }
      >
        {selected.label ? selected.label || value : description}
        {disable ? (
          <BiChevronDown />
        ) : (
          <BiChevronDown className={`${open && "rotate-180"}`} />
        )}
      </div>
      {disable ? (
        <></>
      ) : (
        <div className="w-full relative">
          <ul
            className={`bg-white overflow-y-auto rounded shadow
        ${
          open
            ? `max-h-[250px] mt-2 mb-2 shadow border absolute z-50 ${size}`
            : "hidden"
        }`}
          >
            {search ? (
              <div className="flex  rounded-full border m-2 px-2 text-xs capitalize sticky top-2 bg-white bg-opacity-80 opacity-90">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                  className={`rounded-full w-full outline-none px-4 capitalize`}
                  placeholder={"Search . . ."}
                  autoFocus
                />
                <Button type="icon" variant="icon">
                  <FaSearch />
                </Button>
              </div>
            ) : (
              <></>
            )}
            {list.map((item) => (
              <li
                key={item.label}
                className={`rounded m-2 p-2 text-xs hover:bg-gray-200 capitalize 
            ${item.label === selected.label && "bg-gray-200"}
            ${
              search
                ? item.label.toLowerCase().includes(inputValue)
                  ? "block"
                  : "hidden"
                : ""
            }
            `}
                onClick={() => {
                  if (item.label !== selected.label) {
                    setSelected(item);
                    setOpen(false);
                    if (handleChange) {
                      handleChange(item);
                    }
                  }
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Selects;