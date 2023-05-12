import { useRecoilState, useSetRecoilState } from 'recoil';
import { filterAtom, loadingState } from '@states';
import { findProperties, selections } from '@utils';

const RentFrequency  = () => {
  const setLoading = useSetRecoilState(loadingState);
  const [filterState, setFilterState] = useRecoilState(filterAtom);

  const rentFrequencies = selections.rentFrequency
  const { items, placeholder, queryName } = rentFrequencies;

  const changeFrequency = (value: string) => {
    setFilterState(filterState => ({
      ...filterState,
      rentFrequency: value
    }))
    setLoading(loading => ({
         ...loading,
         propertiesLoading: true
     }))

    findProperties({ [queryName]: value }, setLoading)
  }

  return (
    <div className='space-y-2'>
      <h5 className='text-lg'> Rental Frequency </h5>

      <div className='flex overflow-auto w-full gap-2 pb-4'>        
        <div key={placeholder} className='flex gap-2'>
            { items?.map(({name, value}) => (
                <div onClick={() => changeFrequency(value)} key={name} className={`frequencySort ${filterState.rentFrequency === value ? 'bg-primary bg-opacity-20 border border-primary text-primary' : ''}`}>
                    { name }
                </div>
            )) }
        </div>
      </div>
    </div>
  )
}

export default RentFrequency