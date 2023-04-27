import Button from "@/components/button";
import InputFields from "@/components/inputFields";
import Label from "@/components/label";
import axios from "axios";
import Link from "next/link";
import { router } from "next/router";
import React, { useState } from "react";

export default function Register() {
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleApi = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        name: account.name,
        email: account.email,
        password: account.password,
        password_confirmation: account.password_confirmation,
      })
      .then((res) => {
        // sessionStorage.setItem("token", res.data.token);
        router.push("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-primary-base">
      <div className="flex items-center justify-center h-screen m-auto">
        <div className="w-full bg-white rounded-lg shadow max-w-md px-6 py-6 space-y-2">
          <Label label="Create and account" type="title" />
          <div className="space-y-4">
            <Label label="Name">
              <InputFields
                type="text"
                style="w-full"
                placeholder="Enter Your Name"
                value={account.name}
                setValue={(e)=>setAccount({...account,name: e.target.value})}
              />
            </Label>
            <Label label="Email">
              <InputFields
                type="email"
                style="w-full"
                placeholder="Enter Your Email"
                value={account.email}
                setValue={(e)=>setAccount({...account,email: e.target.value})}
              />
            </Label>
            <Label label="Password">
              <InputFields
                type="password"
                style="w-full"
                placeholder="* * * * * * * *"
                icon="eye"
                value={account.password}
                setValue={(e)=>setAccount({...account,password: e.target.value})}
              />
            </Label>
            <Label label="Confirm Password">
              <InputFields
                type="password"
                style="w-full"
                placeholder="* * * * * * * *"
                icon="eye"
                value={account.password_confirmation}
                setValue={(e)=>setAccount({...account,password_confirmation: e.target.value})}
              />
            </Label>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <InputFields
                    style="w-full"
                    type="checkbox"
                    placeholder="Enter Your Email"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="text-gray-500 dark:text-gray-300">
                    I accept the{" "}
                    <Link href="/terms_and_conditions" legacyBehavior>
                      <a className="text-sm font-medium text-black hover:underline">
                        Terms and Conditions
                      </a>
                    </Link>
                  </label>
                </div>
              </div>
            </div>
            <Button style="w-full" width="w-full" handleClick={handleApi}>
              Create an account
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="login" legacyBehavior>
                <a className="text-sm font-medium text-black hover:underline ">
                  Login here
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
