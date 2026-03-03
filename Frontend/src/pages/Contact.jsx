import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= HERO SECTION ================= */}
      <div className="bg-linear-to-r from-black to-gray-900 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Contact <span className="text-red-500">Gadgeo</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
          We value our customers and are committed to providing the best
          shopping experience. Reach out to us for support, inquiries,
          or partnership opportunities.
        </p>
      </div>

      {/* ================= ABOUT SUPPORT ================= */}
      <div className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Customer Support & Assistance
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8">
              At Gadgeo, customer satisfaction is our top priority.
              Whether you need help with your purchase, product information,
              bulk orders, or business collaboration, our team is here
              to assist you professionally and promptly.
            </p>

            <div className="space-y-6 text-gray-700">

              <div>
                <p className="font-semibold text-lg">📧 Email Support</p>
                <p className="text-gray-600">
                  nroshanvali786@gmail.com
                </p>
                <p className="text-sm text-gray-500">
                  Response time: Within 24 hours
                </p>
              </div>

              <div>
                <p className="font-semibold text-lg">📞 Customer Care</p>
                <p className="text-gray-600">
                  +91 6300838351
                </p>
                <p className="text-sm text-gray-500">
                  Available: Monday – Saturday (9:00 AM – 7:00 PM)
                </p>
              </div>

              <div>
                <p className="font-semibold text-lg">🏢 Corporate Office</p>
                <p className="text-gray-600">
                  Bangalore, Karnataka, India
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE - COMPANY VALUES */}
          <div className="bg-white shadow-2xl rounded-3xl p-10">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Our Commitment
            </h3>

            <ul className="space-y-5 text-gray-600">
              <li>✔ Fast & Reliable Delivery Across India</li>
              <li>✔ 100% Genuine & Quality-Checked Products</li>
              <li>✔ Secure Payment & Data Protection</li>
              <li>✔ Dedicated Customer Service Team</li>
              <li>✔ Seamless Online Shopping Experience</li>
            </ul>
          </div>

        </div>

      </div>

      {/* ================= BUSINESS HOURS SECTION ================= */}
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Business Hours
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div className="shadow-lg rounded-2xl p-6">
              <h4 className="font-semibold text-lg mb-2">
                Customer Support
              </h4>
              <p>Monday – Saturday</p>
              <p>9:00 AM – 7:00 PM</p>
            </div>

            <div className="shadow-lg rounded-2xl p-6">
              <h4 className="font-semibold text-lg mb-2">
                Online Store
              </h4>
              <p>Available 24/7</p>
              <p>Shop Anytime, Anywhere</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER MESSAGE ================= */}
      <div className="bg-black text-white text-center py-12">
        <h3 className="text-2xl font-semibold mb-3">
          Thank You for Choosing Gadgeo
        </h3>
        <p className="text-gray-400 max-w-xl mx-auto">
          We appreciate your trust in our platform. Your satisfaction drives
          us to continuously improve and deliver excellence in every order.
        </p>
      </div>

    </div>
  );
};

export default Contact;