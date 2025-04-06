import { BrowserRouter as Router, Route, Routes, createCookieSessionStorage } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import SignupPage from './pages/Signup'
import LoginPage from './pages/LoginPage'
import { getCookie } from 'react-use-cookie'

import './App.css'
import axios from "axios"
import CreatePost from './pages/CreatePost'
import Posts from './pages/Posts'
import Post from './components/Post'
import OnePost from './pages/OnePost'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoutes from './utils/ProtectedRoutes'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
        <Route path='/posts' element={<Posts />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/posts/:id' element={<OnePost />} />
      </Routes>
    </Router>
  )
}

export default App
