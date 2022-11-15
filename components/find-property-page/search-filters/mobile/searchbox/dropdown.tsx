import React from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { SetterOrUpdater } from 'recoil';
import { findProperties } from '..';
import { addressSuggestionsAtomState } from '../../../../../states/addressSuggestions';

interface IDropdownProps {
    loading: boolean;
    suggestions: addressSuggestionsAtomState;
    setSuggestions: SetterOrUpdater<addressSuggestionsAtomState>;
}

const Dropdown = ({loading, suggestions, setSuggestions}: IDropdownProps) => {
    const handleSelect = (externalID: string, name: string) => {
        setSuggestions({
            address: name,
            predictions: []
        })
        
        findProperties({ locationExternalIDs: externalID })
    }

  return (
    <div className={`${suggestions?.predictions?.length == 0 ? 'hidden' : 'absolute -bottom-[80px] w-full border bg-primary text-white'}`}>
        { suggestions?.predictions?.length !== 0 && (
          <div className="location_form_searchBox_suggestions">
            { 
              loading ? (
                <div style={{ padding: '20px' }}>
                  {/* <Loader dark /> */}
                  loading......
                </div>
              ) : (
                <>
                  { suggestions?.predictions?.map((suggestion) => {
                    const { externalID, name } = suggestion;
                    return(
                      <div className="searchBox_suggestion" key={externalID} onClick={() => handleSelect(externalID, name)}> 
                        <HiOutlineLocationMarker size={20} />
                        <p> { name } </p>
                      </div>
                    )
                  })}
                </>
              ) 
            }
          </div>
        )
      }
    </div>
  )
}

export default Dropdown