export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return res.json().then(err => {
        err.code = res.status;
        return Promise.reject(err);
    });
}

export const register = (email, password) => {
    console.log(email, password);
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse);
};

export const authorize = (email, password) => {
    console.log(email, password);
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse);
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(checkResponse);
};