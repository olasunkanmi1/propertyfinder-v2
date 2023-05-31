import Image from "next/image"
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { removePhoto } from '@utils';
import { EditPhotoProps } from '@types';

const PhotoContainer: React.FC<EditPhotoProps> = ({values, imageBlob, inputRef, setFieldValue, selectedFile, setModal}) => {
  return (
    <>
        <div className='flex justify-center items-center w-[70px] h-[70px] shadow-md rounded-full overflow-hidden bg-secondary m-auto text-white text-xl font-extrabold relative'>
            {!values.photoUrl && !imageBlob ? (
                <> {values.firstName.charAt(0).toUpperCase()}{values.lastName.charAt(0).toUpperCase()} </>
            ) :  (
                <Image src={imageBlob ? imageBlob : values.photoUrl} alt="display picture" fill loading='lazy' />
            )}
        </div>

        <div className={`flex w-full space-x-1 m-auto ${values.photoUrl || imageBlob ? 'justify-between' : 'justify-center'}`}>
            <span onClick={() => inputRef.current?.click()} className='flex justify-center items-center cursor-pointer text-white p-1 bg-primary rounded-md text-sm w-max'> <AiOutlineEdit size={15} className='mr-[3px]' /> Update photo </span>
            { values.photoUrl || imageBlob ? <span onClick={() => removePhoto(values, setFieldValue, imageBlob, selectedFile, setModal)} className='flex justify-center items-center cursor-pointer text-white p-1 bg-[#E65050] rounded-md text-sm w-max'> <AiOutlineDelete size={15} className='mr-[3px]' /> Delete photo </span> : null}
        </div>
    </>
  )
}

export default PhotoContainer