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
        remember: account.remember,
      })
      .then((res) => {
        if (account.remember) {
          console.log(res.data.token)
          localStorage.setItem("token", res.data.token);
        } else {
          console.log(res.data.token)
          sessionStorage.setItem("token", res.data.token);
        }
        router.push("/dashboard");
      })
      .catch((error) => console.log(error));
  };

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
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <InputFields
                    style="w-full"
                    type="checkbox"
                    value={account.remember}
                    setValue={(e) =>
                      setAccount({ ...account, remember: !account.remember })
                    }
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="text-gray-500">Remember me</label>
                </div>
              </div>
              <Link href="forgetPassword" legacyBehavior>
                <a className="text-sm font-medium text-black hover:underline">
                  Forget Password ?
                </a>
              </Link>
            </div>
            <Button style="w-full" width="w-full" handleClick={handleApi} >
              Sign in to your account
            </Button>
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet?{" "}
              <Link href="register" legacyBehavior>
                <a className="text-sm font-medium text-black hover:underline">
                  Sign up
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
