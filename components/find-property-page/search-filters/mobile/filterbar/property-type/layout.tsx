import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import * as Md from 'react-icons/md';
import * as Fa from 'react-icons/fa';
import * as Im from 'react-icons/im';
import * as Io from 'react-icons/io5';
import * as Tb from 'react-icons/tb';
import * as Hi from 'react-icons/hi';
import * as Gi from 'react-icons/gi';
import * as Si from 'react-icons/si';
import { IconType } from 'react-icons/lib';
import { filterAtom, loadingState } from '@states';
import { findProperties } from '@utils';
import { IPropertyType } from '@types';

const PropertyTypeLayout: React.FC<IPropertyType> = ({ options }) => {
  const setLoading = useSetRecoilState(loadingState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const {items, placeholder, queryName} = options

  const setPropertyType = (value: string, name: string) => {
    setFilterState(filterState => ({
      ...filterState,
      categoryExternalID: value,
      propertyType: name
    }))
    
    setLoading(loading => ({
      ...loading,
      propertiesLoading: true
    }))

     findProperties({ [queryName]: value }, setLoading)
  }

  return (
    <div className='overflow-auto'>
      <div key={placeholder} className='flex items-center gap-4 pb-3'>
        { items.map(({name, value, icon}) => (
          <div onClick={() => setPropertyType(value, name)} key={name} className={`flex flex-col items-center w-fit p-2 ${filterState.categoryExternalID === value ? 'text-primary font-bold' : ''}`}>
            <div className={`flex items-center justify-center rounded-full w-10 h-10 border text-gray-500 ${filterState.categoryExternalID === value ? 'bg-primary bg-opacity-20 border border-primary text-primary' : ''}`}>
                {
                    icon?.slice(0, 2) === "Fa" ? React.createElement(Fa[icon as keyof IconType], {className: `propertyTypeIcon ${filterState.categoryExternalID === value ? 'text-primary' : ''}`}) : 
                    icon?.slice(0, 2) === "Md" ? React.createElement(Md[icon as keyof IconType], {className: `propertyTypeIcon ${filterState.categoryExternalID === value ? 'text-primary' : ''}`}) :         
                    icon?.slice(0, 2) === "Im" ? React.createElement(Im[icon as keyof IconType], {className: `propertyTypeIcon ${filterState.categoryExternalID === value ? 'text-primary' : ''}`}) : 
                    icon?.slice(0, 2) === "Io" ? React.createElement(Io[icon as keyof IconType], {className: `propertyTypeIcon ${filterState.categoryExternalID === value ? 'text-primary' : ''}`}) : 
                    icon?.slice(0, 2) === "Tb" ? React.createElement(Tb[icon as keyof IconType], {className: `propertyTypeIcon ${filterState.categoryExternalID === value ? 'text-primary' : ''}`}) : 
                    icon?.slice(0, 2) === "Hi" ? React.createElement(Hi[icon as keyof IconType], {className: `propertyTypeIcon ${filterState.categoryExternalID === value ? 'text-primary' : ''}`}) :
                    icon?.slice(0, 2) === "Gi" ? React.createElement(Gi[icon as keyof IconType], {className: `propertyTypeIcon ${filterState.categoryExternalID === value ? 'text-primary' : ''}`}) :
                    icon?.slice(0, 2) === "Si" ? React.createElement(Si[icon as keyof IconType], {className: `propertyTypeIcon ${filterState.categoryExternalID === value ? 'text-primary' : ''}`}) : null
                }
            </div>
            <span className='text-center text-sm w-max'> {name} </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertyTypeLayout