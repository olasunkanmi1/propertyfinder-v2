import React from 'react'
import { IPropertyType } from '.';
import PropertyTypeLayout from './layout';

const Commercial: React.FC<IPropertyType> = ({list}) => {
  return (
    <PropertyTypeLayout list={list} />
  )
}

export default Commercial