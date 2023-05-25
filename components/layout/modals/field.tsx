import {useState} from 'react'
import { Field, ErrorMessage } from 'formik';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiShow } from 'react-icons/bi';
import { TextError } from './error';
import { IFormFieldProps } from '@types';

const FormField: React.FC<IFormFieldProps> = ({title, icon, name, placeholder, password, error, value}) => {
    const [pwVisibility, setPwVisibility] = useState(false)

  return (
    <div  className='flex flex-col'>
        <h5 className='text-sm mb-1'> {title} </h5>

        <div className="">
            <div className={`flex justify-between items-center w-full py-1 px-3 space-x-1 border-2 ${error ? 'border-[#E65050] rounded-t-lg border-b-0' : 'border-b rounded-full'}`}>
                <div className='flex space-x-2 w-full'>
                    {icon}
                    <Field name={name} placeholder={placeholder} autoComplete='off' type={password && !pwVisibility ? 'password' : 'text'}
                        className='flex justify-start items-start outline-none border-none w-full bg-none' inputMode={name === 'email' ? "email" : "text"}
                    />
                </div>
                
                { password && value && value.length > 0 && (
                    pwVisibility ? (
                        <AiOutlineEyeInvisible size={25} color={error ? '#E65050' : '#000'} onClick={() => setPwVisibility(!pwVisibility)} className='cursor-pointer' />
                    ) : (
                        <BiShow size={25} color={error ? '#E65050' : '#000'} onClick={() => setPwVisibility(!pwVisibility)} className='cursor-pointer' /> 
                    )
                )}
            </div>
            
            <ErrorMessage name={name} component={TextError} />
        </div>
    </div>
  )
}

export default FormField