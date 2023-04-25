import Button from "@/components/button";
import InputFields from "@/components/inputFields";
import Label from "@/components/label";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="bg-blue-200">
      <div className="flex items-center justify-center h-screen m-auto">
        <div className="w-full bg-white rounded-lg shadow max-w-md px-6 py-6 space-y-2">
          <Label label="LOGO" type="title"/>
          <div className="space-y-4">
            <Label label="Email">
              <InputFields style="w-full" placeholder="Enter Your Email" />
            </Label>
            <Label label="Password">
              <InputFields style="w-full" placeholder="* * * * * * * *" />
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
              <Link href="#" legacyBehavior>
                <a
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forget Password ?
                </a>
              </Link>
            </div>
            <Button style="w-full" action="info" width="w-full">
              Sign In
            </Button>
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet?{" "}
              <Link href="register" legacyBehavior>
                <a
                  className="text-sm font-medium text-primary-600 hover:underline"
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
