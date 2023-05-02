import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url, featuredAgencies, autoComplete, e) => {
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY
        },
        params: {
            query: autoComplete && e.target.value, hitsPerPage: autoComplete && '5'
        } 
    }) 

    if(featuredAgencies) {
        return data.hits.filter((agency) => agency.product === 'premium');
    } else {
        return data;
    }
}