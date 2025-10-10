import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

function About() {
  const { user } = useAppContext()

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '100+', label: 'Premium Products' },
    { number: '24/7', label: 'Customer Support' },
    { number: '5★', label: 'Average Rating' }
  ]

  const values = [
    {
      emoji: '🍎',
      title: 'Premium Quality',
      description: 'Every fruit is hand-picked and inspected to ensure you receive only the best quality produce',
      gradient: 'from-red-50 to-pink-50'
    },
    {
      emoji: '🚚',
      title: 'Fast Delivery',
      description: 'Fresh from farm to your table within 24 hours, maintaining maximum freshness and nutrition',
      gradient: 'from-blue-50 to-cyan-50'
    },
    {
      emoji: '🌱',
      title: 'Sustainable',
      description: 'Supporting eco-friendly farming practices and reducing our environmental footprint',
      gradient: 'from-green-50 to-emerald-50'
    },
    {
      emoji: '💚',
      title: 'Customer First',
      description: 'Your satisfaction is our priority—we\'re here to make your fruit shopping experience delightful',
      gradient: 'from-emerald-50 to-teal-50'
    },
    {
      emoji: '🌏',
      title: 'Wide Selection',
      description: 'From local Vietnamese fruits to exotic imports, discover a world of flavors in one place',
      gradient: 'from-violet-50 to-purple-50'
    },
    {
      emoji: '✨',
      title: 'Always Fresh',
      description: 'We guarantee freshness with daily deliveries and a commitment to quality you can taste',
      gradient: 'from-yellow-50 to-orange-50'
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-20 px-6 md:px-16 lg:px-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-200/30 to-emerald-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-200/30 to-green-300/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Bringing Nature's Best
              <br />
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                To Your Doorstep
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              More than just a fruit store—we're your partner in living a healthier, 
              happier life through fresh, premium quality fruits
            </p>
          </div>

          {/* Welcome Message */}
          {user && (
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-6 mb-8 text-center shadow-lg max-w-2xl mx-auto">
              <p className="text-lg text-gray-700">
                👋 Welcome back, <span className="font-bold text-green-600">{user.name}</span>! 
                <br />
                <span className="text-sm text-gray-600">Thank you for being part of our family</span>
              </p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-shadow duration-300 border border-green-100">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded with a simple belief: <span className="font-semibold text-gray-800">everyone deserves access to fresh, 
                  delicious fruits</span>. What started as a small passion project has blossomed into a thriving 
                  online marketplace serving thousands of satisfied customers.
                </p>
                <p>
                  We work directly with trusted farmers and suppliers across Vietnam and around the world, 
                  ensuring every piece of fruit meets our rigorous quality standards. From the lush orchards 
                  of the Mekong Delta to exotic farms abroad, we bring you <span className="font-semibold text-gray-800">nature's 
                  finest selections</span>.
                </p>
                <p>
                  Our mission goes beyond selling fruits. We're building a community of health-conscious 
                  individuals who believe in the power of fresh, nutritious food. Every order supports 
                  sustainable farming practices and helps create a healthier future for all.
                </p>
              </div>

              {/* Call to Action */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  Shop Now
                </button>
                <button className="bg-white border-2 border-gray-200 hover:border-green-500 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-md">
                  Learn More
                </button>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 aspect-square flex items-center justify-center">
                  <img src={assets.fresh_fruits_image} alt="Fresh Fruits" className="w-full h-full object-contain" />
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-6 aspect-square flex items-center justify-center">
                  <img src={assets.orange_image} alt="Orange" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-6 aspect-square flex items-center justify-center">
                  <img src={assets.apple_image} alt="Apple" className="w-full h-full object-contain" />
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl p-6 aspect-square flex items-center justify-center">
                  <img src={assets.grapes_image_1} alt="Grapes" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 px-6 md:px-16 lg:px-24 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering excellence in every aspect of our service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-br ${value.gradient} p-6 flex items-center justify-center`}>
                  <div className="text-6xl">{value.emoji}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-6 md:px-16 lg:px-24 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-lg md:text-xl leading-relaxed opacity-95 mb-8">
            To revolutionize the way people experience fresh fruits by making premium quality 
            accessible to everyone while championing sustainable farming practices and supporting 
            local communities. Together, we're building a healthier, happier world—one fruit at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span>Sustainable Practices</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤝</span>
              <span>Supporting Farmers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💪</span>
              <span>Healthier Communities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial/Trust Section */}
      <div className="py-16 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Join our growing community of satisfied customers who've made the switch to fresher, healthier living
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The freshest fruits I've ever ordered online! Delivery is always on time and the quality is unmatched.",
                author: "Nguyễn Thu Hà",
                location: "Hà Nội"
              },
              {
                quote: "Amazing selection of both local and imported fruits. Customer service is excellent and very responsive.",
                author: "Trần Minh Khôi",
                location: "TP. Hồ Chí Minh"
              },
              {
                quote: "Love that they support sustainable farming! The fruits taste better knowing they're ethically sourced.",
                author: "Lê Phương Anh",
                location: "Đà Nẵng"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-2xl p-6 border border-gray-100">
                <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                <p className="text-gray-700 italic mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="font-semibold text-gray-800">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About