import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

function Home() {
  const handleClick = () => {
    toast.success('Welcome to the collaborative project!')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Collaborative Project
      </h1>
      <div className="text-center">
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Test Toast
        </button>
        <Link
          to="/about"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          About
        </Link>
      </div>
    </div>
  )
}

export default Home