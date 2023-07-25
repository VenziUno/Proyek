import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { HiUpload } from "react-icons/hi";
import Image from "next/image";
import axios from "axios";
import { useAppContext } from "@/hooks/useAppContext";
import { data } from "autoprefixer";

const ImageUploader = ({ value, setValue, apiUrl, apiNameInput }) => {
  const [image, setImage] = useState(null);
  const [defaultValue, setDefaultValue] = useState(null);

  const { basic } = useAppContext();
  const { setLoadingSpinner, setNotification } = basic;
  const handleChangeImage = async (currentImage, addUpdateIndex) => {
    setImage(currentImage);
    // if (currentImage.length > 0) {
    //   const formData = new FormData();
    //   formData.append(apiNameInput, currentImage[0].file);
    //   if (apiUrl) {
    //     try {
    //       const token = sessionStorage.getItem("accessToken");
    //       setLoadingSpinner(true);
    //       const resImage = await axios.post(apiUrl, formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    //       const { data, status } = resImage.data;
    //       if (status) {
    //         setLoadingSpinner(false);
    //         setValue(data.link);
    //       }
    //     } catch (error) {
    //       setNotification({
    //         show: true,
    //         type: "Danger",
    //         message: error.message,
    //       });
    //     }
    //   }
    // } else {
      setValue(currentImage);
    // }
  };

  useEffect(() => {
    if (value) {
      setDefaultValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (image) {
      setDefaultValue(null);
    }
  }, [image]);

  return (
    <div className="w-full h-20 my-4">
      <ImageUploading
        value={image}
        onChange={handleChangeImage}
        dataURLKey="data-url"
      >
        {({
          imageList,
          onImageUpload,
          // onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          // isDragging,
          dragProps,
        }) => {
          // let classBtn = "";
          // if (isDragging) {
          //   classBtn = "text-primary-900";
          // } else {
          //   classBtn = "text-gray-400";
          // }
          return (
            <div className="flex flex-row gap-8 w-full h-full">
              {defaultValue ? (
                <div className="w-20 h-full relative">
                  <Image
                    src={defaultValue}
                    alt="default image"
                    className="object-cover rounded-full shadow-lg"
                    fill
                  />
                </div>
              ) : imageList.length === 0 ? (
                <button
                  className={`w-20 h-full rounded-full border shadow-md flex justify-center items-center`}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <HiUpload size={20} />
                </button>
              ) : (
                imageList.map((image, index) => (
                  <div className="w-20 h-full relative" key={"image" + index}>
                    <Image
                      src={image["data-url"]}
                      alt="image"
                      key={"image" + index}
                      className="object-cover rounded-full shadow-lg"
                      fill
                    />
                  </div>
                ))
              )}

              <div className="flex flex-row gap-5 items-center">
                <button
                  onClick={() => onImageUpdate(0)}
                  className="text-sm text-primary-900 font-bold"
                >
                  {imageList.length === 0 ? "Upload" : "Change"}
                </button>
                <button
                  onClick={() => onImageRemove(0)}
                  className="text-sm text-red-900 font-bold disabled:text-gray-300"
                  disabled={imageList.length === 0 ? true : false}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        }}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;