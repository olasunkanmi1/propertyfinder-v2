import { useRecoilState } from 'recoil';
import { AiOutlineUp } from 'react-icons/ai';
import { searchFiltersState } from '@states';
import { IDropdownLayoutProps } from '@types';
import { handleDropdown } from '@utils';

const DropdownLayout: React.FC<IDropdownLayoutProps> = ({selected, children, Dropdown, minMax}) => {
  const [dropdown, setDropdown] = useRecoilState(searchFiltersState);

  return (  
    <div className='relative'>
      <div className={`flex items-center justify-between bg-white rounded-md text-gray-600 text-md font-semibold cursor-pointer ${minMax ? 'py-1 px-2' : 'py-2 px-4'}`}
          onClick={() => handleDropdown(selected, dropdown, setDropdown)}
      >
          {children}
          <AiOutlineUp className={`transition-all duration-300 ${dropdown.main === selected ? '' : '-rotate-180'}`} />
      </div>

      { dropdown.main === selected && (
        <>
            <div className={`tooltip ${minMax ? 'right-2' : ''}`} />
            <Dropdown />
        </>
      ) }
    </div>         
  )
}

export default DropdownLayout