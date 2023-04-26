import Button from "@/components/button";
import InputFields from "@/components/inputFields";
import Label from "@/components/label";
import Link from "next/link";
import React from "react";

export default function ForgetPassword() {
  return (
    <div className="bg-primary-base">
      <div className="flex items-center justify-center h-screen m-auto">
        <div className="w-full bg-white rounded-lg shadow max-w-md px-6 py-6 space-y-4">
          <div className="space-y-2">
            <Label label="Forgot your password?" type="title" />
            <p>
              Type in your email in the field below and we will send you a code
              to reset your password.
            </p>
          </div>
          <div className="space-y-4">
            <Label label="Email">
              <InputFields type="email" style="w-full" placeholder="Enter Your Email" />
            </Label>
            <div className="flex justify-between">
              <Button>
                Send Code
              </Button>
              <p className="text-sm font-light text-gray-500 pt-6">
                <Link href="login" legacyBehavior>
                  <a className="text-sm font-medium text-black hover:underline">
                    Back to Login
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
