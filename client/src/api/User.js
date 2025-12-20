import axios from "axios";
import { storage } from "../helpers/Storage";

export function authHeader() {
    return { 
        headers: { 
            accessToken: localStorage.getItem(storage) 
        } 
    };
};

export async function signin(api, userData, navigate) {
    await axios.post(`${api}/users`, userData);

    navigate("/home");
    alert("Sign in successful");
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

export async function getBasicInfo(api, id, authState) {
    const response = await axios.get(`${api}/users/basicinfo/${id}`);
    const data = response.data;

    const updatedPosts = data.Posts.map((post) => {
        const isLiked = post.Likes.some((like) => like.UserId === authState.id);
        return { ...post, liked: isLiked };
    });

    return {
        username: data.username,
        joinTime: data.createdAt,
        listOfPosts: updatedPosts
    };
};

export async function getUserByKey(api, key) {
    const response = await axios.get(`${api}/users/search/${key}`);
    return response.data;  
};