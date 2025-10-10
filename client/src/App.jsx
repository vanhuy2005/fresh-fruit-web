import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import NavBar from './components/NavBar'

function App() {
  const location = useLocation()
  const hideNavBarRoutes = ['/login']
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname)

  return (
    <div className="min-h-screen bg-gray-50">
      {!shouldHideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App