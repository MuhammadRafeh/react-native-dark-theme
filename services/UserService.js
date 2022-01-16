import * as SecureStore from 'expo-secure-store';
import AuthService from './AuthService';
import RequestHelperService from './RequestHelperService';

export default class UserService {

    /**
     * Save user data to secure storage
     * 
     * @param {string} userData User data as string
     * @returns 
     */
    static async setUserData(userData) {
        let a = await SecureStore.setItemAsync('user_data', userData, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
        return userData;
    }
    /**
     * Get user date from secure storage
     * 
     * @returns {Object} 
     */
    static async getUserData() {
        let userData = await SecureStore.getItemAsync('user_data', { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }).then(d => JSON.parse(d)).catch(e => e);
        return userData !== null ? userData : await this.getUserDataFromEndpoint();
    }

    /**
     * Remove user data from secure storage
     * 
     */
    static async resetUserData() {
        await SecureStore.deleteItemAsync('user_data', { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
    }

    /**
     * Get user data from endpoint
     * 
     * @returns {Object}
     */
    static async getUserDataFromEndpoint() {
        return await RequestHelperService.fetch('user').then(async (d) => await UserService.setUserData(JSON.stringify(d))).catch(e => { throw e });
    }

}