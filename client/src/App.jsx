import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import SignupPage from './pages/Signup'
import LoginPage from './pages/LoginPage'
import { getPosts, getPost, createPost, updatePost, deletePost } from './api'

import './App.css'
import axios from "axios"
import CreatePost from './pages/CreatePost'
import Posts from './pages/Posts'
import Post from './components/Post'
import OnePost from './pages/OnePost'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function loadAllPosts() {
      let data = await getPost('67eab6ef9b3a443f947afb5a')
      if (data) {
        setPosts(data)
      } else {
        console.error('Data not available!')
      }
    } loadAllPosts()
  }, [])

  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/posts/:id' element={<OnePost />} />
      </Routes>
    </Router>
  )
}

export default App
