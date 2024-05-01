import { weatherApiService } from './weatherApiService.js'
import { DEFAULT_CITY } from './constants/api.js'
import { weatherWidgetService } from './weatherWidgetService.js'
import { Settings } from './constants/setting.js'

const getWeatherByLocationBtn = document.getElementById('get-weather-by-loc-feature');

function proccesWeatherByLoc() {
    const onSuccesLoc = (pos) => {
        localStorage.setItem(Settings.isLocationFeatureEnabled, true)
        weatherApiService.getWeatherByLocation(pos.coords.latitude, pos.coords.longitude)
            .then(async data => {
                await weatherWidgetService().process(data)
            })
    }

    const onErrorLoc = (err) => {
        localStorage.setItem(Settings.isLocationFeatureEnabled, false)
        alert('Не удалось получить ваше местоположение. Разрешите доступ к вашей геолокации')
        throw new Error(err)
    }

    navigator.geolocation.getCurrentPosition(onSuccesLoc, onErrorLoc)
}

getWeatherByLocationBtn.addEventListener('click', proccesWeatherByLoc)

async function app() {
    const isLocFeatureEnabled = localStorage.getItem(Settings.isLocationFeatureEnabled)

    if (isLocFeatureEnabled) {
        proccesWeatherByLoc()
    } else {
        const weatherData = await weatherApiService.getWeatherByCity(DEFAULT_CITY)

        await weatherWidgetService().process(weatherData)
    }

}

app()