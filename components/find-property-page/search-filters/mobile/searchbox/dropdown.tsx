import React from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { SetterOrUpdater } from 'recoil';
import { findProperties } from '..';
import { addressSuggestionsAtomState } from '../../../../../states/addressSuggestions';
import { Loader } from '../../../../loader';

interface IDropdownProps {
    loading: boolean;
    suggestions: addressSuggestionsAtomState;
    setSuggestions: SetterOrUpdater<addressSuggestionsAtomState>;
    inputRef: React.RefObject<HTMLInputElement>;
}

const Dropdown = ({loading, suggestions, setSuggestions, inputRef}: IDropdownProps) => {
    const handleSelect = async (externalID: string, name: string) => {
        setSuggestions({
            address: name,
            predictions: null
        })
        
        inputRef.current ? inputRef.current.value = name : null
        
        findProperties({ locationExternalIDs: externalID })
    }

  return (
    <div className={'w-full border shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded-lg'}>
        { 
            loading ? (
                <div className='p-5 text-center'>
                    <Loader />
                </div>
            ) : (
                <>
                    { suggestions?.predictions?.length === 0 ? ( 
                        <h1 className='p-5 text-center font-bold'>No Result Found</h1>
                    ) : (
                        <>
                            {suggestions?.predictions?.map((suggestion) => {
                                const { externalID, name } = suggestion;
                                return(
                                    <div className="flex items-center gap-3 p-2 cursor-pointer select-none hover:text-white hover:bg-primary" key={externalID} onClick={() => handleSelect(externalID, name)}> 
                                        <HiOutlineLocationMarker size={20} />
                                        <p> { name } </p>
                                    </div>
                                )
                            })}
                        </>
                    )}
                </>
            ) 
        }
    </div>
  )
}

export default Dropdown