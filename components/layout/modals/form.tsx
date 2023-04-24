// import { Formik, Form, FormikHelpers } from "formik"
// import { Loader } from "../../loader"
// import { AiOutlineLock, AiOutlineMail } from "react-icons/ai"
// import FormField from "./field"
// import * as Yup from 'yup';
// import { SignInInitialValues } from "../../../types";

// interface IFormProps {
//     initialValues: SignInInitialValues, 
//     validationSchema: Yup.ObjectSchema<{
//         email: string;
//         password: string;
//     }>, 
//     handleSubmit: (values: SignInInitialValues, { setSubmitting }: FormikHelpers<SignInInitialValues>) => Promise<void>,
//     loading: boolean,
//     openForgotPasswordModal: () => void
// }

// const FormComponent: React.FC<IFormProps> = ({initialValues, validationSchema, handleSubmit, loading, openForgotPasswordModal}) => {
//   return (
//     <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//     >
//         {({ isSubmitting, errors, values, touched }) => {
//             return (
//                 <Form className='space-y-3 flex flex-col justify-end'>
//                     <FormField 
//                         title='Email' 
//                         icon={<AiOutlineMail size={25} color={touched.email && errors.email ? '#E65050' : '#000'} />} 
//                         name='email'
//                         placeholder='Enter your email'
//                         error={touched.email && errors.email !== undefined}
//                     />
                    
//                     <FormField 
//                         title='Password' 
//                         icon={<AiOutlineLock size={25} color={touched.password && errors.password ? '#E65050' : '#000'} />} 
//                         name='password'
//                         placeholder='Enter your password'
//                         password
//                         error={touched.password && errors.password !== undefined}
//                         value={values.password}
//                     />
                    
//                     <button type='button' className='text-xs text-primary font-semibold ml-auto' onClick={openForgotPasswordModal}> Forgot password </button>
        
//                     <button type="submit" disabled={isSubmitting} className='p-1 my-3 rounded-full text-white bg-primary outline-none border-none w-full font-semibold disabled:bg-opacity-40 disabled:cursor-not-allowed h-[32px]'> 
//                         { loading ? <Loader /> : 'Sign In' }
//                     </button>
//                 </Form>
//             )
//         }}
//     </Formik>
//   )
// }
// export default FormComponent