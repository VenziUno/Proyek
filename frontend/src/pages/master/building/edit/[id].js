import Button from '@/components/button'
import InputFields from '@/components/inputFields'
import Label from '@/components/label'
import Layout from '@/components/layout'
import React from 'react'

export default function EditBuilding() {
  return (
    <Layout>
    <div className="space-y-2 p-5">
      <Label label="Add Building" type="title" />
      <div className='space-y-2'>
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
          action="light"
          link="/master/building"
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
