import Label from "@/components/label";
import Layout from "@/components/layout";
import RichEditor from "@/components/richEditor";
import React, { useState } from "react";

export default function History() {
  const [form, setForm] = useState("<p></p>");

  const handleFormChange = (content) => {
    setForm(content); // Update nilai form dengan konten terbaru dari editor
  };

  console.log(form);

  return (
    <Layout>
      <div className="space-y-5 p-2">
        <Label label="Create & Edit History" type="title" />
        <div className="gap-2">
          
        </div>
      </div>
    </Layout>
  );
}
