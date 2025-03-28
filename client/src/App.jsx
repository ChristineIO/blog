import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import SignupPage from './pages/Signup'
import LoginPage from './pages/LoginPage'

import './App.css'
import axios from "axios"
import CreatePost from './pages/CreatePost'
import Posts from './pages/Posts'

function App() {
  const [array, setArray] = useState([])

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000")
    setArray(response.data.animals)
    console.log(response.data.animals)
  }

  useEffect(() => {
    fetchData()
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
      </Routes>
    </Router>
  )
}

export default App
