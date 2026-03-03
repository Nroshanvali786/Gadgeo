import React from 'react'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [products, setProducts] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [mobileAcc, setMobileAcc] = useState([]);
  const [laptopAcc, setLaptopAcc] = useState([]);
  const [audioAcc, setAudioAcc] = useState([]);
  const [gamingAcc, setGamingAcc] = useState([]);

  const role = localStorage.getItem("role");
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const addToCart = async (productId) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/cart/add/${productId}`,
        {
          method: "POST",
          credentials: "include"
        }
      );

      if (!res.ok) {
        alert("Please login first");
      } else {
        alert("Added to cart");
        window.dispatchEvent(new Event("cartUpdated"));
      }

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    const fetchProducts = async () => {
      try {

        const mobileRes = await fetch(`${BASE_URL}/api/products?category=mobiles`);
        const mobileData = await mobileRes.json();
        if (mobileRes.ok) {
          setProducts(mobileData.products.slice(0, 8));
        }

        const laptopRes = await fetch(`${BASE_URL}/api/products?category=Laptops`);
        const laptopData = await laptopRes.json();
        if (laptopRes.ok) {
          setLaptops(laptopData.products.slice(0, 6));
        }

        const mobileAccRes = await fetch(`${BASE_URL}/api/products?category=Mobile%20Accessories`);
        const mobileAccData = await mobileAccRes.json();
        if (mobileAccRes.ok) {
          setMobileAcc(mobileAccData.products.slice(0, 3));
        }

        const laptopAccRes = await fetch(`${BASE_URL}/api/products?category=Laptop%20Accessories`);
        const laptopAccData = await laptopAccRes.json();
        if (laptopAccRes.ok) {
          setLaptopAcc(laptopAccData.products.slice(0, 3));
        }

        const audioRes = await fetch(`${BASE_URL}/api/products?category=Audio%20Accessories`);
        const audioData = await audioRes.json();
        if (audioRes.ok) {
          setAudioAcc(audioData.products.slice(0, 4));
        }

        const gamingRes = await fetch(`${BASE_URL}/api/products?category=Gaming%20Accessories`);
        const gamingData = await gamingRes.json();
        if (gamingRes.ok) {
          setGamingAcc(gamingData.products.slice(0, 3));
        }

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

  }, []);




  return (
    <div className="px-8 py-12 bg-gray-100 md-20">
      {role === "ADMIN" && (
        <div className="flex flex-col items-center justify-center mt-10 text-center">

          {/* Greeting */}
          <h2 className="text-2xl font-semibold mb-4">
            Hey Admin 👋
          </h2>

          {/* Toggle Button */}
          {!showAdminPanel ? (
            <button
              onClick={() => setShowAdminPanel(true)}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mb-10 cursor-pointer"
            >
              Go to Admin Functionalities
            </button>
          ) : (
            <div className="flex gap-4 mt-4 mb-10">
              <Link
                to="/admin/add-product"
                className="bg-black text-white px-4 py-2 rounded cursor-pointer"
              >
                Add Product
              </Link>

              <Link
                to="/admin/dashboard"
                className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
              >
                Business Dashboard
              </Link>
            </div>
          )}
        </div>
      )}

      {role === "VENDOR" && (
        <div className="flex flex-col items-center justify-center mt-10 text-center">

          {/* Greeting */}
          <h2 className="text-2xl font-semibold mb-4">
            Hey Vendor 👋
          </h2>

          {/* Toggle Button */}
          {!showAdminPanel ? (
            <button
              onClick={() => setShowAdminPanel(true)}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mb-10 cursor-pointer"
            >
              Go to Vendor Functionalities
            </button>
          ) : (
            <div className="flex gap-4 mt-4 mb-10">
              <Link
                to="/admin/add-product"
                className="bg-black text-white px-4 py-2 rounded cursor-pointer"
              >
                Sell Product
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="w-full center mb-12">

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="h-112.5 [&_.swiper-pagination-bullet]:bg-white 
             [&_.swiper-pagination-bullet-active]:bg-white"
        >

          {/* Slide 1 */}
          {products.slice(0, 1).map((product) => (
            <SwiperSlide key={product.productId}>
              <div className="h-full bg-linear-to-r from-gray-600 via-slate-500 to-gray-600 flex items-center justify-between px-10 md:px-20 shadow-2xl rounded-xl">

                {/* Text Section */}
                <div className="text-white max-w-lg">
                  <p className="uppercase text-sm tracking-wider mb-2">
                    Buy it here
                  </p>

                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    The New <br /> iPhone 16 pro
                  </h2>

                  <p className="text-sm md:text-base mb-6 opacity-90">
                    The latest iPhone is now available with powerful camera
                    and amazing color options.
                  </p>
                  <Link to={'/products'}>
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition cursor-pointer">
                      Shop Now
                    </button>
                  </Link>
                </div>

                {/* Image Section */}
                <div className="hidden md:flex items-center justify-center w-1/2">
                  <img
                    src={`http://localhost:8080${product.images?.[0]}`}
                    alt="Phone"
                    className="max-h-100 object-contain drop-shadow-2xl "
                  />
                </div>

              </div>
            </SwiperSlide>
          ))}

          {/* Slide 2 */}
          {laptops.slice(1, 2).map((product) => (
            <SwiperSlide>
              <div className="h-full bg-linear-to-r from-gray-600 via-slate-500 to-gray-600 flex items-center justify-between px-10 md:px-20 shadow-2xl rounded-xl">

                <div className="text-white max-w-lg">
                  <p className="uppercase text-sm tracking-wider mb-2">
                    Buy it here
                  </p>

                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    The New <br /> MacBook pro 14
                  </h2>

                  <p className="mb-6">
                    Upgrade your productivity with high performance laptops.
                  </p>

                  <Link to={'/products'}>
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition cursor-pointer">
                      Explore Now
                    </button>
                  </Link>
                </div>

                <div className="hidden md:block">
                  <img
                    src={`http://localhost:8080${product.images?.[0]}`}
                    alt="Laptop"
                    className="h-87.5 object-contain -translate-x-20"
                  />
                </div>

              </div>
            </SwiperSlide>
          ))}

          {audioAcc.slice(0, 1).map((product) => (
            <SwiperSlide key={product.productId}>
              <div className="h-full bg-linear-to-r from-gray-600 via-slate-500 to-gray-600 flex items-center justify-between px-10 md:px-20 shadow-2xl rounded-xl">

                {/* Text Section */}
                <div className="text-white max-w-lg">
                  <p className="uppercase text-sm tracking-wider mb-2">
                    Buy it here
                  </p>

                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    The New <br /> Boat Rockerz 450
                  </h2>

                  <p className="text-sm md:text-base mb-6 opacity-90">
                    The latest Headset is now available with powerful Audio Quality
                    and amazing color options.
                  </p>

                  <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition cursor-pointer">
                    Shop Now
                  </button>
                </div>

                {/* Image Section */}
                <div className="hidden md:flex items-center justify-center w-1/2">
                  <img
                    src={`http://localhost:8080${product.images?.[0]}`}
                    alt="Phone"
                    className="max-h-100 object-contain drop-shadow-2xl "
                  />
                </div>

              </div>
            </SwiperSlide>
          ))}

        </Swiper>

      </div>

      <div className="text-center mb-12">
        <h2 className="px-6 text-3xl font-bold text-gray-800">
          Popular Products
        </h2>
      </div>




      <div className="flex items-center justify-center mb-12">
        <div className="flex-1 h-px bg-gray-300"></div>

        <span className="inline-block px-6 py-2 text-white bg-black rounded-full text-lg font-semibold shadow-lg">
          Mobiles
        </span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>


      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        navigation
        loop={products.length > 4}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}


      >
        {products.map((product) => (
          <SwiperSlide key={product.productId}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4">

              <img
                src={`http://localhost:8080${product.images?.[0]}`}
                alt={product.name}
                className="h-48 w-full object-contain mb-4"
              />

              <h3 className="text-lg font-semibold mb-2">
                {product.name}
              </h3>

              <p className="text-gray-600 text-sm mb-3">
                {product.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-red-500">
                  ₹{product.price}
                </span>

                <button
                  onClick={() => addToCart(product.productId)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>

            </div>
          </SwiperSlide>
        ))}

      </Swiper>

      <div className="flex items-center justify-center mb-12 mt-16">
        <div className="flex-1 h-px bg-gray-300"></div>

        <span className="inline-block px-6 py-2 text-white bg-black rounded-full text-lg font-semibold shadow-lg">
          Laptops
        </span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        navigation
        loop={laptops.length}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {laptops.map((laptops) => (
          <SwiperSlide key={laptops.productId}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4">

              <img
                src={`http://localhost:8080${laptops.images?.[0]}`}
                alt={laptops.name}
                className="h-48 w-full object-contain mb-4"
              />

              <h3 className="text-lg font-semibold mb-2">
                {laptops.name}
              </h3>

              <p className="text-gray-600 text-sm mb-3">
                {laptops.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-red-500">
                  ₹{laptops.price}
                </span>

                <button
                  onClick={() => addToCart(product.productId)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-center mb-12 mt-16">
        <div className="flex-1 h-px bg-gray-300"></div>

        <span className="inline-block px-6 py-2 text-white bg-black rounded-full text-lg font-semibold shadow-lg">
          Accessories
        </span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        navigation
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {mobileAcc.map((mobileAc) => (
          <SwiperSlide key={mobileAc.productId}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4">

              <img
                src={`http://localhost:8080${mobileAc.images?.[0]}`}
                alt={mobileAc.name}
                className="h-48 w-full object-contain mb-4"
              />

              <h3 className="text-lg font-semibold mb-2">
                {mobileAc.name}
              </h3>

              <p className="text-gray-600 text-sm mb-3">
                {mobileAc.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-red-500">
                  ₹{mobileAc.price}
                </span>

                <button
                  onClick={() => addToCart(product.productId)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>

            </div>
          </SwiperSlide>
        ))}

        {laptopAcc.map((laptopAcc) => (
          <SwiperSlide key={laptopAcc.productId}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4">

              <img
                src={`http://localhost:8080${laptopAcc.images?.[0]}`}
                alt={laptopAcc.name}
                className="h-48 w-full object-contain mb-4"
              />

              <h3 className="text-lg font-semibold mb-2">
                {laptopAcc.name}
              </h3>

              <p className="text-gray-600 text-sm mb-3">
                {laptopAcc.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-red-500">
                  ₹{laptopAcc.price}
                </span>

                <button
                  onClick={() => addToCart(product.productId)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>

            </div>
          </SwiperSlide>
        ))}

        {audioAcc.map((audioAcc) => (
          <SwiperSlide key={audioAcc.productId}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4">

              <img
                src={`http://localhost:8080${audioAcc.images?.[0]}`}
                alt={audioAcc.name}
                className="h-48 w-full object-contain mb-4"
              />

              <h3 className="text-lg font-semibold mb-2">
                {audioAcc.name}
              </h3>

              <p className="text-gray-600 text-sm mb-3">
                {audioAcc.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-red-500">
                  ₹{audioAcc.price}
                </span>

                <button
                  onClick={() => addToCart(product.productId)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>

            </div>
          </SwiperSlide>
        ))}

        {gamingAcc.map((gamingAcc) => (
          <SwiperSlide key={gamingAcc.productId}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4">

              <img
                src={`http://localhost:8080${gamingAcc.images?.[0]}`}
                alt={gamingAcc.name}
                className="h-48 w-full object-contain mb-4"
              />

              <h3 className="text-lg font-semibold mb-2">
                {gamingAcc.name}
              </h3>

              <p className="text-gray-600 text-sm mb-3">
                {gamingAcc.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-red-500">
                  ₹{gamingAcc.price}
                </span>

                <button
                  onClick={() => addToCart(product.productId)}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center mt-20 mb-10">
        <Link
          to="/products"
          className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
        >
          See All Products
        </Link>
      </div>




    </div>



  );
};

export default Home;
