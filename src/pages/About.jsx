import { useAppContext } from '../context/AppContext'

function About() {
  const { user } = useAppContext()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 text-gray-800 font-outfit">
            About GreenCart
          </h1>
          <p className="text-xl text-gray-600 font-source-serif max-w-2xl mx-auto">
            Your trusted partner for fresh, organic fruits and vegetables.
          </p>
        </div>

        {user && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-12 text-center">
            <p className="text-lg text-green-700 font-medium">
              Hello {user.name}! Thanks for being part of the GreenCart family.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 font-outfit">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4 font-source-serif">
              At GreenCart, we believe everyone deserves access to fresh, healthy produce. 
              We work directly with local farmers to bring you the finest fruits and vegetables.
            </p>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 font-outfit">Why Choose Us?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Farm Fresh Quality</h3>
                  <p className="text-gray-600 text-sm">Fresh produce delivered daily</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Organic & Sustainable</h3>
                  <p className="text-gray-600 text-sm">Eco-friendly farming methods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About