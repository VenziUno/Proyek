import Button from "@/components/button";
import InputFields from "@/components/inputFields";
import Label from "@/components/label";
import Link from "next/link";
import {router} from "next/router"
import React from "react";

export default function Login() {

  const handleApi = () => {
    router.push("/dashboard")
  }

  return (
    <div className="bg-primary-base">
      <div className="flex items-center justify-center h-screen m-auto">
        <div className="w-full bg-white rounded-lg shadow max-w-md px-6 py-6 space-y-2">
          <Label label="Sign in to your account" type="title"/>
          <div className="space-y-4">
            <Label label="Email">
              <InputFields type="email" style="w-full" placeholder="Enter Your Email" />
            </Label>
            <Label label="Password">
              <InputFields type="password" style="w-full" placeholder="* * * * * * * *" icon='eye'/>
            </Label>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <InputFields
                    style="w-full"
                    type="checkbox"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    className="text-gray-500"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <Link href="forgetPassword" legacyBehavior>
                <a
                  className="text-sm font-medium text-black hover:underline"
                >
                  Forget Password ?
                </a>
              </Link>
            </div>
            <Button style="w-full" width="w-full" handleClick={handleApi}>
              Sign in to your account
            </Button>
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet?{" "}
              <Link href="register" legacyBehavior>
                <a
                  className="text-sm font-medium text-black hover:underline"
                >
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
