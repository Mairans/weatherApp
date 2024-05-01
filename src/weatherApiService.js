import { API_URL, API_KEY, units } from './constants/api.js'
import { baseFetch } from './helpers/baseFetch.js'

function createWeatherApiService() {
    function getWeatherByCity(city) {
        return baseFetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=${units}`)
    }
    
    function getWeatherByLocation(lat, lon) {
        return baseFetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`)
    }

    return {
        getWeatherByCity, getWeatherByLocation
    }
}

export const weatherApiService = createWeatherApiService(); 