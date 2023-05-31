import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';
import { filterAtom, loadingState } from '@states';
import { Loader } from '@components';
import { findProperties, selections } from '@utils';
import { IDropdownProps, addressSuggestionsAtomState } from '@types';

const Dropdown = ({loading, suggestions, setSuggestions, desktop, suggestionsRef}: IDropdownProps) => {
  const setLoading = useSetRecoilState(loadingState);
  const setFilter = useSetRecoilState(filterAtom);
  const emiratesIDs = selections.emirates.items?.map(item => item.value)


    const handleSelect = async (externalID: string, name: string, hierarchy: addressSuggestionsAtomState['hierarchy']) => {
        setSuggestions(null)

        setLoading(loading => ({
            ...loading,
            propertiesLoading: true
        }))
        
        setFilter(filter => ({
            ...filter,
            locationExternalIDs: emiratesIDs?.includes(externalID) ? externalID : hierarchy[1] && emiratesIDs?.includes(hierarchy[1].externalID) ? hierarchy[1].externalID : 'any',
            emirates: emiratesIDs?.includes(externalID) ? name : hierarchy[1] && emiratesIDs?.includes(hierarchy[1].externalID) ? hierarchy[1].name : 'any',
            address: name
        }))
        
        findProperties({ locationExternalIDs: externalID }, setLoading)
    }

  return (
    <div className={`searchDropdown ${desktop ? 'absolute top-[40px] z-10' : ''}`} ref={suggestionsRef}>
        { loading ? ( 
            <div className='p-5 text-center'>
                <Loader />
            </div>
        ) : (
            <>
                { suggestions?.length === 0 ? ( 
                    <h1 className='p-5 text-center font-bold'>No Result Found</h1>
                ) : (
                    <>
                        {suggestions?.map((suggestion) => {
                            const { externalID, name, hierarchy } = suggestion;
                            return(
                                <div className="flex items-center gap-3 p-2 cursor-pointer select-none hover:text-white hover:bg-primary" key={externalID} onClick={() => handleSelect(externalID, name, hierarchy)}> 
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