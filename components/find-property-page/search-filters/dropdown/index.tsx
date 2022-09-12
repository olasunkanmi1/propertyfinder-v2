import React from 'react'
import { IsearchFiltersState } from '../../../../states/searchFiltersAtom'
import Options from './options'
import Tabs from './tabs'

interface DropdownProps {
    dropdown: IsearchFiltersState; 
    option: string;
    filter: {
        items: {
            name: string;
            value: string;
        }[];
        placeholder: string;
        queryName: string;
        dropdown: string;
        categories?: undefined;
    } | {
        categories: {
            items: {
                name: string;
                value: string;
            }[];
            placeholder: string;
            queryName: string;
        }[];
        placeholder: string;
        dropdown: string;
        items?: undefined;
        queryName?: undefined;
    }
}

const Dropdown: React.FC<DropdownProps> = ({ dropdown, option, filter }) => {
  return (
    <div 
        className={`${dropdown[option] ? '' : 'hidden'} absolute -bottom-[70px] left-0 max-h-[150px] overflow-y-auto bg-white w-full z-20 border p-2 rounded-md`}
    >
        <div className="relative">
            { filter.items && <Options items={filter.items} /> }
            { filter.categories && <Tabs categories={filter.categories} /> }
        </div>
    </div>
  )
}

export default Dropdown