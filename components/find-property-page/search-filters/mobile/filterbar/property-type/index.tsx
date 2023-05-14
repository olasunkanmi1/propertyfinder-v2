import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import PropertyTypeLayout from './layout';
import { filterAtom, layoutState } from '@states';
import { selections, propertyTypeSelections, propertyTypeSelectionsIDs } from '@utils';

const PropertyType = () => {
  const filterState = useRecoilValue(filterAtom);
  const layout = useRecoilValue(layoutState);

  const {residentialProperty, commercialProperty} = propertyTypeSelections;
  const {residentialPropertyIDs} = propertyTypeSelectionsIDs
  const {propertyTypes} = selections;
  const {categoryExternalID} = filterState;
  const [tab, setTab] = useState(residentialPropertyIDs.includes(categoryExternalID.toString()) ? '1' : '2');

  const options = tab === '1' ? residentialProperty : commercialProperty 
  
  useEffect(() => {
    setTab(residentialPropertyIDs.includes(categoryExternalID.toString()) ? '1' : '2')
  }, [layout, categoryExternalID, residentialPropertyIDs])
  

  return (
    <div className='space-y-2'>
      <h5 className='text-lg'> Property Type </h5>

      <div className="flex border p-1 rounded">
        {propertyTypes.categories?.map(({items, placeholder}, i) => {
              const tabValue = (i + 1).toString();

              return (
                 <div key={placeholder} onClick={() => setTab(tabValue)} className={`tabSort ${tabValue === tab ? 'tabSortActive' : '' }`}>
                    {placeholder}
                 </div>
              )
        })}
      </div>

      <PropertyTypeLayout options={options} />
    </div>
  )
}

export default PropertyType