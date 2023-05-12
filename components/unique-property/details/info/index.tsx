import { useState, useEffect, CSSProperties } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import millify from 'millify';
import ReactPlayer from 'react-player'
import { GoVerified } from 'react-icons/go';
import { MdWindow } from 'react-icons/md';
import { FaBath, FaBed } from 'react-icons/fa'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import PropertyInfos from './property-info';
import Amenities from './amenities';
import { propertiesState, layoutState, userState } from '@states';
import { UniquePropertyPageProps } from '@types';
import { handleSaveAndUnsave } from '@utils';
import { Loader } from '@components';

const Info: React.FC<UniquePropertyPageProps> = ({propertyDetails}) => {
    const [descriptionVisibility, setDescriptionVisibility] = useState<boolean>(false);
    const [screenWidth, setscreenWidth] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [properties, setProperties] = useRecoilState(propertiesState);
    const setModal = useSetRecoilState(layoutState);
    const user = useRecoilValue(userState);
    const [lines, setLines] = useState(5);
    
    const { isVerified, price, rentFrequency, rooms, baths, area, title, description, coverVideo, amenities, location, externalID, coverPhoto, agency } = propertyDetails;
    const propertyLocation = `${location[5] ? location[5].name + ', ' : ''}` + `${location[4] ? location[4].name + ', ' : ''}` + `${location[3] ? location[3].name + ', ' : ''}` + `${location[2] ? location[2].name + ', ' : ''}` + `${location[1] ? location[1].name + '.' : ''}`

    const savedProperties = properties.savedProperties ? properties.savedProperties : [];

    const savedPropertiesIDs = savedProperties.map((pty) => pty.externalID);
    const [isSaved, setIsSaved] = useState(savedPropertiesIDs.includes(externalID));

    const handleDescription = () => {
        setDescriptionVisibility(!descriptionVisibility);
        setLines(descriptionVisibility ?  5 : 1000)
    }

    const handleClick = async () => {
        handleSaveAndUnsave({property: propertyDetails, setLoading, isSaved, setProperties, savedProperties, setModal, user});
    }

    const styles: CSSProperties  = {
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    } 

    useEffect(() => {
      window.addEventListener('resize', () => setscreenWidth(window.innerWidth));
      setIsSaved(savedPropertiesIDs.includes(externalID))
    }, [savedPropertiesIDs, externalID])
    
  return (
    <div className='space-y-5'>
        <div className="flex flex-col pt-3 gap-[5px] space-y-3">
            <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="flex space-x-2 items-center">
                    { isVerified && <div className='text-green-500 '> <GoVerified size={30} /> </div> }
                    <p className="font-bold font-lg leading-tight text-lg capitalize"> AED <span className='text-xl ls:text-2xl xls:text-3xl'>{price.toLocaleString()}</span> {rentFrequency && `${rentFrequency}`} </p>
                </div>
                
                <div className="flex space-x-2 justify-center items-center p-2 xls:px-4 cursor-pointer rounded-md bg-primary bg-opacity-20 border border-primary text-primary font-medium w-[117px] h-[42px]" onClick={() =>  handleClick()}>
                    {loading ? <Loader /> : isSaved ? (
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
                <p dangerouslySetInnerHTML={{__html: description}} 
                    className={`font-medium overflow-hidden text-overflow-ellipsis whitespace-no-wrap`} 
                    style={styles}
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