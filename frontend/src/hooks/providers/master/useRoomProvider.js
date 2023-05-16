import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useBasicProvider } from "../useBasicProvider";

export const useRoomProvider = () => {
  const { notification, setNotification, handleShowNotification } =useBasicProvider();
  const router = useRouter();

  const [form, setForm] = useState({
    id: "",
    name: "",
    number_of_floor: 0,
    maximum_people: 0,
    building_id: "",
    status: 0,
  });

  const resetForm = () => {
    setForm({
      id: "",
      name: "",
      number_of_floor: 0,
      maximum_people: 0,
      building_id: "",
      status: 0,
    });
  };

  const handleCheck = () => {
    if (
      form.id === "" ||
      form.name === "" ||
      form.number_of_floor === 0 ||
      form.maximum_people === 0 ||
      form.building_id === "" ||
      form.status === 0
    ) {
      setNotification({
        show: true,
        type: "Warning",
        message: "Please fill in all fields.",
      });
      return false;
    } else {
      return true;
    }
  };

  const handleSubmitAdd = async () => {
    if (handleCheck()) {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.post(
          `${
            typeof window === "undefined"
              ? process.env.API_URL_SSR
              : process.env.API_URL
          }/api/room`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        resetForm();
        console.log(res);
        setNotification({
          show: true,
          type: "Success",
          message: res.data.message,
        });
        router.push("/master/room");
      } catch (error) {
        resetForm();
        setNotification({
          show: true,
          type: "Danger",
          message: error.message,
        });
        router.push("/master/room");
      }
    }
  };

  const handleSubmitEdit = async () => {
    if (handleCheck()) {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.post(
          `${
            typeof window === "undefined"
              ? process.env.API_URL_SSR
              : process.env.API_URL
          }/api/room/${form.id}`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        resetForm();
        setNotification({
          show: true,
          type: "Success",
          message: "Edit data success !",
        });
        router.push("/master/room");
      } catch (error) {
        resetForm();
        setNotification({
          show: true,
          type: "Danger",
          message: error.message,
        });
        router.push("/master/room");
      }
    }
  };

  return {
    form,
    setForm,
    resetForm,
    handleSubmitAdd,
    handleSubmitEdit,
  };
};
