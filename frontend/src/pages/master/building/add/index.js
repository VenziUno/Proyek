import Button from "@/components/button";
import InputFields from "@/components/inputFields";
import Label from "@/components/label";
import Layout from "@/components/layout";
import React from "react";

export default function AddBuilding() {
  return (
    <Layout>
      <div className="space-y-4">
        <Label label="Add Building" type="title" />
        <div>
          <Label label="Building Code">
            <InputFields
              type="text"
              style="w-full"
              placeholder="Building Code"
              title='Building Code'
            ></InputFields>
          </Label>
          <Label label="Building Name">
            <InputFields
              type="text"
              style="w-full"
              placeholder="Building Name"
              title='Building Name'
            ></InputFields>
          </Label>
          <Label label="Floor Level">
            <InputFields
              type="number"
              min="0"
              placeholder="0"
              style="w-full"
              title='Floor Level'
            ></InputFields>
          </Label>
          <Label label="Tall">
            <InputFields
              type="number"
              min="0"
              placeholder="0"
              style="w-full"
              title='Tall'
            ></InputFields>
          </Label>
          <Label label="Long">
            <InputFields
              type="number"
              min="0"
              placeholder="0"
              style="w-full"
              title='Long'
            ></InputFields>
          </Label>
          <Label label="Wide">
            <InputFields
              type="number"
              min="0"
              placeholder="0"
              style="w-full"
              title='Wide'
            ></InputFields>
          </Label>
        </div>
        <div className="flex flex-row justify-end gap-5">
          <Button
            type="info"
            link="/data_master/gedung"
            // handleClick={resetForm}
          >
            Cancel
          </Button>
          <Button type="primary" 
          // handleClick={handleSubmitAdd}
          >
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
}
