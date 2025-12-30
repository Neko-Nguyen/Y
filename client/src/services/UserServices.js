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
        id: 0,
        username: "", 
        avatar: "",
        status: false 
    };
};

export async function login(api, userData) {
    const response = await axios.post(`${api}/users/login`, userData);
    const data = response.data;

    if (data.error) {
        alert(data.error);
        return { 
            id: 0,
            username: "", 
            avatar: "", 
            status: false 
        };
    }

    localStorage.setItem(storage, data.token);
    return {
        id: data.id,
        username: data.username,
        avatar: "",
        status: true
    };
};

export async function getAuth(api) {
    const response = await axios.get(`${api}/users/auth`, authHeader());
    const data = response.data;

    if (data.error) {
        alert(data.error);
        return { 
            id: 0, 
            username: "", 
            avatar: "",
            status: false 
        };
    }

    return {
        id: data.id,
        username: data.username,
        avatar: "",
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
        avatar: data.avatar,
        bio: data.bio,
        joinTime: data.createdAt,
        listOfPosts: updatedPosts
    };
};

export async function getUserByKey(api, key) {
    const response = await axios.get(`${api}/users/search/${key}`);
    return response.data;  
};

export async function getUsername(api, id) {
    const response = await axios.get(`${api}/users/basicinfo/${id}`);
    if (response.data === null) return "";
    return response.data.username;
};

export async function updateBasicInfo(api, id, data, navigate) {
    await axios.patch(`${api}/users/basicinfo/${id}`, data, {
        headers: {
            accessToken: localStorage.getItem(storage),
            'Content-Type': 'multipart/form-data'
        }
    });
    navigate(`/profile/${id}`);
};