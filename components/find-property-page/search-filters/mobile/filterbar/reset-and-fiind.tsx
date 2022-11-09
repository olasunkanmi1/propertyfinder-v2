import React from 'react'

const ResetAndFind = () => {
  return (
    <div className='flex justify-between p-2 absolute bottom-0 w-full shadow-[rgba(0,0,0,0.24)_0px_3px_8px] bg-white '>
        <button className='border border-primary rounded py-2 px-4 font-bold text-primary'>
            Reset
        </button>
        
        <button className='rounded bg-primary py-2 px-4 text-bold text-white w-[calc(100%-90px)]'>
            Find
        </button>
    </div>
  )
}

export default ResetAndFind