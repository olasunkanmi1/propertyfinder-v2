import { useRecoilState } from 'recoil';
import PropertyTypeLayout from './layout';
import { filterAtom } from '@states';
import { propertyTypeSelections, propertyTypeSelectionsIDs } from '@utils';

const PropertyType = () => {
  const [filterState, setFilterState] = useRecoilState(filterAtom);
  const {residentialProperty, commercialProperty} = propertyTypeSelections;
  const {residentialPropertyIDs, commercialPropertyIDs} = propertyTypeSelectionsIDs

  const changeTab = (value: string) => {
    setFilterState(filterState => ({
      ...filterState,
      categoryExternalID: value
    }))
  }

  return (
    <div className='space-y-2'>
      <h5 className='text-lg'> Property Type </h5>

      <div className="flex border p-1 rounded">
        <div onClick={() => changeTab('4')} className={`tabSort ${residentialPropertyIDs.includes(filterState.categoryExternalID.toString()) ? 'tabSortActive' : ''}`}>
            Residential
        </div>
        
        <div onClick={() => changeTab('4')} className={`tabSort ${commercialPropertyIDs.includes(filterState.categoryExternalID.toString()) ? 'tabSortActive' : ''}`}>
            Commercial
        </div>
      </div>

      { residentialPropertyIDs.includes(filterState.categoryExternalID.toString()) && <PropertyTypeLayout options={residentialProperty} /> }
      { commercialPropertyIDs.includes(filterState.categoryExternalID.toString()) && <PropertyTypeLayout options={commercialProperty} /> }
    </div>
  )
}

export default PropertyType