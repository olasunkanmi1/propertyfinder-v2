import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdLocationOn, MdOutlineTune } from 'react-icons/md'
import { useRecoilState } from 'recoil';
import { addressSuggestionsAtom } from '../../../../../states/addressSuggestions';
import axios from 'axios';
import Dropdown from './dropdown';

const Searchbox = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useRecoilState(addressSuggestionsAtom);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    
    axios.get(`https://bayut.p.rapidapi.com/auto-complete`, {
      headers: {
        'x-rapidapi-host': 'bayut.p.rapidapi.com',
        // 'x-rapidapi-key': '193b1e78bdmsh49c343cac6947ffp1452b0jsn4cb4e7f4fa40'
        // 'x-rapidapi-key': '226d16c2f2msh9521bd335bda97dp171b4fjsn48ca6e1a0698'
        'x-rapidapi-key': 'a7765c2bfcmsh6826d1f7444990cp14bd32jsn40ebd9e9d37f' //olarapidapi1 - dawn.unaided00@icloud.com
      },
      params: {
        query: e.target.value, hitsPerPage: '5'
      }
    })
    .then((res) => {
      setLoading(false);
      if(e.target.value === '') { 
        setSuggestions(suggestions => ({
          ...suggestions,
          predictions: []
        })) 
      }

      setSuggestions(suggestions => ({
        ...suggestions,
        predictions: res.data.hits
      }));
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='flex relative'>
      <div className='flex justify-between'>
          <div className="flex items-center justify-between border rounded p-2 gap-2 w-[calc(100%-43px)] ms:w-[calc(100%-105px)]">
            <MdLocationOn size={20} />
            <input type='text' placeholder='Location' defaultValue={ suggestions.address } onChange={(e) => handleChange(e)} className='outline-none w-[calc(100%-30px)]' />
          </div>

          <button className='flex items-center justify-center p-2 bg-primary ms:w-[98px] text-white text-sm rounded'> 
            <span className='hidden ms:flex'>SEARCH</span>
            <span className='flex ms:hidden'><AiOutlineSearch size={20} /></span>
          </button>
      </div>

      <Dropdown loading={loading} suggestions={suggestions} setSuggestions={setSuggestions} />
    </div>
  )
}

export default Searchbox