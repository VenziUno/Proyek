import React from "react";
import Button from "@/components/button";
import { AiOutlineClose } from "react-icons/ai";
import { ImNotification } from "react-icons/im";
import { useAppContext } from "@/hooks/useAppContext";
import { useRouter } from "next/router";
import axios from "axios";

export default function CardNotif({ type, title }) {
  const { user, basic } = useAppContext();
  const { setShowLogout, deleteItem, setDeleteItem } = user;
  console.log(type)
  const location = useRouter();
  const path = location.asPath;
  const query = location.query.page;
  const { notification, setNotification, handleShowNotification } = basic;

  const handleConfirm = async (e) => {
    e.preventDefault();
    // if (deleteItem.data === 1) {
    //   location.push(`${location.basePath}?page=${query - 1}`);
    // }
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
    } else if (type === "delete") {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.delete(deleteItem.url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        location.reload();
        setNotification({
          show: true,
          type: "Success",
          message: res.data.message,
        });
      } catch (error) {
        location.reload();
        setNotification({
          show: true,
          type: "Danger",
          message: error.message,
        });
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (type === "logout") {
      setShowLogout(false);
    } else if (type === "delete") {
      setDeleteItem({
        show: false,
        url: null,
      });
    }
  };

  return (
    <div className="absolute z-50 flex justify-center align-middle items-center w-full h-screen ">
      <div className="bg-white w-96 py-4 border border-slate-400 shadow flex flex-col items-center justify-center rounded-xl space-y-3 m-2">
        {type ? null : (
          <div className="w-full flex justify-end px-5">
            <Button type="icon" link={path + "/dashboard"}>
              <AiOutlineClose />
            </Button>
          </div>
        )}
        <ImNotification size={96} className="text-danger-base" />
        <div className="text-center">
          <div className="text-2xl">
            {type
              ? title || "Are you sure you want to Delete this data?"
              : "Data Deleted!"}
          </div>
        </div>
        <div className="w-full flex justify-center items-center px-16">
          {type ? (
            <div className="w-full flex justify-evenly">
              <Button action="light" handleClick={(e) => handleConfirm(e)}>
                {{
                  logout: "Logout",
                  delete: "Delete",
                }[type] || ""}
              </Button>
              <Button handleClick={(e) => handleCancel(e)}>Cancel</Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}