import React, { useState, useEffect } from "react";
import Button from "@/components/button";
import Layout from "@/components/layout";
import Label from "@/components/label";
import InputFields from "@/components/inputFields";
import { useAppContext } from "@/hooks/useAppContext";
import { useFetcher } from "@/hooks/useFetcher";
import { useRouter } from "next/router";
import axios from "axios";
import Selects from "@/components/selects";

const EditGedung = ({ id }) => {
  const { building, basic } = useAppContext();
  const { form, setForm, resetForm } = building;
  const { notification, setNotification, handleShowNotification } = basic;
  const router = useRouter();
  const [status, setStatus] = useState();

  const pilihan_status = [
    { label: "Aktif", value: 1 },
    { label: "Tidak Aktif", value: 0 },
  ];

  const handleCheck = () => {
    if (
      form.code === "" ||
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
          message: res.data.message,
        });
        router.back();
      } catch (error) {
        resetForm();
        setNotification({
          show: true,
          type: "Danger",
          message: error.message,
        });
        router.back();
      }
    }
  };
  // client side data fetching
  const { res, isLoading, isError } = useFetcher(`building/${id}`);

  // set value
  useEffect(() => {
    if (res !== undefined) {
      setForm({
        id: res.id,
        name: res.name,
        floor: res.floor,
        long: res.long,
        tall: res.tall,
        wide: res.wide,
        status: res.status,
      });

      if (res.status === 0) {
        setStatus({ label: "Tidak Aktif", value: 0 });
      } else if (res.status === 1) {
        setStatus({ label: "Aktif", value: 1 });
      } else setStatus(null);
    }
  }, [res, setForm]);

  return (
    <Layout>
      <div className="space-y-5 p-2">
      <Label label="Edit Building" type="title" />
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
            {status && (
              <Selects
                list={pilihan_status}
                value={status}
                placeholder="Pilih Status"
                handleChange={(item) =>
                  setForm({ ...form, status: item.value })
                }
              />
            )}
          </Label>
        </div>
        <div className="flex flex-row justify-end gap-5">
          <Button
            action="light"
            link="/master/building"
            handleClick={resetForm}
          >
            Back
          </Button>
          <Button
            action="primary"
            handleClick={(e) => {
              e.preventDefault();
              handleSubmitEdit();
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  let id = ctx.query.id;
  return { props: { id } };
}

export default EditGedung;
