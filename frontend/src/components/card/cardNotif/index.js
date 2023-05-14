import React from "react";
import Image from "next/image";
import Button from "../../Buttons";
import { AiOutlineClose } from "react-icons/ai";
import { useAppContext } from "@/hooks/useAppContext";
import { useRouter } from "next/router";
import axios from "axios";

export default function CardNotif({ type, desc, title }) {
  const { user, basic } = useAppContext();

  const {
    setShowLogout,
    archive,
    setArchive,
    unarchive,
    setUnarchive,
    deleteItem,
    setDeleteItem,
  } = user;


  const location = useRouter();
  const path = location.asPath;
  const { notification, setNotification, handleShowNotification } = basic;

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (type === "logout") {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.post(
            `${
              typeof window === "undefined"
                ? process.env.API_URL_SSR
                : process.env.API_URL
            }/logout`,
            { token: token },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          sessionStorage.clear();
          setShowLogout(false);
          location.push("/login");
        } catch (error) {
          setNotification({
            show: true,
            type: "Danger",
            message: error.message,
          });
        }
      }
    } else if (type === "archive") {
      try {
        const token = sessionStorage.getItem("accessToken");
        const res = await axios.post(
          archive.url,
          { token: token },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        location.reload();
      } catch (error) {
        location.reload();
      }
    } else if (type === "unarchive") {
      try {
        const token = sessionStorage.getItem("accessToken");
        const res = await axios.post(
          unarchive.url,
          { token: token },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        location.reload();
      } catch (error) {
        location.reload();
      }
    } else if (type === "delete") {
      try {
        const token = sessionStorage.getItem("accessToken");
        const res = await axios.delete(deleteItem.url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        location.reload();
      } catch (error) {
        location.reload();
      }
    }
  };

//   const handleCancel = (e) => {
//     e.preventDefault();
//     if (type === "logout") {
//       setShowLogout(false);
//     } else if (type === "archive") {
//       setArchive({
//         show: false,
//         url: null,
//       });
//     } else if (type === "unarchive") {
//       setUnarchive({
//         show: false,
//         url: null,
//       });
//     } else if (type === "delete") {
//       setDeleteItem({
//         show: false,
//         url: null,
//       });
//     }
//   };

  return (
    // <div className="absolute z-50 backdrop-blur-sm bg-white/30 flex justify-center align-middle items-center w-full h-screen ">
    //   <div className="bg-white w-96 py-4 border shadow flex flex-col items-center justify-center rounded-xl space-y-3 m-2">
    //     {type ? null : (
    //       <div className="w-full flex justify-end px-5">
    //         <Button type="icon" link={path + "/dashboard"}>
    //           <AiOutlineClose />
    //         </Button>
    //       </div>
    //     )}
    //     <div className="w-28 h-28">
    //       <Image
    //         src={type ? "/images/icon/warning.png" : "/images/icon/correct.png"}
    //         width={2000}
    //         height={2000}
    //         alt="Notif"
    //         className="w-28 h-28"
    //       />
    //     </div>
    //     <div className="text-center">
    //       <div className="font-bold text-base">
    //         {type ? title || "Yakin Ingin Menghapus Data?" : "Data Deleted!"}
    //       </div>
    //       <div className="text-xs">
    //         {type
    //           ? desc ||
    //             "Setelah data dihapus, data ini tidak dapat dikembalikan!"
    //           : null}
    //       </div>
    //     </div>
    //     <div className="w-full flex justify-center items-center px-10">
    //       {type ? (
    //         <div className="w-full flex justify-evenly">
    //           <Button type="light" handleClick={(e) => handleConfirm(e)}>
    //             {{
    //               logout: "Logout",
    //               archive: "Archive",
    //               unarchive: "Unarchive",
    //             }[type] || "Delete"}
    //           </Button>
    //           <Button handleClick={(e) => handleCancel(e)}>Cancel</Button>
    //         </div>
    //       ) : null}
    //     </div>
    //   </div>
    // </div>
    <div>A</div>
  );
}