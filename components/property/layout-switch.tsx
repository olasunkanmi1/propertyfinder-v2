import { useRecoilState } from 'recoil'
import { FiGrid } from 'react-icons/fi'
import { FaList } from 'react-icons/fa'
import { propertiesState } from '@states'

const LayoutSwitch = () => {
    const [pty, setPty] = useRecoilState(propertiesState);
    const {isList} = pty;
    const typeArr = [
        {value: true, icon: <FaList size={20} />},
        {value: false, icon: <FiGrid size={20} />},
    ]

    const handleSwitch = (value: boolean) => {
        setPty(pty => ({
            ...pty,
            isList: value
        }))
    }

  return (
    <div className='flex w-fit border border-secondary rounded-md p-1 cursor-pointer'>
        {typeArr.map(({value, icon}, i) => (
            <span key={i} className={`flex justify-center items-center p-1 ms:p-2 rounded ${isList === value ? 'bg-secondary text-white' : ''}`}
               onClick={() => handleSwitch(value)}            
            > 
               {icon} 
            </span>
        ))}
    </div>
  )
}

export default LayoutSwitch