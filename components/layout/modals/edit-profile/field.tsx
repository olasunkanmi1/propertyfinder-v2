import { AiOutlineMail, AiOutlineUser } from "react-icons/ai"
import FormField from "../field"
import { EditProfileInitialValues, EditFieldProps } from "@types"
import { EditProfileFieldArr } from "@utils"


const Field: React.FC<EditFieldProps> = ({touched, errors}) => {
    return (
    <div>
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