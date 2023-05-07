import { IPropertyType } from '../../../../../../types';
import PropertyTypeLayout from './layout';

const Residential: React.FC<IPropertyType> = ({list}) => {
  return (
    <PropertyTypeLayout list={list} />
  )
}

export default Residential