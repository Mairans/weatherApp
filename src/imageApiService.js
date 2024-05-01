import { baseFetch } from "./helpers/baseFetch.js"

function createImageService () {
const ACCESS_KEY = '0G30lAhsx-SgENKIzjUAL4083NdNo6ezVHj2PVb4ZHY'
    function fetchImageByKeywords(keywords) {
        const options = {
            headers: {
                'Accept-Version': 'v1',
                'Authorization': `Client-ID ${ACCESS_KEY}`
            }
        }
        return baseFetch(`https://api.unsplash.com/search/photos/?query=${keywords}&client_id=${ACCESS_KEY}`, options)
    } 
    return {
        fetchImageByKeywords
    }
}

export const imageApiService = createImageService();