export const formatTemp = (temp) => {
    if (!temp) {
        throw new Error('not found temp')
    }
    const roundTemp = Math.floor(temp)

    return `${roundTemp}°`
}