import React from 'react'
import { filterData } from '../../../../../utils/filterData';
import SelectLayout from './select-layout';

const RoomsAndBaths = () => {
  const rooms = filterData.filter((filter) => filter.placeholder === 'Rooms');
  const baths = filterData.filter((filter) => filter.placeholder === 'Baths');

  const roomsMin = {
    list: rooms[0].categories?.filter((filter) => filter.placeholder === 'Rooms Min'),
    oppositeQueryName: 'roomsMax'
  };
  
  const roomsMax = {
    list: rooms[0].categories?.filter((filter) => filter.placeholder === 'Rooms Max'),
    oppositeQueryName: 'roomsMin'
  };
  
  const bathsMin = {
    list: baths[0].categories?.filter((filter) => filter.placeholder === 'Baths Min'),
    oppositeQueryName: 'bathsMax'
  };
  
  const bathsMax = {
    list: baths[0].categories?.filter((filter) => filter.placeholder === 'Baths Max'),
    oppositeQueryName: 'bathsMin'
  };
  
  return (
    <div className='space-y-4'>
      <SelectLayout heading='Rooms' min={roomsMin} max={roomsMax} />
      <SelectLayout heading='Baths' min={bathsMin} max={bathsMax} />
    </div>
  )
}

export default RoomsAndBaths