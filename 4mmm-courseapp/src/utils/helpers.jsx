import { AUTH_TOKEN } from "./constants";

// helper fncs for managing the jwt token for the authenticated user.
export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token) => {
    if (token) {
        localStorage.setItem(AUTH_TOKEN, token);
    }
};

export const removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN);
};