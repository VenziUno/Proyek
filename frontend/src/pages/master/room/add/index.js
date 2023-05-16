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

export default function AddRoom() {
  const { room, basic } = useAppContext();
  const { form, setForm, resetForm } = room;
  const { notification, setNotification, handleShowNotification } = basic;
  const router = useRouter();

  const handleCheck = () => {
    if (
      form.code === "" ||
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
    console.log(room)
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
        console.log("success res", res);
        resetForm();
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

  const pilihan_status = [
    { label: "Aktif", value: 1 },
    { label: "Tidak Aktif", value: 0 },
  ];

  // client side data fetching
  const {
    res: resBuilding,
    isLoading: isLoadingBuilding,
    isError: isErrorBuilding,
  } = useFetcher("building");
  
  const {
    res: resCode,
    isLoading: isLoadingCode,
    isError: isErrorCode,
  } = useFetcher(`room/code`);

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

  // data processing
  const [pilihanBuilding, setPilihanBuilding] = useState([]);
  useEffect(() => {
    if (resBuilding) {
      const pilihan_Building = resBuilding.data.map((d) => {
        return { label: d.name, value: d.id };
      });
      setPilihanBuilding(pilihan_Building);
    }
  }, [resBuilding]);

  return (
    <Layout>
      <div className="space-y-2 p-5">
        <Label label="Add Room" type="title" style="border-b" />
        <div className="space-y-2">
          <Label label="Room Code">
            <InputFields
              type="text"
              style="w-full"
              placeholder="Room Code"
              title='Room Code'
              value={form.id}
              disabled
              setValue={(e) => setForm({ ...form, id: e.target.value })}
            ></InputFields>
          </Label>
          <Label label="Room Name">
            <InputFields
              type="text"
              style="w-full"
              placeholder="Room Name"
              title='Room Name'
              value={form.name}
              setValue={(e) => setForm({ ...form, name: e.target.value })}
            ></InputFields>
          </Label>
          <Label label="Building">
            <Selects
              list={pilihanBuilding}
              placeholder="Building"
              handleChange={(item) => setForm({ ...form, building_id: item.value })}
            />
          </Label>
          <Label label="Number of Floor">
            <InputFields
              type="number"
              min="0"
              placeholder="0"
              style="w-full"
              title='Floor Level'
              value={form.number_of_floor}
              setValue={(e) => setForm({ ...form, number_of_floor: e.target.value })}
            ></InputFields>
          </Label>
          <Label label="Maximum People">
            <InputFields
              type="number"
              min="0"
              placeholder="0"
              style="w-full"
              title='Maximum People'
              value={form.maximum_people}
              setValue={(e) => setForm({ ...form, maximum_people: e.target.value })}
            ></InputFields>
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
            link="/master/room"
            handleClick={resetForm}
          >
            Cancel
          </Button>
          <Button action="primary" 
          handleClick={handleSubmitAdd}
          >
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
}
