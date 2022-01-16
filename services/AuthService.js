import * as SecureStore from 'expo-secure-store';

export default class AuthService {
    
    static async setToken(token) {    
        await SecureStore.setItemAsync('access_token', token, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
        return token;
    }
    static async getToken() {
        return await SecureStore.getItemAsync('access_token', { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }).then(t => t);
    }
    static async resetToken() {
        await SecureStore.deleteItemAsync('access_token', { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
    }
    static async isAuthentificated() {
        let hasToken = await this.getToken();
        return (hasToken !== null)
    }
    
}