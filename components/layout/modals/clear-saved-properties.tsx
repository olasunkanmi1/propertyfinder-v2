import React, {useState} from 'react'
import { useResetRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { navbarState, propertiesState } from '../../../states';
import ModalLayout from './modal-layout';
import axios from 'axios';
import { toast } from "react-toastify";
import { fetchSavedProperties } from '../../../utils/fetchFns';
import { Loader, Spinner } from '../../loader';

const ClearSavedPropertiesModal = () => {
    const [loading, setLoading] = useState(false);
    const modal = useRecoilValue(navbarState);
    const closeModal = useResetRecoilState(navbarState);
    const setProperties = useSetRecoilState(propertiesState);

  const clearAllProperties = () => {
    setLoading(true);

    axios.delete("/property", { withCredentials: true })
    .then(async (res) => {
      setLoading(false);

      if (res.status === 200) {
          const savedProperties = await fetchSavedProperties();

          setProperties(properties => ({
              ...properties,
              savedProperties: savedProperties
          }))
          toast.success('All saved properties cleared');
          closeModal()
      }
    })
    .catch((error) => {
      setLoading(false);
      toast.error('Unable to clear properties, please try again');
    })
  }

  return (
    <>
        { modal.clearConfirmationModal && (
            <ModalLayout heading='Are you sure you want to clear all saved properties?'> 
                <p> This will delete all saved properties permanently. You cannot undo this action </p>
                <div className='flex space-x-3 justify-end'>
                    <button type='button' className='flex justify-center items-center py-1 px-2' onClick={closeModal}> Cancel </button>
                    <button type='button' disabled={loading} className='flex justify-center items-center py-1 px-2 bg-[#E65050] text-white rounded-md' onClick={clearAllProperties}> 
                      { loading ? <Spinner /> : 'Delete' }
                    </button>
                </div>
            </ModalLayout>
        ) }
    </>
  )
}

export default ClearSavedPropertiesModal