import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function Home() {
  const { user } = useAppContext()
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-800 font-outfit">
          GreenCart
        </h1>
        <p className="text-xl mb-8 font-source-serif text-gray-600 max-w-2xl mx-auto">
          Fresh fruits and groceries delivered to your doorstep
        </p>
        
        {user && (
          <p className="text-lg mb-6 text-green-600 font-medium">
            Hello, {user.name}! Welcome back.
          </p>
        )}
        
        <div className="space-x-4">
          <Link
            to="/about"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg font-outfit inline-block transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
      
      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Modern Design</h3>
          <p className="text-gray-600">Clean and responsive interface built with Tailwind CSS</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">React Powered</h3>
          <p className="text-gray-600">Built with React 19 and modern development practices</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Context API</h3>
          <p className="text-gray-600">State management with React Context for seamless data flow</p>
        </div>
      </div>
    </div>
  )
}

export default Home