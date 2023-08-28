import Button from "@/components/button";
import InputFields from "@/components/inputFields";
import Label from "@/components/label";
import Layout from "@/components/layout";
import React, { useState } from "react";

function AddAccount() {
  const { form, setForm, resetForm } = useState();
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
        router.push("/settings/account");
      } catch (error) {
        resetForm();
        setNotification({
          show: true,
          type: "Danger",
          message: error.message,
        });
        router.push("/settings/account");
      }
    }
  };
  return (
    <Layout>
      <div className="space-y-5 p-2">
        <Label label="Add Account" type="title" />
        <div className="space-y-2">
          <Label label="Name Account">
            <InputFields
              type="text"
              style="w-full"
              placeholder="Name"
              title="Name Account"
              value={form}
            />
          </Label>
          <Label label="Email Account">
            <InputFields
              type="text"
              style="w-full"
              placeholder="Email"
              title="Email Account"
              value={form}
            />
          </Label>
          <Label label="Password">
            <InputFields
              type="text"
              style="w-full"
              placeholder="Password"
              title="Password"
              value={form}
            />
          </Label>
          <Label label="Confirm Password">
            <InputFields
              type="text"
              style="w-full"
              placeholder="Confirm Password"
              title="Confirm Password"
              value={form}
            />
          </Label>
          <Label label="Role">
            <InputFields
              type="text"
              style="w-full"
              placeholder="Role"
              title="Role"
              value={form}
            />
          </Label>
        </div>
        <div className="flex flex-row justify-end gap-4">
          <Button
            action="light"
            link="/settings/account"
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

export default AddAccount;
