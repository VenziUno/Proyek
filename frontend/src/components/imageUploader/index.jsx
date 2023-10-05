import Image from "next/image";
import React, { useState } from "react";

const ImageUploader = ({ type, value, onChildValueChange, style, title }) => {
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      onChildValueChange(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <React.Fragment>
      <label>
        <Image
          src={
            image != null
              ? image
              : value ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1WfzUrvX8yEaaPL4msLzB9Lfz4-n4M1_VQf1kbfOmkA&s"
          }
          alt="upload"
          width={100}
          height={100}
          className="w-44 h-44 rounded object-scale-down"
        ></Image>
        <input
          autoComplete="off"
          type={type}
          onChange={handleChange}
          className={`flex border border-slate-400 bg-white shadow rounded px-2 text-base py-2 outline-none ${style} hidden`}
          title={title}
        />
      </label>
    </React.Fragment>
  );
};

export default ImageUploader;
