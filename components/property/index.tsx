import React, {useState, useEffect} from 'react'
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
import { navbarState, propertiesState } from '../../states';
import axios from 'axios';
import { toast } from "react-toastify";
import { Spinner } from '../loader';
import { fetchSavedProperties } from '../../utils/fetchFns';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const Property: React.FC<PropertyProps> = ({ property }) => {
    const [loading, setLoading] = useState(false);
    const setModal = useSetRecoilState(navbarState);
    const [properties, setProperties] = useRecoilState(propertiesState);
    
    const savedProperties = properties.savedProperties ? properties.savedProperties : [];
    const { coverPhoto, price, rooms, title, baths, area, isVerified, rentFrequency, agency, externalID, location } = property
    const propertyLocation = `${location[2] ? location[2].name + ', ' : ''}` + `${location[1] ? location[1].name + '.' : ''}`

    const savedPropertiesIDs = savedProperties.map((pty) => pty.externalID);
    const [isSaved, setIsSaved] = useState(savedPropertiesIDs.includes(externalID));

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
                setProperties(properties => ({
                    ...properties,
                    savedProperties: savedProperties.filter((pty) => pty.externalID !== externalID)
                }))
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
                const savedProperties = await fetchSavedProperties();

                setProperties(properties => ({
                    ...properties,
                    savedProperties: savedProperties
                }))
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

    useEffect(() => {
        setIsSaved(savedPropertiesIDs.includes(externalID))
    }, [savedPropertiesIDs, externalID])

    return (
        <div className="grid-cols-1">
            <Link href={`/property/${externalID}`} passHref>
                <a className="w-full">
                    <div className="relative rounded-xl w-full h-[160px] overflow-hidden">
                        <Image 
                            src={coverPhoto ? coverPhoto.url : DefaultImage} alt="cover-photo" layout="fill"
                            blurDataURL={coverPhoto && coverPhoto.url} loading="lazy"
                        />

                        { isVerified && <div className='text-green-500 absolute top-2 left-2 rounded-full bg-white p-1 shadow-md'> <GoVerified size={20} /> </div> }
                        <p className="absolute bottom-2 right-2 p-1 rounded-md text-primary bg-white font-bold font-lg shadow-md leading-tight"> AED {millify(price)} {rentFrequency && ` ${rentFrequency}`} </p>
                    </div>
                </a>
            </Link>

            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <Link href={`/property/${externalID}`} passHref>
                        <a className='flex items-center w-[calc(100%-35px)] h-[38px] pt-2'>
                            <p className='truncate font-medium'> {title} </p>
                        </a>
                    </Link>
                    
                    <button className="flex justify-center items-center mt-2 bg-primary bg-opacity-50 cursor-pointer transition ease-in-out w-[30px] h-[30px] overflow-hidden rounded-md" onClick={() =>  handleClick()}>
                        {loading ? <Spinner /> : isSaved ? (
                            <AiFillHeart size={20} color='#0847A8' />
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

                        <div className="flex space-x-1 items-center h-[30px]">
                            <span className='w-5 h-5 text-primary'> <HiOutlineLocationMarker size={20} /> </span>
                            <p className="font-bold text-xs text-primary overflow-hidden text-overflow-ellipsis whitespace-no-wrap" 
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                            > {propertyLocation}
                            </p>
                        </div>

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