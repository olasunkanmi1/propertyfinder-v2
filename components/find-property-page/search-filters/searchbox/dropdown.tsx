import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';
import { filterAtom, loadingState } from '@states';
import { Loader } from '@components';
import { findProperties, selections } from '@utils';
import { IDropdownProps } from '@types';

const Dropdown = ({loading, suggestions, setSuggestions, inputRef, desktop, suggestionsRef}: IDropdownProps) => {
  const setLoading = useSetRecoilState(loadingState);
  const setFilter = useSetRecoilState(filterAtom);
  const emiratesIDs = selections.emirates.items?.map(item => item.value)


    const handleSelect = async (externalID: string, name: string) => {
        setSuggestions({
            address: name,
            predictions: null
        })

        setLoading(loading => ({
            ...loading,
            propertiesLoading: true
        }))
        
        setFilter(filter => ({
            ...filter,
            locationExternalIDs: externalID,
            emirates: emiratesIDs?.includes(externalID) ? name : 'Emirates',
            address: name
        }))
        
        inputRef.current ? inputRef.current.value = name : inputRef.current!.value = ''
        
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