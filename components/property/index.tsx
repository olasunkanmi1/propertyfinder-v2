import React, {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PropertyProps } from '../../types'
import DefaultImage from '../../public/assets/house.webp';
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { FaBath, FaBed } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdWindow } from 'react-icons/md';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { navbarState, savedPropertiesState } from '../../states';
import axios from 'axios';
import { toast } from "react-toastify";
import { Spinner } from '../loader';

const Property: React.FC<PropertyProps> = ({ property }) => {
    const [loading, setLoading] = useState(false);
    const setModal = useSetRecoilState(navbarState);
    const [savedProperties, setSavedProperties] = useRecoilState(savedPropertiesState);
    
    const { coverPhoto, price, rooms, title, baths, area, isVerified, rentFrequency, agency, externalID } = property

    const savedPropertiesIDs = savedProperties?.map((pty) => pty.externalID);
    const [isSaved, setIsSaved] = useState(savedPropertiesIDs && savedPropertiesIDs.includes(externalID));

    const handleClick = async () => {
        setLoading(true);
        const obj = {
            coverPhoto: {
                url: coverPhoto.url
            },
            price, rooms, title, baths, area,
            isVerified, rentFrequency,
            agency: {
                logo: {
                    url: agency.logo.url
                },
                name: agency.name
            },
            externalID
        }

        if(isSaved) {
            axios.delete(`property/${externalID}`, { withCredentials: true })
          .then(async (res) => {
            setLoading(false);
    
            if (res.status === 200) {
                setSavedProperties(savedProperties?.filter((pty) => pty.externalID !== externalID))
                setIsSaved(false)
              toast.success('Property unsaved');
            }
          })
          .catch((error) => {
            setLoading(false);
    
            if(error.response.status === 401) {
                setModal(modal => ({...modal, signInModal: true}));
            } else {
                toast.error('Unable to unsave property, please try again');
            }
          })
        } else {
            axios.post("property", obj, { withCredentials: true })
          .then(async (res) => {
            setLoading(false);
    
            if (res.status === 200) {
                setIsSaved(true)
              toast.success('Property saved');
            }
          })
          .catch((error) => {
            setLoading(false);
    
            if(error.response.status === 401) {
                setModal(modal => ({...modal, signInModal: true}));
            } else {
                toast.error('Unable to save property, please try again');
            }
          })
        }
    }

    return (
        <div className="w-full ls:w-[300px]">
            <Link href={`/property/${externalID}`} passHref>
                <a className="w-full">
                    <div className="relative rounded-xl w-full h-[160px] overflow-hidden">
                        <Image 
                            src={coverPhoto ? coverPhoto.url : DefaultImage} alt="cover-photo" layout="fill"
                            blurDataURL={coverPhoto && coverPhoto.url} loading="lazy"
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
                    
                    <button className="flex justify-center items-center mt-2 bg-primary bg-opacity-50 cursor-pointer transition ease-in-out w-[30px] h-[30px] overflow-hidden rounded-md" onClick={() =>  handleClick()}>
                        {loading ? <Spinner /> : isSaved ? (
                            <AiFillHeart size={20} color='rgb(255, 0, 0)' />
                        ) : (
                            <AiOutlineHeart size={20} color='#fff' />
                        )}
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