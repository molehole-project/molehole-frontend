import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import UserPage from './pages/UserPage'
import PostDetailPage from './pages/PostDetailPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/post-detail" element={<PostDetailPage />}/>
        <Route path="/user" element={<UserPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
