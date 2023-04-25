import { useState, useEffect, useRef } from 'react'
import { GoVerified } from 'react-icons/go';
import { MdWindow } from 'react-icons/md';
import { FaBath, FaBed } from 'react-icons/fa'
import millify from 'millify';
import { UniquePropertyPageProps } from '../../../../types';
import PropertyInfos from './property-info';
import Amenities from './amenities';
import ReactPlayer from 'react-player'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { propertiesState, navbarState } from '../../../../states';
import { unSaveProperty, saveProperty } from '../../../../utils/propertyFns';
import { fetchSavedProperties } from '../../../../utils/fetchFns';
import { toast } from "react-toastify";
import { Spinner } from '../../../loader';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface MyError {
    message: string
    response?: {
      status: number
    }
}

const Info: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
    const descriptionRef = useRef<HTMLParagraphElement>(null)
    const [descriptionHeight, setDescriptionHeight] = useState<number | undefined>(descriptionRef.current?.offsetHeight);
    const [descriptionVisibility, setDescriptionVisibility] = useState<boolean>(false);
    const [screenWidth, setscreenWidth] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [properties, setProperties] = useRecoilState(propertiesState);
    const setModal = useSetRecoilState(navbarState);
    
    const { isVerified, price, rentFrequency, rooms, baths, area, title, description, coverVideo, amenities, location, externalID, coverPhoto, agency } = propertyDetails;
    const propertyLocation = `${location[5] ? location[5].name + ', ' : ''}` + `${location[4] ? location[4].name + ', ' : ''}` + `${location[3] ? location[3].name + ', ' : ''}` + `${location[2] ? location[2].name + ', ' : ''}` + `${location[1] ? location[1].name + '.' : ''}`

    const savedProperties = properties.savedProperties ? properties.savedProperties : [];

    const savedPropertiesIDs = savedProperties.map((pty) => pty.externalID);
    const [isSaved, setIsSaved] = useState(savedPropertiesIDs.includes(externalID));

    const handleDescription = () => {
        setDescriptionVisibility(!descriptionVisibility);
    }

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
            externalID,
            location
        }

        if(isSaved) {
            try {
                const unsaveRes = await unSaveProperty(externalID);
                setLoading(false);

                if (unsaveRes && unsaveRes.status === 200) {
                    setProperties(properties => ({
                        ...properties,
                        savedProperties: savedProperties.filter((pty) => pty.externalID !== externalID)
                    }))
                    setIsSaved(false)
                    toast.success('Property unsaved');
                }
            } catch (error) {
                const myError = error as MyError
                setLoading(false);
        
                if(myError.response && myError.response.status === 401) {
                    setModal(modal => ({...modal, signInModal: true}));
                } else {
                    toast.error('Unable to unsave property, please try again');
                }
            }

        } else {
            try {
                const saveRes = await saveProperty(obj);
                setLoading(false);

                if (saveRes && saveRes.status === 200) {
                    setIsSaved(true)
                    const savedProperties = await fetchSavedProperties();

                    setProperties(properties => ({
                        ...properties,
                        savedProperties: savedProperties
                    }))
                    toast.success('Property saved');
                }
            } catch (error) {
                const myError = error as MyError
                setLoading(false);
        
                if(myError.response && myError.response.status === 401) {
                    setModal(modal => ({...modal, signInModal: true}));
                } else {
                    toast.error('Unable to save property, please try again');
                }
            }
        }
    }


    useEffect(() => {
      setDescriptionHeight(descriptionRef.current?.offsetHeight);
      window.addEventListener('resize', () => setscreenWidth(window.innerWidth));

      setIsSaved(savedPropertiesIDs.includes(externalID))
    }, [descriptionRef.current?.offsetHeight, savedPropertiesIDs, externalID])
    
  return (
    <div className='space-y-5'>
        <div className="flex flex-col pt-3 gap-[5px] space-y-3">
            <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="flex space-x-2 items-center">
                    { isVerified && <div className='text-green-500 '> <GoVerified size={30} /> </div> }
                    <p className="font-bold font-lg leading-tight text-lg capitalize"> AED <span className='text-xl ls:text-2xl xls:text-3xl'>{price.toLocaleString()}</span> {rentFrequency && `${rentFrequency}`} </p>
                </div>
                
                <div className="flex space-x-2 justify-center items-center p-2 xls:px-4 cursor-pointer rounded-md bg-primary bg-opacity-20 border border-primary text-primary font-medium" onClick={() =>  handleClick()}>
                    {loading ? <Spinner /> : isSaved ? (
                        <> <AiFillHeart size={20} color='#0847A8' /> <span> Unsave </span> </>
                    ) : (
                        <> <AiOutlineHeart size={20} /> <span> Save </span> </>
                        
                    )}
                </div>
            </div>

            <p className='font-bold'> {title} </p>

            <div className="flex justify-between items-center font-normal text-lg">
                <p className='propertyBBA'> <FaBed /> {rooms} </p>
                <p className='propertyBBA'> <FaBath /> {baths} </p>
                <p className='propertyBBA'> <MdWindow /> {millify(area)} sqft  </p>
            </div>

            <div>
                <h1 className='font-bold text-xl mb-2 text-primary'> Property Description </h1>
                <p ref={descriptionRef} dangerouslySetInnerHTML={{__html: description}} 
                    className={`font-medium overflow-hidden ${descriptionHeight === undefined || descriptionHeight > 119 && !descriptionVisibility ? 'propertyDetails_description' : 'h-auto'}`} 
                />

                {/* { descriptionHeight && descriptionHeight > 120 && ( */}
                    <button className='flex font-medium mt-2 text-primary gap-1' onClick={handleDescription}> 
                        Read { descriptionVisibility ? 
                            ( <span className='flex items-center gap-2'> Less <AiOutlineUp size={15} /> </span> 
                            ) : ( 
                            <span className='flex items-center gap-2'> More <AiOutlineDown size={15} /> </span> 
                            ) }
                    </button> 
                {/* // )} */}
            </div>
        </div>

        {coverVideo && (
            <ReactPlayer url={coverVideo.url} width={screenWidth && screenWidth < 500 ? '100%' : '380px'} height={'250px'} controls /> 
        )}

        <div>
            <div className='flex items-center text-primary mb-2'>
                <MdLocationOn size={20} />
                <h1 className='font-bold text-xl'> Location </h1>
            </div>

            <p className='font-medium'>  {propertyLocation} </p>
        </div>

        <PropertyInfos propertyDetails={propertyDetails} />
        {amenities.length !== 0 && <Amenities propertyDetails={propertyDetails} /> }
    </div>
  )
}

export default Info