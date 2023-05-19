import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useBasicProvider } from "../useBasicProvider";

export const useBuildingProvider = () => {
  const { notification, setNotification, handleShowNotification } = useBasicProvider();

  const router = useRouter();

  const [form, setForm] = useState({
    id: "",
    name: "",
    floor: 0,
    long: 0,
    tall: 0,
    wide: 0,
    status: null,
  });

  const resetForm = () => {
    setForm({
      id: "",
      name: "",
      floor: 0,
      long: 0,
      tall: 0,
      wide: 0,
      status: null,
    });
  };

  const handleCheck = () => {
    if (
      form.id === "" ||
      form.name === "" ||
      form.floor === 0 ||
      form.long === 0 ||
      form.tall === 0 ||
      form.wide === 0 ||
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
          }/api/building`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        resetForm();
        console.log(res)
        setNotification({
          show: true,
          type: "Success",
          message: res.data.message,
        });
        router.push("/master/building");
      } catch (error) {
        resetForm();
        setNotification({
          show: true,
          type: "Danger",
          message: error.message,
        });
        router.push("/master/building");
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
          }/api/building/${form.id}`,
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
        router.push("/master/building");
      } catch (error) {
        resetForm();
        setNotification({
          show: true,
          type: "Danger",
          message: error.message,
        });
        router.push("/master/building");
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