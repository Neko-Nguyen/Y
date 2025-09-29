import axios from "axios";
import { storage } from "../helpers/Storage";

export function authHeader() {
    return { headers: { accessToken: localStorage.getItem(storage) } };
};

export function logout(setAuthState) {
    localStorage.removeItem(storage);
    setAuthState({ username: "", id: 0, status: false });
};

export function login(api, data, setAuthState, navigate) {
    axios
        .post(`${api}/users/login`, data)
        .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                localStorage.setItem(storage, response.data.token);
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true
                });
                navigate("/home");
            }
        });
};

export function getAuth(api, setAuthState, setLoading) {
    axios
        .get(`${api}/users/auth`, authHeader())
        .then((response) => {
            if (response.data.error) {
                setAuthState({ username: "", id: 0, status: false });
            } else {
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true
                });
            }
        })
        .finally(() => {
            setLoading(false);
        });
}
