import React, { useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { DEFAULT_BEARER } from "@dotenv"
import AuthService from './AuthService';

export default class RequestHelperService {

    /**
     * Save endpoint URL to secure storage
     * 
     * @param {string} endpoint The target endpoint string
     * @returns {string} 
     */
    static async setEndpoint(endpoint) {
        await SecureStore.setItemAsync('endpoint', endpoint, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
        return endpoint;
    }
    /**
     * Returns endpoint URL form secure storage
     * 
     * @returns {string}
     */
    static async getEndpoint() {
        return await SecureStore.getItemAsync('endpoint', { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }).then(t => t);
    }
    /**
     * Removes endpoint URL from secure Storage
     * 
     */
    static async resetEndpoint() {
        await SecureStore.deleteItemAsync('endpoint', { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
    }

    /**
     * Get object for request header data, mehtod and body
     * 
     * @param {string} method HTTP Methods like POST, PUT, DELETE, ...
     * @param {string} body Request body data (as string!)
     * @returns {Object}
     */
    static async getRequestHeaders(method = null, body = null) {
        let requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };
        let token = await AuthService.getToken();

        if (token != null)
            requestOptions.headers.Authorization = 'Bearer ' + token;

        if (method !== null && method != 'GET')
            requestOptions.method = method;

        if (body != null)
            requestOptions.body = body;

        return requestOptions;
    }

    /**
     * Fetch data from URL with target subroute (will be combined with endpoint), method and body
     * 
     * @param {string} route Target subroute string
     * @param {string} method HTTP Methods like POST, PUT, DELETE, ...
     * @param {string} body Request body data (as string!)
     * @returns {Object}
     */
    static async fetch(route = null, method = null, body = null) {
        let target = await this.getEndpoint();
        
        if (route.charAt(0) != '/')
            route = '/'+route;

        return this.fetchExternal(target+route, method, body);
    }

    /**
     * Fetch data from URL with target route (full URL), method and body
     * 
     * @param {string} route Target full route string
     * @param {string} method HTTP Methods like POST, PUT, DELETE, ...
     * @param {string} body Request body data (as string!)
     * @returns 
     */
    static async fetchExternal(route = null, method = null, body = null) {
        if (route == null)
            return Error('No route specified');
        let rqo = await RequestHelperService.getRequestHeaders(method, body);

        return fetch(route, rqo).then(r => {
            if (!r.ok)
                throw new Error(JSON.stringify(r));
            return r.json().then(d => d).catch(e => e);
        })
        .then(r => {
            if (Object.keys(r).length === 0)
                throw new Error("Data error");
            return r;
        });

    }
}