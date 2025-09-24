import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

function Home() {
  const { user, loading } = useAppContext()
  
  const handleClick = () => {
    toast.success('Welcome to the collaborative project!')
  }

  const handleContextTest = () => {
    toast.success(`AppContext is working! User: ${user ? user.name : 'Not logged in'}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 font-outfit">
        Fresh Fruit Web
      </h1>
      <p className="text-center text-lg mb-8 font-source-serif text-gray-600">
        A modern collaborative project with React & Context API
      </p>
      <div className="text-center space-x-4">
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-outfit"
        >
          Test Toast
        </button>
        <button
          onClick={handleContextTest}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded font-outfit"
        >
          Test Context
        </button>
        <Link
          to="/about"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded font-outfit inline-block"
        >
          About
        </Link>
      </div>
    </div>
  )
}

export default Home