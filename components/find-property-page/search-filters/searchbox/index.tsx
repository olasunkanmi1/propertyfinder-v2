import { useState, useRef, useEffect } from 'react'
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { MdLocationOn } from 'react-icons/md'
import Dropdown from './dropdown';
import { bayutFetchFn } from '@utils';
import { addressSuggestionsAtom, searchFiltersState, filterAtom } from '@states';
import { ISearchboxProps } from '@types';

const Searchbox: React.FC<ISearchboxProps> = ({desktop, suggestionsRef}) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useRecoilState(addressSuggestionsAtom);
  const filterState = useRecoilValue(filterAtom);
  const resetDropdown = useResetRecoilState(searchFiltersState);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    resetDropdown();
    setSuggestions([]) 

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if(value.length >= 3 && value !== '') {
      setLoading(true);
      
      debounceTimerRef.current = setTimeout(async () => {
        const data = await bayutFetchFn({url: 'auto-complete', autoComplete: true, e});
        
        if(data) {
          setLoading(false);
    
          setSuggestions(data.hits);
         
        }
      }, 1000);
    } else {
      setSuggestions(null) 
    }
  }

  useEffect(() => {
    inputRef.current!.value = filterState.address     
  }, [filterState.address])
  
  return (
    <div className={`space-y-2 ${desktop ? 'relative col-start-2 col-span-2' : ''}`}>
      <div className='flex justify-between'>
          <div className={`flex items-center justify-between w-full border rounded p-2 gap-2 ${desktop ? 'bg-white text-black' : ''}`}>
            <MdLocationOn size={20} />
            <input type='search' placeholder='Location' defaultValue={filterState.address} ref={inputRef} onChange={(e) => handleChange(e)} className={`outline-none w-[calc(100%-30px)] ${desktop ? 'font-semibold' : ''}`} />
          </div>
      </div>

      {inputRef.current && inputRef.current.value.trim() && inputRef.current.value.trim().length < 3 && (
        <div className={`searchDropdown ${desktop ? 'absolute top-[40px] z-10' : ''}`}> 
          <h1 className='p-5 text-center font-bold'>Please enter at least 3 characters to search... </h1>
        </div>
      )}
      { suggestions !== null  && <Dropdown loading={loading} suggestions={suggestions} setSuggestions={setSuggestions} desktop={desktop} suggestionsRef={suggestionsRef} /> }
    </div>
  )
}

export default Searchbox