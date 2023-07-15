import Button from "@/components/button";
import InputFields from "@/components/inputFields";
import Label from "@/components/label";
import Layout from "@/components/layout";
import Selects from "@/components/selects";
import TextArea from "@/components/textArea";
import { useAppContext } from "@/hooks/useAppContext";
import { useFetcher } from "@/hooks/useFetcher";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function AddBanner() {
  const { banner, basic } = useAppContext();
  const { form, setForm, resetForm } = banner;
  const { notification, setNotification, handleShowNotification } = basic;
  const router = useRouter();

  const handleCheck = () => {
    if (
      form.id === "" ||
      form.name === "" ||
      form.description === "" ||
      form.image === [] ||
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

  const pilihan_status = [
    { label: "Aktif", value: 1 },
    { label: "Tidak Aktif", value: 0 },
  ];

  // client side data fetching
  const {
    res: resCode,
    isLoading: isLoadingCode,
    isError: isErrorCode,
  } = useFetcher(`role/code`);

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
          }/api/role`,
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
        router.push("/settings/role");
      } catch (error) {
        resetForm();
        setNotification({
          show: true,
          type: "Danger",
          message: error.message,
        });
        router.push("/settings/role");
      }
    }
  };
  return (
    <Layout>
      <div className="space-y-5 p-2">
        <Label label="Add Banner" type="title" />
        <div className="gap-2">
          <Label label="Banner Code">
            <InputFields
              type="text"
              style="w-full"
              placeholder="Banner Code"
              title="Banner Code"
              // value={form.id}
              // disabled
            />
          </Label>
          <Label label="Banner Name">
            <InputFields
              type="text"
              style="w-full"
              placeholder="Banner Name"
              title="Banner Name"
              // value={form.name}
              // setValue={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Label>
          <Label label="Banner Description">
            <TextArea
              type="text"
              style="w-full"
              placeholder="Banner Description"
              title="Banner Description"
              // value={form.description}
              // setValue={(e) =>
              //   setForm({ ...form, description: e.target.value })
              // }
            />
          </Label>
          <Label label="Banner Image">
            <InputFields
              type="file"
              style="w-full"
              placeholder="Banner Image"
              title="Banner Image"
              // value={form.image}
              // setValue={(e) => setForm({ ...form, image: e.target.value })}
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
          <Button action="light" link="/banner" handleClick={resetForm}>
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
