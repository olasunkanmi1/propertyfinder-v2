import Router from 'next/router';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import Searchbox from '../searchbox';
import {MinMaxLayout, DirectLayout, ToggleLayout} from './layout';
import { ISearchFiltersProps } from '@types';
import { addressSuggestionsAtom, filterAtom, loadingState, searchFiltersState } from '@states';
import { toggleLayoutArray, minMaxLayoutArray, directLayoutArray } from '@utils';

const DesktopAndTabs: React.FC<ISearchFiltersProps> = ({filterRef, suggestionsRef}) => {
  const setDropdown = useSetRecoilState(searchFiltersState);
  const setLoading = useSetRecoilState(loadingState);
  const resetFilterState = useResetRecoilState(filterAtom);
  const resetSuggestions = useResetRecoilState(addressSuggestionsAtom);

  const resetFilters = () => {
    setLoading(loading => ({
        ...loading,
        propertiesLoading: true
    }))
    resetFilterState();
    resetSuggestions();
    setDropdown({
      main: null,
      minMax: null,
    })

    Router.push('/find-property')
    Router.events.off('routeChangeComplete', () =>
    setLoading(loading => ({
         ...loading,
         propertiesLoading: false
     }))
    )
  }

  return (
    <div className="wrapper">
      <div className="hidden md:flex flex-col justify-between items-center bg-dubai bg-contain w-full space-y-8 rounded-3xl text-white p-4">
          <h1 className="text-3xl font-bold w-fit text-center"> Search Properties for sale and to rent in the UAE </h1>

          <div className="grid grid-cols-4 gap-5 justify-center p-4 w-full lg:w-[900px] rounded-xl bg-[#000] bg-opacity-60 mx-auto" ref={filterRef}>
            <Searchbox desktop suggestionsRef={suggestionsRef} />

            { toggleLayoutArray.map(({selected, options}) => (
              <ToggleLayout key={selected} selected={selected} options={options} />
            )) }

            { minMaxLayoutArray.map(({selected, placeholder, min, max}) => (
                <MinMaxLayout key={selected} selected={selected} placeholder={placeholder} min={min} max={max} />
            )) }
            
            { directLayoutArray.map(({selected, options}) => (
              <DirectLayout key={selected} selected={selected} options={options} />
            )) }

            <button onClick={resetFilters} className='bg-secondary rounded-md font-semibold'> Reset all </button>
          </div>
      </div>
    </div>
  )
}

export default DesktopAndTabs