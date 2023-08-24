import React from 'react'
import Selects from '@/components/selects';
import Button from '@/components/button';

const HeadAuthorization = () => {
  return (
    <div className='flex justify-between py-5 px-10'>
        <div className="flex gap-4">
          <Selects
            list={[
              { label: "Master Administrator", value: 1 },
              { label: "Administrator", value: 2 },
            ]}
            placeholder={"Master Administrator"}
            size={"w-56"}
          />
          <Button>Update</Button>
        </div>
        <div className='flex font-semibold text-xl justify-center items-center gap-4'>
            <input type='checkbox' />
            <p> Tandai Semua</p>
        </div>
      </div>
  )
}

export default HeadAuthorization