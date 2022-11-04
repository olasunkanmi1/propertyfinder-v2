import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url, featuredAgencies) => {
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': '193b1e78bdmsh49c343cac6947ffp1452b0jsn4cb4e7f4fa40'
        }
    })

    if(featuredAgencies) {
        return data.hits.filter((agency) => agency.product === 'featured');
    } else {
        return data;
    }
}