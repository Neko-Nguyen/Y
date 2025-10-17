import axios from "axios";
import { storage } from "../helpers/Storage";

export function authHeader() {
    return { 
        headers: { 
            accessToken: localStorage.getItem(storage) 
        } 
    };
};

export function logout() {
    localStorage.removeItem(storage);
    return { 
        username: "", 
        id: 0, 
        status: false 
    };
};

export async function login(api, userData) {
    const response = await axios.post(`${api}/users/login`, userData);
    const data = response.data;

    if (data.error) {
        alert(data.error);
        return { username: "", id: 0, status: false };
    }

    localStorage.setItem(storage, data.token);
    return {
        username: data.username,
        id: data.id,
        status: true
    };
};

export async function getAuth(api) {
    const response = await axios.get(`${api}/users/auth`, authHeader());
    const data = response.data;

    if (data.error) {
        alert(data.error);
        return { username: "", id: 0, status: false };
    }

    return {
        username: data.username,
        id: data.id,
        status: true
    };
}
