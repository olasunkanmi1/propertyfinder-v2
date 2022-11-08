import React from 'react'
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

const PropertyTypeLayout: React.FC<IPropertyType> = ({ list }) => {
  return (
    <div className='overflow-auto'>
        { list?.map((type) => {
            const { items, placeholder } = type;

            return (
                <div key={placeholder} className='flex items-center gap-4 pb-3'>
                  { items?.map((item) => {
                    const { name, value, icon } = item;

                    return (
                      <div key={name} className='flex flex-col items-center w-fit p-2'>
                        <div className="flex items-center justify-center rounded-full w-10 h-10 border text-gray-500">
                            {
                                icon?.slice(0, 2) === "Fa" ? React.createElement(Fa[icon as keyof IconType], {className: 'w-5 h-5'}) : 
                                icon?.slice(0, 2) === "Md" ? React.createElement(Md[icon as keyof IconType], {className: 'w-5 h-5'}) :         
                                icon?.slice(0, 2) === "Im" ? React.createElement(Im[icon as keyof IconType], {className: 'w-5 h-5'}) : 
                                icon?.slice(0, 2) === "Io" ? React.createElement(Io[icon as keyof IconType], {className: 'w-5 h-5'}) : 
                                icon?.slice(0, 2) === "Tb" ? React.createElement(Tb[icon as keyof IconType], {className: 'w-5 h-5'}) : 
                                icon?.slice(0, 2) === "Hi" ? React.createElement(Hi[icon as keyof IconType], {className: 'w-5 h-5'}) :
                                icon?.slice(0, 2) === "Gi" ? React.createElement(Gi[icon as keyof IconType], {className: 'w-5 h-5'}) :
                                icon?.slice(0, 2) === "Si" ? React.createElement(Si[icon as keyof IconType], {className: 'w-5 h-5'}) : null
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