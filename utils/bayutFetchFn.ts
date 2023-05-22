import axios from "axios";
import {Agency, BayutFetchFnProps, Property} from '@types'

export const bayutFetchFn = async ({url, superhotProperties, featuredAgencies, autoComplete, e}: BayutFetchFnProps) => {
    const { data } = await axios.get((`https://bayut.p.rapidapi.com/${url}`), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY || ''
        },
        params: {
            query: autoComplete && e && e.target.value, hitsPerPage: autoComplete && '5'
        } 
    }) 

    if(superhotProperties) {
        return data.hits.filter((property: Property) => property.product === 'superhot').slice(0, 6);
    } else if(featuredAgencies) {
        return data.hits.filter((agency: Agency) => agency.product === 'featured');
    } else {
        return data;
    }
}