import { SetterOrUpdater } from "recoil"
import { IFilterState } from "../../states"
import { NextRouter } from "next/router"

export const setFilters = (setFilter: SetterOrUpdater<IFilterState>, router: NextRouter) => {
    return (
        setFilter(filter => ({ 
            ...filter, 
            purpose: router.query.purpose ? router.query.purpose : 'for-rent',
            rentFrequency: router.query.rentFrequency ? router.query.rentFrequency : 'any',
            roomsMin: router.query.roomsMin ? router.query.roomsMin : '0',
            roomsMax: router.query.roomsMax ? router.query.roomsMax : 'any',
            bathsMin: router.query.bathsMin ? router.query.bathsMin : '0',
            bathsMax: router.query.bathsMax ? router.query.bathsMax : 'any',
            priceMin: router.query.priceMin ? router.query.priceMin : '0',
            priceMax: router.query.priceMax ? router.query.priceMax : 'any',
            areaMin: router.query.areaMin ? router.query.areaMin : '0',
            areaMax: router.query.areaMax ? router.query.areaMax : 'any',
            sort: router.query.sort ? router.query.sort : 'popular',
            furnishingStatus: router.query.furnishingStatus ? router.query.furnishingStatus : 'any',
            categoryExternalID: router.query.categoryExternalID ? router.query.categoryExternalID : '1',
            locationExternalIDs: router.query.locationExternalIDs ? router.query.locationExternalIDs : '5001',
            
            propertyType: router.query.categoryExternalID ? filter.propertyType : 'Property Type',
            emirates: router.query.locationExternalIDs ? filter.emirates : 'Emirates',
            sortBy: router.query.sort ? filter.sortBy : 'Sort',
        }))
    )
}