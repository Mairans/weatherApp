export function weatherConditionsToIconMapper(code) {
    switch (code) {
        case '01d':
        case '01n':
        case '02d':
        case '02n':
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            return 'bi bi-clouds';
        case '10d':
        case '10n':
            return 'bi bi-cloud-drizzle';
        case '11d':
        case '11n':
            return 'bi bi-cloud-lightning';
        case '13d':
        case '13n':
            return 'bi bi-snow';
        case '50d':
        case '50n':
            return 'bi bi-cloud-fog';
        default:
            return 'wi-day-sunny';
    }
}