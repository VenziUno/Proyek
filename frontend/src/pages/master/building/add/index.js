import Button from "@/components/button";
import InputFields from "@/components/inputFields";
import Label from "@/components/label";
import Layout from "@/components/layout";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { useFetcher } from "@/hooks/useFetcher";
import { useRouter } from "next/router";
import axios from "axios";
import Selects from "@/components/selects";

export default function AddBuilding() {
  const { building, basic } = useAppContext();
  const { form, setForm, resetForm } = building;
  const { notification, setNotification, handleShowNotification } = basic;
  const router = useRouter();

  const handleCheck = () => {
    if (
      form.id === "" ||
      form.name === "" ||
      form.floor === 0 ||
      form.long === 0 ||
      form.tall === 0 ||
      form.wide === 0 ||
      form.status === null
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

  const pilihan_status = [
    { label: "Aktif", value: 1 },
    { label: "Tidak Aktif", value: 0 },
  ];

  // client side data fetching
  const {
    res: resCode,
    isLoading: isLoadingCode,
    isError: isErrorCode,
  } = useFetcher(`building/code`);

  // set value
  useEffect(() => {
    if (resCode) {
      const { code, status } = resCode;
      if (status) {
        setForm({ ...form, id: code });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resCode, setForm]);

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
  return (
    <Layout>
      <div className="space-y-5 p-2">
        <Label label="Add Building" type="title" />
        <div className="">
          <Label label="Building Code">
            <InputFields
              type="text"
              style="w-full"
              placeholder="Building Code"
              title="Building Code"
              value={form.id}
              disabled
            />
          </Label>
          <Label label="Building Name">
            <InputFields
              type="text"
              style="w-full"
              placeholder="Building Name"
              title="Building Name"
              value={form.name}
              setValue={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Label>
          <Label label="Floor Level">
            <InputFields
              type="number"
              min="0"
              placeholder="0"
              style="w-full"
              title="Floor Level"
              value={form.floor}
              setValue={(e) => setForm({ ...form, floor: e.target.value })}
            />
          </Label>
          <Label label="Tall">
            <InputFields
              type="number"
              min="0"
              placeholder="0"
              style="w-full"
              title="Tall"
              value={form.tall}
              setValue={(e) => setForm({ ...form, tall: e.target.value })}
            />
          </Label>
          <Label label="Long">
            <InputFields
              type="number"
              min="0"
              placeholder="0"
              style="w-full"
              title="Long"
              value={form.long}
              setValue={(e) => setForm({ ...form, long: e.target.value })}
            />
          </Label>
          <Label label="Wide">
            <InputFields
              type="number"
              min="0"
              placeholder="0"
              style="w-full"
              title="Wide"
              value={form.wide}
              setValue={(e) => setForm({ ...form, wide: e.target.value })}
            />
          </Label>
          <Label label="Status">
            <Selects
              list={pilihan_status}
              placeholder="Pilih Status"
              handleChange={(item) => setForm({ ...form, status: item.value })}
            />
          </Label>
        </div>
        <div className="flex flex-row justify-end gap-4">
          <Button
            action="light"
            link="/master/building"
            handleClick={resetForm}
          >
            Cancel
          </Button>
          <Button action="primary" handleClick={handleSubmitAdd}>
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
}
