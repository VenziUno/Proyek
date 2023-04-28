import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Notifikasi = ({ action, style }) => {
  switch (action) {
    case "info":
      style = "bg-info-base";
      break;
    case "success":
      style = "bg-success-base";
      break;
    case "warning":
      style = "bg-warning-base";
      break;
    case "danger":
      style = "bg-danger-base";
      break;
  }

  return (
    <div
      className={`w-96 h-auto max-h-36 ${style} rounded-lg shadow absolute top-4 right-4`}
    >
      <div className="p-4">
        <div className={`capitalize flex space-x-2 `}>
          <div>
            <AiOutlineInfoCircle size="28" className="mt-1" />
          </div>
          <div className="whitespace-normal ">
            <div className="text-2xl font-bold flex">{action}</div>
            <div className="">message</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifikasi;
