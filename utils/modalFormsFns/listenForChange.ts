import { useEffect } from 'react';
import {IListenForChangeProps} from '@types'

const listenForChange = ({fieldWrapperRef, setModal, onlyEmail, submitError, currentPassword}: IListenForChangeProps) => {
    const handleRemoveError = (input: HTMLInputElement | NodeListOf<HTMLInputElement>) => {
        const removeError = () => {
            setModal(modal => ({
                ...modal, 
                submitError: null
            }))
        }

        if(submitError) {
            if (input instanceof HTMLInputElement) {
                input.addEventListener('keydown', removeError);
            } else if (input instanceof NodeList) {
                input.forEach((element: HTMLInputElement) => {
                element.addEventListener('keydown', removeError);
                });
            }
        }
    
        
        return () => {
            if(submitError) {
                if (input instanceof HTMLInputElement) {
                    input.removeEventListener('keydown', removeError);
                } else if (input instanceof NodeList) {
                    input.forEach((element: HTMLInputElement) => {
                        element.removeEventListener('keydown', removeError);
                    });
                }
            }
        }
    }

    if(onlyEmail) {
        const emailInput = fieldWrapperRef?.current?.querySelector('input[name="email"]') as HTMLInputElement;
        handleRemoveError(emailInput)
    } else if (currentPassword) {
        const passwordInput = fieldWrapperRef?.current?.querySelector('input[name="oldPassword"]') as HTMLInputElement;
        handleRemoveError(passwordInput)
    } else {
        const inputs = fieldWrapperRef?.current?.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
        handleRemoveError(inputs)
    }
}

export const useListenForChange = ({fieldWrapperRef, setModal, onlyEmail, submitError, currentPassword}: IListenForChangeProps) => {
  useEffect(() => {
    listenForChange({fieldWrapperRef, setModal, onlyEmail, submitError, currentPassword})
  }, [setModal, submitError, fieldWrapperRef, onlyEmail, currentPassword]);
};