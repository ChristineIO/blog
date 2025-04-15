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
import NotFound from './pages/NotFound'
import LoginSpace from './pages/LoginSpace'
<<<<<<< HEAD
import SpacePage from './pages/SpacePage'
=======
>>>>>>> c20b9a3d8af957dc566e5b6b383dcf922289d29b

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
          <Route path='/create-post' element={<CreatePost />} />
        </Route>
        <Route path='/posts' element={<Posts />} />
        <Route path='/spaces' element={<LoginSpace />} />
<<<<<<< HEAD
        <Route path='/spaces/:name' element={<SpacePage />} />
=======
>>>>>>> c20b9a3d8af957dc566e5b6b383dcf922289d29b
        <Route path='/posts/:id' element={<OnePost />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
