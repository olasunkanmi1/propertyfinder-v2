import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url, featuredAgencies) => {
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            // 'x-rapidapi-key': '193b1e78bdmsh49c343cac6947ffp1452b0jsn4cb4e7f4fa40'
            // 'x-rapidapi-key': '226d16c2f2msh9521bd335bda97dp171b4fjsn48ca6e1a0698'
            'x-rapidapi-key': 'a7765c2bfcmsh6826d1f7444990cp14bd32jsn40ebd9e9d37f' //olarapidapi1 - dawn.unaided00@icloud.com
        }
    }) 

    if(featuredAgencies) {
        return data.hits.filter((agency) => agency.product === 'featured');
    } else {
        return data;
    }
}