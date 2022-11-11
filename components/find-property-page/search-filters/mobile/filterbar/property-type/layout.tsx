import React, { useState, useEffect } from 'react'
import * as Md from 'react-icons/md';
import * as Fa from 'react-icons/fa';
import * as Im from 'react-icons/im';
import * as Io from 'react-icons/io5';
import * as Tb from 'react-icons/tb';
import * as Hi from 'react-icons/hi';
import * as Gi from 'react-icons/gi';
import * as Si from 'react-icons/si';
import { IconType } from 'react-icons/lib';
import { IPropertyType } from '.';
import { useRecoilState } from 'recoil'
import { filterAtom } from '../../../../../../states';

const PropertyTypeLayout: React.FC<IPropertyType> = ({ list }) => {
  const [active, setActive] = useState<string | undefined>('');
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const { categoryExternalID } = filterState;

  const changeTab = (value: string) => {
    setFilterState(filterState => ({
        ...filterState,
        categoryExternalID: value,
      }))
  }

  useEffect(() => {
    setActive(categoryExternalID)
  }, [categoryExternalID])

  return (
    <div className='overflow-auto'>
        { list?.map((type) => {
            const { items, placeholder } = type;

            return (
                <div key={placeholder} className='flex items-center gap-4 pb-3'>
                  { items?.map((item) => {
                    const { name, value, icon } = item;

                    return (
                      <div onClick={() => changeTab(value)} key={name} className={`flex flex-col items-center w-fit p-2 ${active === value ? 'text-primary font-bold' : ''}`}>
                        <div className={`flex items-center justify-center rounded-full w-10 h-10 border text-gray-500 ${active === value ? 'bg-primary bg-opacity-20 border border-primary text-primary' : ''}`}>
                            {
                                icon?.slice(0, 2) === "Fa" ? React.createElement(Fa[icon as keyof IconType], {className: `propertyTypeIcon ${active === value ? 'text-primary' : ''}`}) : 
                                icon?.slice(0, 2) === "Md" ? React.createElement(Md[icon as keyof IconType], {className: `propertyTypeIcon ${active === value ? 'text-primary' : ''}`}) :         
                                icon?.slice(0, 2) === "Im" ? React.createElement(Im[icon as keyof IconType], {className: `propertyTypeIcon ${active === value ? 'text-primary' : ''}`}) : 
                                icon?.slice(0, 2) === "Io" ? React.createElement(Io[icon as keyof IconType], {className: `propertyTypeIcon ${active === value ? 'text-primary' : ''}`}) : 
                                icon?.slice(0, 2) === "Tb" ? React.createElement(Tb[icon as keyof IconType], {className: `propertyTypeIcon ${active === value ? 'text-primary' : ''}`}) : 
                                icon?.slice(0, 2) === "Hi" ? React.createElement(Hi[icon as keyof IconType], {className: `propertyTypeIcon ${active === value ? 'text-primary' : ''}`}) :
                                icon?.slice(0, 2) === "Gi" ? React.createElement(Gi[icon as keyof IconType], {className: `propertyTypeIcon ${active === value ? 'text-primary' : ''}`}) :
                                icon?.slice(0, 2) === "Si" ? React.createElement(Si[icon as keyof IconType], {className: `propertyTypeIcon ${active === value ? 'text-primary' : ''}`}) : null
                            }
                        </div>
                        <span className='text-center text-sm w-max'> {name} </span>
                      </div>
                    )
                }) }
              </div>
            )
        }) }
    </div>
  )
}

export default PropertyTypeLayout