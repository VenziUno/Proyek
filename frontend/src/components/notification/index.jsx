import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Notifikasi = ({ type, style, title, description }) => {
  switch (type) {
    case "Info":
      style = "bg-info-base";
      title = "Info Alert !";
      break;
    case "Success":
      style = "bg-success-base";
      title = "Success Alert !";
      break;
    case "Warning":
      style = "bg-warning-base";
      title = "Warning Alert !";
      break;
    case "Danger":
      style = "bg-danger-base";
      title = "Danger Alert !";
      break;
  }

  return (
    <div
      className={`w-fit z-10 h-auto max-h-36 ${style} rounded-lg shadow absolute top-4 right-4`}
    >
      <div className="px-4 py-2">
        <div className={`capitalize flex space-x-5 items-center `}>
          <div>
            <AiOutlineInfoCircle size="28" className="mt-1" />
          </div>
          <div className="whitespace-normal ">
            <div className="text-2xl font-bold flex">{title}</div>
            <div className="">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifikasi;
