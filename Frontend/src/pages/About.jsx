import React from 'react'

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Section */}
      <div className="bg-black text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          About <span className="text-red-500">Gadgeo</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Your trusted destination for premium gadgets, electronics,
          and accessories at unbeatable prices.
        </p>
      </div>

      {/* Our Story */}
      <div className="max-w-6xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Gadgeo was created with a simple mission — to make the latest
            technology accessible to everyone. We specialize in smartphones,
            laptops, and high-quality accessories.
          </p>
          <p className="text-gray-700">
            We carefully select products to ensure quality, performance,
            and reliability for our customers.
          </p>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="Technology"
            className="rounded-2xl shadow-lg"
          />
        </div>

      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-6 shadow-lg rounded-xl">
              <h3 className="text-xl font-semibold mb-3">🚀 Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable shipping across India.
              </p>
            </div>

            <div className="p-6 shadow-lg rounded-xl">
              <h3 className="text-xl font-semibold mb-3">💰 Best Prices</h3>
              <p className="text-gray-600">
                Competitive pricing with premium quality.
              </p>
            </div>

            <div className="p-6 shadow-lg rounded-xl">
              <h3 className="text-xl font-semibold mb-3">🔒 Secure Shopping</h3>
              <p className="text-gray-600">
                Safe payments and trusted transactions.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="bg-red-500 text-white text-center py-12">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Explore?
        </h2>
        <p className="mb-6">
          Discover the latest gadgets and accessories now.
        </p>
        <a
          href="/products"
          className="bg-white text-red-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Shop Now
        </a>
      </div>

    </div>
  );
};

export default About;