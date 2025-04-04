import axios from "axios";
axios.defaults.withCredentials = true
const URL = "http://localhost:5000"

// posts

export async function getPosts() {
    const response = await axios.get(`${URL}/posts`)
    if (response.status == 200) {
        return response.data
    } else {
        return
    }
}

export async function getPost(id) {
    const response = await axios.get(`${URL}/posts/${id}`)
    if (response.status == 200) {
        return response.data
    } else {
        return
    }
}

export async function createPost(post) {
    const response = await axios.post(`${URL}/create-post`, post)
    return response

}

export async function updatePost(id, post) {
    const response = await axios.post(`${URL}/posts/${id}`, post)
    return response
}

export async function deletePost(id) {
    const response = await axios.delete(`${URL}/posts/${id}`)
    return response
}

// USERS *********************************************************

export async function getUsers() {
    const response = await axios.get(`${URL}/users`)
    if (response.status == 200) {
        return response.data
    } else {
        return
    }
}

export async function getUser(id) {
    const response = await axios.get(`${URL}/users/${id}`)
    if (response.status == 200) {
        return response.data
    } else {
        return
    }
}

export async function createUser(user) {
    const response = await axios.post(`${URL}/users`, user)
    return response
}

export async function updateUser(id, user) {
    const response = await axios.post(`${URL}/users/${id}`, user)
    return response
}
export async function verifyUser(user) {
    const response = await axios.post(`${URL}/users/login`, user)
    if (response.data.success) {
        return response.data.token
    } else {
        return
    }
}
export async function checkAuth() {
    try {
        const response = await fetch(`${URL}/users/check-auth`, {
            credentials: 'include'
        });

        return response
    } catch (error) {
        console.error(`the error: ${error.message}`);
        return null;
    }
}
export async function logoutUser() {
    try {
        const response = await axios.post(
            `${URL}/users/logout`,
            {}, // Don't send anything
            {
                // needed for cookie-based auth to check for stuff
                withCredentials: true
            }
        );

        // should reload page
        window.location.reload();
        return true;
    } catch (error) {
        console.error('Logout failed:', error);
        return false;
    }
}