import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PropertyProps } from '../../types'
import DefaultImage from '../../public/assets/house.webp';
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { FaBath, FaBed } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdWindow } from 'react-icons/md';
import { db, storage } from '../../firebase'
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore'
import { ref } from 'firebase/storage'
import { useSession } from 'next-auth/react'
import { useSetRecoilState } from 'recoil';
import { navbarState } from '../../states';

const Property: React.FC<PropertyProps> = ({ property }) => {
  const { data: session, status } = useSession();
  const setModal = useSetRecoilState(navbarState);

//   console.log(session)
    const { coverPhoto, price, rooms, title, baths, area, isVerified, rentFrequency, agency, externalID } = property

    const handleClick = async () => {
        // alert('saved')
        if(session) {
            await addDoc(collection(db, "saved-properties"), {
                userId: session?.user?.email,
                coverPhoto, price, rooms, title, baths, area, isVerified, rentFrequency, agency, externalID,
                timestamp: serverTimestamp(),
            })
        } else {
            setModal( modal => ({
                ...modal,
                signInModal: true,
            }))
        }
    }

    return (
        <div className="w-full ls:w-[300px]">
            <Link href={`/property/${externalID}`} passHref>
                <a className="w-full">
                    <div className="relative rounded-xl w-full h-[160px] overflow-hidden">
                        <Image 
                            src={coverPhoto ? coverPhoto.url : DefaultImage} alt="cover-photo" layout="fill" priority
                            blurDataURL={coverPhoto && coverPhoto.url} 
                        />
                    </div>
                </a>
            </Link>

            <div className="flex flex-col pr-2">
                <div className="flex justify-between items-center">
                    <Link href={`/property/${externalID}`} passHref>
                        <a className='w-[calc(100%-35px)] h-[38px] pt-2 pl-2'>
                            <div className="flex space-x-2 items-center h-full">
                                { isVerified && <div className='text-green-500 '> <GoVerified size={20} /> </div> }
                                <p className="font-bold font-lg leading-tight"> AED {millify(price)} {rentFrequency && ` ${rentFrequency}`} </p>
                            </div>
                        </a>
                    </Link>
                    
                    <button className="flex justify-center items-center mt-2 bg-primary bg-opacity-50 cursor-pointer transition ease-in-out w-[30px] h-[30px] rounded-md" onClick={() =>  handleClick()}>
                        <AiOutlineHeart size={20} color='#fff' />
                        {/* <AiFillHeart size={20} color='rgb(255, 0, 0)' /> */}
                    </button>
                </div>

                <Link href={`/property/${externalID}`} passHref>
                    <a className='pt-[5px]'>
                        <div className="flex justify-between items-center font-normal">
                            <p className='propertyBBA'> <FaBed />{rooms} </p>
                            <p className='propertyBBA'> <FaBath />{baths} </p>
                            <p className='propertyBBA'> <MdWindow />{millify(area)} sqft  </p>
                        </div>

                        <p className='truncate font-medium'> {title} </p>

                        <div className='flex justify-between items-center'>
                            { agency && <p className='truncate font-normal text-sm text-secondary w-[calc(100%-30px)]'> {agency.name} </p>}

                            <div className="flex space-x-2 justify-center items-center w-[25px] h-[25px] relative rounded-full overflow-hidden border bg-secondary text-white">
                                <Image 
                                    src={agency ? agency.logo.url : 'https://i.ibb.co/6vv08Pk/homr-removebg-preview.png'} alt="Agency Logo" layout="fill" priority 
                                    blurDataURL={agency ? agency.logo.url : 'https://i.ibb.co/6vv08Pk/homr-removebg-preview.png'}
                                />
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
        </div>
  )
}

export default Property