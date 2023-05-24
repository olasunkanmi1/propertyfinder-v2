import {useRef} from 'react'
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai"
import FormField from "../field"
import { EditProfileInitialValues, EditFieldProps } from "@types"
import { EditProfileFieldArr, useListenForChange } from "@utils"


const Field: React.FC<EditFieldProps> = ({touched, errors, setModal, submitError}) => {
    const fieldWrapperRef = useRef<HTMLDivElement | null>(null);

    //cheeck for change in email input so as to remove error message
    useListenForChange({fieldWrapperRef, setModal, onlyEmail: true, submitError})
    
    return (
        <div className='formSpacing' ref={fieldWrapperRef}>
            { EditProfileFieldArr.map(({title, name, placeholder,}) => {
                const nameAsType = name as keyof EditProfileInitialValues
                
                return (
                    <FormField key={name} title={title} name={name} placeholder={placeholder}
                        icon={ 
                            name === 'email' ? <AiOutlineMail size={25} color={touched.email && errors.email ? '#E65050' : '#000'} /> :
                            <AiOutlineUser size={25} color={touched[nameAsType] && errors[nameAsType] ? '#E65050' : '#000'} /> 
                        } 
                        error={touched[nameAsType] && errors[nameAsType] !== undefined}
                    />
                )
            }) }
        </div>
    )
}

export default Field