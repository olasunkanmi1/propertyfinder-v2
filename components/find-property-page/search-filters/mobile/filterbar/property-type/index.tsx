import { useRecoilState } from 'recoil';
import { filterAtom } from '../../../../../../states';
import { filterOptions } from '../../../../../../utils/filteringOptions';
import Commercial from './commercial';
import Residential from './residential';

const PropertyType = () => {
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  const propertyType = filterOptions.filter((filter) => filter.placeholder === 'Property Type')
  const residentialList = propertyType[0].categories?.filter((filter) => filter.placeholder === 'Residential')
  const commercialList = propertyType[0].categories?.filter((filter) => filter.placeholder === 'Commercial')

  const residentialPropertyList = ['1', '4', '16', '3', '18', '21', '19', '14', '12', '17'];
  const commercialPropertyList = ['2', '5', '6', '7', '9', '25', '20', '15', '13', '10', '8', '22', '23', '24', '11'];

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
        <div onClick={() => changeTab('1')} className={`tabSort ${residentialPropertyList.includes(filterState.categoryExternalID ? filterState.categoryExternalID.toString() : '') ? 'tabSortActive' : ''}`}>
            Residential
        </div>
        
        <div onClick={() => changeTab('2')} className={`tabSort ${commercialPropertyList.includes(filterState.categoryExternalID ? filterState.categoryExternalID.toString() : '') ? 'tabSortActive' : ''}`}>
            Commercial
        </div>
      </div>

      { residentialPropertyList.includes(filterState.categoryExternalID ? filterState.categoryExternalID.toString() : '') && <Residential list={residentialList} /> }
      { commercialPropertyList.includes(filterState.categoryExternalID ? filterState.categoryExternalID.toString() : '') && <Commercial list={commercialList} /> }
    </div>
  )
}

export default PropertyType