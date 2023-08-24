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
        <Label label="Create & Edit History" type="title" />
        <div className="gap-2">
          <Label label="History">
            <RichEditor
              onChange={(content) => setForm({ ...form, history: content })}
            />
          </Label>
          <Label label="Vision">
            <RichEditor
              onChange={(content) => setForm({ ...form, visi: content })}
            />
          </Label>
          <Label label="Mission">
            <RichEditor
              onChange={(content) => setForm({ ...form, misi: content })}
            />
          </Label>
        </div>
      </div>
    </Layout>
  );
}
