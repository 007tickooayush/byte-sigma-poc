const url = import.meta.env.VITE_SERVER_URL;

/**
 * 
 * @param {number} page current page
 * @param {number} limit limit of data per page
 * @returns {Promise<Array>}
 */
export const getImages = async (page, limit) => {
    try {
        const response = await fetch(`${url}images?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    } catch (err) {
        console.log('getImages err :>> ', err);
    }
};