import axios from "axios";
axios.defaults.withCredentials = true
let URL = "http://localhost:5000"
if (import.meta.env.VITE_NODE_ENV == "production") {
    URL = "https://quill-backend-npdr.onrender.com"
} else if (import.meta.env.VITE_NODE_ENV == "dev") {
    URL = "http://localhost:5000"
}

// spaces
export async function getSpaces(data) {
    const response = await axios.post(`${URL}/spaces/access`, data, {
        withCredentials: true
    })
    return response
}

export async function getSpace(name) {
    const response = await axios.get(`${URL}/spaces/${name}`, {
        withCredentials: true
    })
    return response
}

export async function getUserSpacePosts(user) { 
    const response = await axios.get(`${URL}/spaces/posts/userPosts/${user}`, {
        withCredentials: true
    })
    return response.data
}

export async function createSpace(space) {
    const response = await axios.post(`${URL}/spaces`, space, {
        withCredentials: true
    })
    return response
}

export async function createSpacePost(post) {
    const response = await axios.post(`${URL}/spaces/posts`, post)
    return response
}

export async function getSpacePosts() {
    const response = await axios.get(`${URL}/spaces/posts`)
    return response.data
}

export async function getSpacePost(id) {
    const response = await axios.get(`${URL}/spaces/posts/${id}`)
    return response.data
}

export async function deleteSpacePost(id) {
    const response = await axios.delete(`${URL}/spaces/posts/${id}`)
    return response
}

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

export async function getUserPost(user) {
    const response = await axios.get(`${URL}/posts/userPosts/${user}`)
    return response.data
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
    const response = await axios.post(`${URL}/users/login`, user, {
        withCredentials: true
    })
    if (response.data.success) {
        return response.data.token
    } else {
        return
    }
}
export async function checkAuth() {
    try {
        const response = await axios.get(`${URL}/users/check-auth`, {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error("Auth check failed:", error);
        return { success: false }; //Fallback just incase server crashes again
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

        return true;
    } catch (error) {
        console.error('Logout failed:', error);
        return false;
    }
}