export const url = import.meta.env.VITE_SERVER_URL;
export const cloudUrl = import.meta.env.VITE_IMAGE_URL;
export const authToken = import.meta.env.VITE_AUTH_TOKEN_CLOUD;
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

export const uploadImage = async (formData) => {
    try {
        const response = await fetch(`${url}upload-file`, {
            method: 'POST',
            headers: {
                'Authorization': authToken
            },
            body: formData
        });
        return response.json();
    }
    catch (err) {
        console.log('uploadImage err :>> ', err);
    }
};

/**
 * 
 * @param {string} imagOrgName image original name with file extension
 * @returns {Promise<Blob>}
 */
export const accessImage = async (imagOrgName) => {
    try {
        const response = await fetch(`${cloudUrl}${imagOrgName}`, {
            method: 'GET',
            headers: {
                'Authorization': authToken ?? 'no-token-found',
            }
        });
        return response.blob();
    } catch (err) {
        console.log('accessImage err :>> ', err);
    }
}