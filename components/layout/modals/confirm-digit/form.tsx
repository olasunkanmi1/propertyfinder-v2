import {ChangeEvent, useRef} from 'react'
import { Form } from 'formik';
import SubmitError from '../submit-error';
import { Loader } from '@components';
import { DigitsFormProps } from '@types';

const FormComponent: React.FC<DigitsFormProps> = ({values, errors, touched, submitError, isSubmitting, loading, setFieldValue, setModal, email, resend}) => {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
        setModal(modal => ({
            ...modal, 
            submitError: null
        }))
        const value = e.target.value.slice(0, 1);
        e.target.value = value
        setFieldValue(`code[${i}]`, value)
        if (i < 5 && e.target.value) inputRefs.current[i + 1]?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number,setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
        if (e.key === 'Backspace' && i > 0 && e.currentTarget.value === '') inputRefs.current[i - 1]?.focus();
        if (e.key === 'Delete' && i < 5 && e.currentTarget.value === '') {
            inputRefs.current[i + 1]?.focus();
            setFieldValue(`code[${i + 1}]`, '');
            inputRefs.current[i + 1]!.value = '';
        } 
      };

  return (
    <Form>
        <h1 className='text-primary text-xl font-semibold w-max mx-auto'> Verify your email </h1>
        <p className='text-center'> Enter the verification code sent to your <span className='font-semibold'> {email} </span> inbox. Please check your spam or promotions folder if you can&apos;t find it in your inbox.</p>
        
        <div className="flex space-x-2 items-center justify-center my-2"> 
            { values.code.map((digit, i) => (
                <input
                    key={i}
                    type="number"
                    inputMode='numeric'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, i, setFieldValue)}
                    onKeyDown={(e) => handleKeyDown(e, i, setFieldValue)}
                    // value={digit}
                    className={`digitBox flex justify-center items-center font-bold leading-none  w-[35px] h-[35px] outline-none p-2 pl-3 border-[2px] rounded  
                        ${ errors.code && errors.code[i] !== undefined && touched.code ? 'border-[#E65050]' : 'border-black' }
                    `}
                    ref={(ref) => { inputRefs.current[i] = ref }}
                />
            )) }
        </div>
        { submitError && <SubmitError error={submitError} /> }

        <p className='text-sm font-semibold text-center pt-3 mt-1 border-t'> 
            Didn&apos;t receive?
            <span className='text-primary cursor-pointer font-semibold ml-2'
                onClick={resend}
            > Resend </span> 
        </p> 

        <button type="submit" disabled={isSubmitting} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:bg-opacity-40 disabled:cursor-not-allowed h-[32px]'> 
            { loading ? <Loader /> : 'Verify' }
        </button>
    </Form>
  )
}
export default FormComponent