import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        About
      </h1>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Frontend</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• React 19.0.0</li>
                <li>• React Router DOM 7.6.0</li>
                <li>• Tailwind CSS 4.0.17</li>
                <li>• Vite 6.3.6</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Backend</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Node.js</li>
                <li>• Express.js</li>
                <li>• MongoDB with Mongoose</li>
                <li>• JWT for authentication</li>
                <li>• Multer for file uploads</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About