import Button from "@/components/button";
import InputFields from "@/components/inputFields";
import Label from "@/components/label";
import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <div className="bg-primary-base">
      <div className="flex items-center justify-center h-screen m-auto">
        <div className="w-full bg-white rounded-lg shadow max-w-md px-6 py-6 space-y-2">
          <Label label="Create and account" type="title" />
          <div className="space-y-4">
          <Label label="Name">
              <InputFields type="text" style="w-full" placeholder="Enter Your Name" />
            </Label>
            <Label label="Email">
              <InputFields type="email" style="w-full" placeholder="Enter Your Email"/>
            </Label>
            <Label label="Password">
              <InputFields type="password" style="w-full" placeholder="* * * * * * * *" icon='eye'/>
            </Label>
            <Label label="Confirm Password">
              <InputFields type="password" style="w-full" placeholder="* * * * * * * *" icon='eye'/>
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
                    <Link href="#" legacyBehavior>
                      <a className="text-sm font-medium text-black hover:underline">
                        Terms and Conditions
                      </a>
                    </Link>
                  </label>
                </div>
              </div>
            </div>
            <Button style="w-full" width="w-full">
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
