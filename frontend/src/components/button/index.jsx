import React from "react";
import Link from "next/link";

const Button = ({ children, action, title, style, link, handleClick,width}) => {
  switch (action) {
    case "info":
      style = "bg-info-base hover:bg-info-hover";
      break;
    case "danger":
      style = "bg-danger-base hover:bg-danger-hover";
      break;
    case "success":
      style = "bg-success-base hover:bg-success-hover";
      break;
    case "warning":
      style = "bg-warning-base hover:bg-warning-hover";
      break;
    default:
      style = "bg-primary-500 hover:bg-primary-700 text-black";
      break; 
  }

  return (
    <Link href={link || ""} legacyBehavior>
      <button
        className={`px-4 py-2 shadow rounded font-bold text-base inherit ${style} ${width}`}
        title={title}
        onClick={handleClick}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
