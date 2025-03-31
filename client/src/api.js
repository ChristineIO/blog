import axios from "axios";

const URL = "http://localhost:5000"

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
