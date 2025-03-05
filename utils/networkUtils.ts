import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

/**
 * Checks if the device has an active internet connection.
 * @returns {Promise<boolean>} - True if connected, otherwise false.
 */
export const checkInternetConnection = async (): Promise<boolean> => {
    try {
        const state = await NetInfo.fetch();
        return state.isConnected || false;
    } catch (error) {
        // console.error('Error checking internet connection:', error);
        return false;
    }
};

/**
 * Checks if the API is reachable.
 * @param {string} apiBaseUrl - The base URL of the API.
 * @returns {Promise<boolean>} - True if the API is reachable, otherwise false.
 */
export const checkAPIReachability = async (apiBaseUrl: string): Promise<boolean> => {
    try {
        const response = await axios.get(`${apiBaseUrl}/`, { timeout: 5000 });
        return response.status === 200;
    } catch (error) {
        // console.error('API is not reachable:', error);
        return false;
    }
};
