import { weatherConditionsToIconMapper } from './helpers/mappers.js'
import { formatTemp } from './helpers/formatTemp.js'
import { SECOND, MINUTE, HOUR, DAY } from './constants/time.js'
import {imageApiService} from './imageApiService.js'

export function weatherWidgetService() {
    async function getBackgroundImage(keywords) {
        const imgResp = await imageApiService.fetchImageByKeywords(keywords)
        const imgUrl = imgResp.results[0].urls.regular;

        return imgUrl
    }

    function applyBackgroundImage(url) {
        const appBackbroundElemnt = document.getElementById('app-backbround');

        if (!appBackbroundElemnt) {
            throw new Error('Element width id "backbround" not found!')
        }

        appBackbroundElemnt.style.backgroundImage = `url(${url})`;
    }

    function applyTemperature(temp) {
        const tempElement = document.querySelector('#weaher-widget > .temp > p');

        if (!tempElement) {
            throw new Error('Elemnt with selector "#weaher-widget > .temp > p" not found')
        }

        tempElement.textContent = temp
    }

    function applyLocation(city) {
        const locElem = document.querySelector('#weaher-widget > .meta > .location > p');

        if (!locElem) {
            throw new Error('locElem not found')
        }

        if (!city) {
            throw new Error('city not found')
        }

        locElem.textContent = city
    }

    function applyDate(currentDate) {
        const dateElem = document.querySelector('#weaher-widget > .meta > .date > p')

        if (!dateElem) {
            throw new Error('dateElem not found')
        }

        if (!(currentDate instanceof Date)) {
            throw new Error('date not found')
        }

        const time = currentDate.toLocaleTimeString({}, { hour: '2-digit', minute: '2-digit' })
        const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' })
        const date = currentDate.getDate()
        const month = currentDate.toLocaleDateString('en-US', { month: 'short' })
        const year = currentDate.getFullYear()

        dateElem.textContent = `${time} - ${day}, ${date} ${month} ${year}`
    }

    function applyIcon(iconCode) {
        const iconElem = document.querySelector('#weaher-widget > .icon > i')

        if (!iconElem) {
            throw new Error('Element with selector #weaher-widget > .icon not found')
        }

        if (!iconCode) {
            throw new Error('Icon code not found')
        }

        const iconClass = weatherConditionsToIconMapper(iconCode)

        iconElem.className = iconClass
    }

    async function process(weatherData) {
        const imgUrl = await getBackgroundImage(`${weatherData.name}`)

        applyBackgroundImage(imgUrl);

        applyTemperature(formatTemp(weatherData.main.temp))
        applyLocation(weatherData.name)

        setInterval(() => {
            applyDate(new Date())
        }, SECOND)
        applyIcon(weatherData.weather[0].icon)
    }

    return {
        process
    }
}