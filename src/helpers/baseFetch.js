export const baseFetch = async (url, options) => {
    try {
        const response = await fetch(url, options);
        const json = await response.json();
        return json
    } catch (error) {
        throw new Error(error)
    }
}