import { NextRouter } from "next/router" 
import { SetterOrUpdater } from "recoil"
import { IFilterState } from "@types"
import { selections } from "@utils"

export const setFilterState = (setFilter: SetterOrUpdater<IFilterState>, router: NextRouter) => {
    const {query} = router
    const emiratesIDs = selections.emirates.items?.map(item => item.value)
    
    return (
        setFilter(filter => ({ 
            purpose: query.purpose || 'for-rent',
            rentFrequency: query.rentFrequency || 'yearly',
            roomsMin: query.roomsMin || '0',
            roomsMax: query.roomsMax || 'any',
            bathsMin: query.bathsMin || '0',
            bathsMax: query.bathsMax || 'any',
            priceMin: query.priceMin || '0',
            priceMax: query.priceMax || 'any',
            areaMin: query.areaMin || '0',
            areaMax: query.areaMax || 'any',
            sort: query.sort || 'any',
            furnishingStatus: query.furnishingStatus || 'any',
            categoryExternalID: query.categoryExternalID || '1',
            locationExternalIDs: query.locationExternalIDs || 'any',
            
            propertyType: query.categoryExternalID ? filter.propertyType : 'Property Type',
            emirates: query.locationExternalIDs ? filter.emirates : 'any',
            sortBy: query.sort ? filter.sortBy : 'any',
            address: !emiratesIDs?.includes(filter.locationExternalIDs.toString()) ? filter.address : '',
        }))
    )
}