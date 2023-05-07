import Button from '@/components/button'
import InputFields from '@/components/inputFields'
import Label from '@/components/label'
import Layout from '@/components/layout'
import React from 'react'

export default function EditRoom() {
  return (
    <Layout>
    <div className="space-y-2 p-5">
      <Label label="Add Room" type="title" style="border-b" />
      <div className="space-y-2">
        <Label label="Room Code">
          <InputFields
            type="text"
            style="w-full"
            placeholder="Room Code"
            title='Room Code'
          ></InputFields>
        </Label>
        <Label label="Room Name">
          <InputFields
            type="text"
            style="w-full"
            placeholder="Room Name"
            title='Room Name'
          ></InputFields>
        </Label>
        <Label label="Gedung">
          <InputFields
            type="text"
            style="w-full"
            placeholder="Gedung Name"
            title='Gedung Name'
          ></InputFields>
        </Label>
        <Label label="Number of Floor">
          <InputFields
            type="number"
            min="0"
            placeholder="0"
            style="w-full"
            title='Floor Level'
          ></InputFields>
        </Label>
        <Label label="Maximum People">
          <InputFields
            type="number"
            min="0"
            placeholder="0"
            style="w-full"
            title='Tall'
          ></InputFields>
        </Label>
      </div>
      <div className="flex flex-row justify-end gap-4">
        <Button
          action="light"
          link="/master/room"
          // handleClick={resetForm}
        >
          Cancel
        </Button>
        <Button action="primary" 
        // handleClick={handleSubmitAdd}
        >
          Edit
        </Button>
      </div>
    </div>
  </Layout>
  )
}
