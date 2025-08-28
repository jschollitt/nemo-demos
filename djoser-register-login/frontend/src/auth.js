import api from "./api";

/**
 * Request new user from backend, return success as boolean
 * @param {string} username 
 * @param {string} password 
 * @param {string} repassword 
 * @param {string} email 
 * @returns {boolean}
 */
export const register = async (username, password, repassword, email) => {
    const res = await api.post("auth/users/", { 
        username: username, 
        password: password, 
        re_password: repassword, 
        email: email 
    });

    return res.status == 201;
}

/**
 * Login to backend
 * @param {string} username 
 * @param {string} password 
 * @returns response data
 */
export const login = async (username, password) => {
    const res = await api.post("auth/jwt/create/", { username, password });
    const { access, refresh } = res.data;

    // save the tokens given by backend to local storage
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    // add access token to headers for authorised backend interaction
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    return res.data;
};

/**
 * Request details of currently authorized user (logged in)
 * @returns response data
 */
export const getCurrentUser = async () => {
    const res = await api.get("/auth/users/me");
    return res.data;
};