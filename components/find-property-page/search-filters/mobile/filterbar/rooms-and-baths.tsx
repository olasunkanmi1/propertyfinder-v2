import React from 'react'
import { filterData } from '../../../../../utils/filterData';
import SelectLayout from './select-layout';

const RoomsAndBaths = () => {
  const rooms = filterData.filter((filter) => filter.placeholder === 'Rooms');
  const baths = filterData.filter((filter) => filter.placeholder === 'Baths');
  
  const roomsMin = rooms[0].categories?.filter((filter) => filter.placeholder === 'Rooms Min');
  const roomsMax = rooms[0].categories?.filter((filter) => filter.placeholder === 'Rooms Max');
  const bathsMin = baths[0].categories?.filter((filter) => filter.placeholder === 'Baths Min');
  const bathsMax = baths[0].categories?.filter((filter) => filter.placeholder === 'Baths Max');

  return (
    <div className='space-y-4'>
      <SelectLayout heading='Rooms' min={roomsMin} max={roomsMax} />
      <SelectLayout heading='Baths' min={bathsMin} max={bathsMax} />
    </div>
  )
}

export default RoomsAndBaths