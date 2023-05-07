import React from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineSwapLeft } from "react-icons/ai";

const TableBottomNav = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="border px-4 py-2 rounded flex gap-2 items-center">
        <AiOutlineDoubleLeft/>
        <div>Back</div>
      </div>
      <div className="flex gap-2">
        <div className="border px-4 py-2 rounded">1</div>
        <div className="border px-4 py-2 rounded">2</div>
        <div className="border px-4 py-2 rounded">3</div>
        <div className="border px-4 py-2 rounded">...</div>
        <div className="border px-4 py-2 rounded">50</div>
      </div>
      <div className="border px-4 py-2 rounded flex gap-2 items-center">
        <div>Next</div>
        <AiOutlineDoubleRight/>
      </div>
    </div>
  );
};

export default TableBottomNav;
