import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url, featuredAgencies, autoComplete, e) => {
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            // 'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_ONE
            // 'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_TWO
            // 'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_THREE
            // 'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_FOUR
            // 'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_FIVE
            // 'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_SIX
            // 'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_SEVEN
            'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_EIGHT
            // 'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_NINE
            // 'x-rapidapi-key': process.env.NEXT_PUBLIC_KEY_TEN
        },
        params: {
            query: autoComplete && e.target.value, hitsPerPage: autoComplete && '5'
        } 
    }) 

    if(featuredAgencies) {
        return data.hits.filter((agency) => agency.product === 'featured');
    } else {
        return data;
    }
}