import { useRouter } from 'next/router';
import {  useSetRecoilState, useResetRecoilState } from 'recoil'
import { addressSuggestionsAtom, filterAtom, navbarState } from '../../../../../states'

const ResetAndFind = () => {
  const router = useRouter();

  const resetFilter = useResetRecoilState(filterAtom);
  const resetSuggestions = useResetRecoilState(addressSuggestionsAtom);
  const closeFilter = useSetRecoilState(navbarState);

  const handleReset = () => {
    resetFilter();
    resetSuggestions();

    router.push({pathname: router.pathname, query: null})
  }

  const handleFind = () => {
    closeFilter(filter => ({
      ...filter, 
      isFilterbarOpen: false
    }));
  }

  return (
    <div className='flex justify-between p-2 absolute bottom-0 w-full shadow-[rgba(0,0,0,0.24)_0px_3px_8px] bg-white '>
        <button onClick={handleReset} className='border border-primary rounded py-2 px-4 font-bold text-primary'>
            Reset
        </button>
        
        <button onClick={handleFind} className='rounded bg-primary py-2 px-4 text-bold text-white w-[calc(100%-90px)]'>
            Find
        </button>
    </div>
  )
}

export default ResetAndFind