import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

import NavBar from './components/NavBar'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </div>
  )
}

export default App