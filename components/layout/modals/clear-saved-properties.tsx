import {useState} from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { layoutState, propertiesState } from '../../../states';
import ModalLayout from './modal-layout';
import { Spinner } from '../../loader';
import { setToast } from '../../../utils/setToast';
import axiosInstance from '../../../utils/axiosInstance';

const ClearSavedPropertiesModal = () => {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useRecoilState(layoutState);
    const setProperties = useSetRecoilState(propertiesState);

  const clearAllProperties = () => {
    setLoading(true);
    axiosInstance.delete("/property")
    .then(async (res) => {
      setLoading(false);

      if (res.status === 200) {
        setProperties(properties => ({
          ...properties,
          savedProperties: []
        }))
        
        setToast('success', 'All saved properties cleared', setModal)
        setModal(modal => ({
          ...modal,
          clearConfirmationModal: false
        }))
      }
    })
    .catch((error) => {
      setToast('error', 'Unable to clear properties, please try again', setModal)
      setLoading(false);
    })
  }

  const closeModal = () => setModal(modal => ({...modal, clearConfirmationModal: false}))

  return (
    <>
        { modal.clearConfirmationModal && (
            <ModalLayout heading='Are you sure you want to clear all saved properties?'> 
                <p> This will delete all saved properties permanently. You cannot undo this action </p>
                <div className='flex space-x-3 justify-end'>
                    <button type='button' className='flex justify-center items-center py-1 px-2' onClick={closeModal}> Cancel </button>
                    <button type='button' disabled={loading} className='flex justify-center items-center py-1 px-2 bg-[#E65050] text-white rounded-md w-[65px]' onClick={clearAllProperties}> 
                      { loading ? <Spinner /> : 'Delete' }
                    </button>
                </div>
            </ModalLayout>
        ) }
    </>
  )
}

export default ClearSavedPropertiesModal