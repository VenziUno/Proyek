import React from "react";

const Label = ({ children, label, type, style}) => {

  switch (type){
    case "title":
      style="text-3xl capitalize";
      break;
    default:
      style="";
      break;
  }

  return (
    <div className="flex flex-col">
      <div className={`font-bold ${style}`}>{label}</div>
      <div>{children}</div>
    </div>
  );
};

export default Label;
