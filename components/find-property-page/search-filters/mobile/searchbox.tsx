import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdLocationOn, MdOutlineTune } from 'react-icons/md'

const Searchbox = () => {
  return (
    <div className='flex justify-between '>
        <div className="flex items-center justify-between border rounded p-2 gap-2 w-[calc(100%-43px)] ms:w-[calc(100%-105px)]">
          <MdLocationOn size={20} />
          <input type='text' placeholder='Location' className='outline-none w-[calc(100%-30px)]' />
        </div>

        <button className='flex items-center justify-center p-2 bg-primary ms:w-[98px] text-white text-sm rounded'> 
          <span className='hidden ms:flex'>SEARCH</span>
          <span className='flex ms:hidden'><AiOutlineSearch size={20} /></span>
        </button>
    </div>
  )
}

export default Searchbox