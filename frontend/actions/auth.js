import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { API } from '../config';

export const signup = user => {
    // console.log("user", user, API);
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log("error",err));
};

export const signin = user => {
    // console.log("user", user, API);
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log("error",err));
};

export const signout = (next) => {
    removeCookie('token')
    removeLocalStograge('user')
    next();

    return fetch(`${API}/signout`, {
        method: 'GET'
    })
        .then(response => {
            console.log("signout success");
        })
        .catch(err => console.log(err));
};

export const setCookie = (key, value) => {
    if(process.browser) {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

export const removeCookie = (key) => {
    if(process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = (key) => {
    if(process.browser) {
        return cookie.get(key);
    }
};

export const setLocalStograge = (key, value) => {
    if(process.browser) {
        // console.log("setlocalstorage");
        localStorage.setItem(key, JSON.stringify(value))
    }
};

export const removeLocalStograge = (key) => {
    if(process.browser) {
        localStorage.removeItem(key);
    }
};

export const authenticate = (data, next) => {
    // console.log("authenticate");
    setCookie('token', data.token)
    setLocalStograge('user', data.user)
    next();
};

export const isAuth = () => {
    if(process.browser) {
        const cookieChecked = getCookie('token')
        if(cookieChecked) {
            if(localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};