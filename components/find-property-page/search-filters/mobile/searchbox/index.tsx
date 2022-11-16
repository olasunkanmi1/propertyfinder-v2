import React, { useState, useRef } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdLocationOn, MdOutlineTune } from 'react-icons/md'
import { useRecoilState } from 'recoil';
import { addressSuggestionsAtom } from '../../../../../states/addressSuggestions';
import Dropdown from './dropdown';
import { fetchApi } from '../../../../../utils/fetchApi';

const Searchbox = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useRecoilState(addressSuggestionsAtom);

  const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length >= 3) {
      setLoading(true);

      const featuredAgencies = false
      const autoComplete = true

      const data = await fetchApi('https://bayut.p.rapidapi.com/auto-complete', featuredAgencies, autoComplete, e);
      
      if(data) {
        setLoading(false);
  
        setSuggestions(suggestions => ({
          ...suggestions,
          predictions: data.hits
        }));
       
      }
    } else {
      setSuggestions(suggestions => ({
        ...suggestions,
        predictions: null
      })) 
    }
  }

  return (
    <div className='space-y-2'>
      <div className='flex justify-between'>
          <div className="flex items-center justify-between border rounded p-2 gap-2 w-[calc(100%-43px)] ms:w-[calc(100%-105px)]">
            <MdLocationOn size={20} />
            <input type='text' placeholder='Location' ref={inputRef} onChange={(e) => handleChange(e)} className='outline-none w-[calc(100%-30px)]' />
          </div>

          <button className='flex items-center justify-center p-2 bg-primary ms:w-[98px] text-white text-sm rounded'> 
            <span className='hidden ms:flex'>SEARCH</span>
            <span className='flex ms:hidden'><AiOutlineSearch size={20} /></span>
          </button>
      </div>

      { suggestions?.predictions !== null && inputRef.current?.value.length! >= 3  && <Dropdown loading={loading} suggestions={suggestions} setSuggestions={setSuggestions} inputRef={inputRef} /> }
    </div>
  )
}

export default Searchbox