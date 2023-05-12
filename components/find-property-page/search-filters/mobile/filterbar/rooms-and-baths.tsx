import { minMaxLayoutArray } from '@utils';
import SelectLayout from './select-layout';

const RoomsAndBaths = () => {
  const rooms = minMaxLayoutArray.find(minMax => minMax.selected === 'rooms')!
  const baths = minMaxLayoutArray.find(minMax => minMax.selected === 'baths')!

  const {min: roomsMin, max: roomsMax} = rooms
  const {min: bathsMin, max: bathsMax} = baths
  
  return (
    <div className='space-y-4'>
      <SelectLayout heading='Rooms' min={roomsMin} max={roomsMax} />
      <SelectLayout heading='Baths' min={bathsMin} max={bathsMax} />
    </div>
  )
}

export default RoomsAndBaths