import Button from "@/components/button";
import InputFields from "@/components/inputFields";
import Label from "@/components/label";
import axios from "axios";
import Link from "next/link";
import { router } from "next/router";
import React, { useEffect, useState } from "react";

export default function Login() {
  const [account, setAccount] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleApi = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        email: account.email,
        password: account.password,
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.authorisation.token);
        router.push("/dashboard");
      })
      .catch((error) => console.log(error));
  };
  
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      // Jika ada informasi login yang tersimpan, hapus session storage
      sessionStorage.clear();
      // Redirect ke halaman login
      window.location.href = "/login";
    }
  });

  return (
    <div className="bg-primary-base">
      <div className="flex items-center justify-center h-screen m-auto">
        <div className="w-full bg-white rounded-lg shadow max-w-md px-6 py-6 space-y-2">
          <Label label="Sign in to your account" type="title" />
          <div className="space-y-4">
            <Label label="Email">
              <InputFields
                type="email"
                style="w-full"
                placeholder="Enter Your Email"
                value={account.email}
                setValue={(e) =>
                  setAccount({ ...account, email: e.target.value })
                }
              />
            </Label>
            <Label label="Password">
              <InputFields
                type="password"
                style="w-full"
                placeholder="* * * * * * * *"
                icon="eye"
                value={account.password}
                setValue={(e) =>
                  setAccount({ ...account, password: e.target.value })
                }
              />
            </Label>

            <Button style="w-full" width="w-full" handleClick={handleApi}>
              Sign in to your account
            </Button>
            <div className="flex items-center justify-between">
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <Link href="register" legacyBehavior>
                  <a className="text-sm font-medium text-black hover:underline">
                    Sign up
                  </a>
                </Link>
              </p>
              <Link href="forgetPassword" legacyBehavior>
                <a className="text-sm font-medium text-black hover:underline">
                  Forget Password ?
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
