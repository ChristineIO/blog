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
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:5000/posts/67eae9a209be5e23d8031e1b')
      if (response.status === 200) {
        setData(response.data)
      } else {
        console.error('Error fetching data:', response.statusText)
      }
      
} fetchData()
  }, [])

  return (
  <Router>
    <Routes>
      <Route index element={JSON.stringify(data)} />
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
