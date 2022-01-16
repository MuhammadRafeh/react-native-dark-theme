import { parse } from "expo-linking";
import AuthService from './AuthService';
import RequestHelperService from "./RequestHelperService";
import UserService from "./UserService";

export default class ProvisioningService {

    /**
     * Parse URI segments for request
     * 
     * @param {string} url Full URI string to provisioning endpoint 
     * @returns 
     */
    static parseUrlData(url) {
        let u = parse(url);
        if (u.hostname == null || u.queryParams.qr == null)
            return;

        return [u.scheme + '://' + u.hostname + '/' + u.path?.slice(0, u.path?.length - 1), u.queryParams.qr];
    }

    /**
     * Get and store access_token and endpoint URL for the QR Code
     * 
     * @param {string} url Full URI string to provisioning endpoint 
     * @returns 
     */
    static async fetchToken(url) {
        let [target, qr] = this.parseUrlData(url);

        if (target == null || qr == null)
            return;

        return await RequestHelperService.fetchExternal(target, 'POST', JSON.stringify({ qr: qr, scope: 'rppa' }))
            .then(async (t) => {
                await AuthService.setToken(t.access_token);
                await RequestHelperService.setEndpoint(t.endpoint);
                await UserService.getUserData();
                return t
            })
            .catch(e => { throw e });
    }
}
