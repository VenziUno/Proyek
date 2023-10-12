import Label from "@/components/label";
import Layout from "@/components/layout";
import RichEditor from "@/components/richEditor";
import React, { useState } from "react";

export default function MissionAndVision() {
  const [form, setForm] = useState({
    history: "",
    visi: "",
    misi: "",
  });

  console.log(form)

  return (
    <Layout>
      <div className="space-y-5 p-2">
        <Label label="Reversion" type="title" />
        <div className="gap-2">
        </div>
      </div>
    </Layout>
  );
}
