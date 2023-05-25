import {useState, useEffect} from 'react'
import {StaticImageData} from 'next/image'
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { FaBath, FaBed } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { GoVerified } from "react-icons/go";
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdWindow } from 'react-icons/md';
import {GridType, ListType} from './type';
import { layoutState, propertiesState, userState } from '@states';
import { Spinner } from '@components';
import { PropertyProps } from '@types'
import {defaultPropertyImg} from '@public';
import { handleSaveAndUnsave } from '@utils';

const Property: React.FC<PropertyProps> = ({ property, similar }) => {
    const [loading, setLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState<string | StaticImageData>(property.coverPhoto && property.coverPhoto.url ? property.coverPhoto.url : "");
    const setModal = useSetRecoilState(layoutState);
    const user = useRecoilValue(userState);
    const [properties, setProperties] = useRecoilState(propertiesState);
    
    const savedProperties = properties.savedProperties ? properties.savedProperties : [];
    const { externalID, location, title, coverPhoto, price, rooms, baths, area, isVerified, rentFrequency, agency, product } = property
    const propertyLocation = `${location[2] ? location[2].name + ', ' : ''}` + `${location[1] ? location[1].name + '.' : ''}`

    const savedPropertiesIDs = savedProperties.map((pty) => pty.externalID);
    const [isSaved, setIsSaved] = useState(savedPropertiesIDs.includes(externalID));

    const handleClick = async () => {
        handleSaveAndUnsave({property, setLoading, isSaved, setProperties, savedProperties, setModal, user});
    }

    const propsToSend = {
        similar, title, externalID,  
        toImg: {
            coverPhoto, imgUrl, setImgUrl, GoVerified, rentFrequency, defaultPropertyImg, isVerified, product, price
        },
        toAgency: { agency },
        toBtn: { loading, Spinner, isSaved, AiFillHeart, AiOutlineHeart, handleClick, ptyWaitLoading: properties.ptyWaitLoading },
        toLocation: { HiOutlineLocationMarker, propertyLocation },
        toInfo: { FaBed, FaBath, MdWindow, rooms, baths, area }
    }

    useEffect(() => {
        setIsSaved(savedPropertiesIDs.includes(externalID));
    }, [savedPropertiesIDs, externalID])

    return (
      <>
        <div className='hidden ls:block'>
            { properties.isList ? (
                <ListType objects={propsToSend} />
            ) : (
                <GridType objects={propsToSend} />
            ) }
        </div>

        <div className='block ls:hidden'> <GridType objects={propsToSend} /> </div>
      </>

  )
}

export default Property