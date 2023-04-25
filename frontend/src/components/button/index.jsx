import React from "react";
import Link from "next/link";

const Button = ({ children, action, title, style, link, handleClick,width}) => {
  // console.log(style)
  switch (action) {
    case "info":
      style = "bg-blue-200";
      break;
    case "danger":
      style = "bg-red-200";
      break;
    case "success":
      style = "bg-green-200";
      break;
    case "warning":
      style = "bg-yellow-200";
      break;
    default:
      style = "bg-purple-200";
      break;
  }

  return (
    <Link href={link || ""} legacyBehavior>
      <button
        className={`px-4 py-2 shadow rounded font-light text-base inherit ${style} ${width}`}
        title={title}
        onClick={handleClick}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
