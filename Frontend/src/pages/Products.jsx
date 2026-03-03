import React, { useEffect, useState } from "react";

const categories = [
  "All",
  "mobiles",
  "Laptops",
  "Mobile Accessories",
  "Laptop Accessories",
  "Audio Accessories",
  "Gaming Accessories",
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = async (category) => {
    try {
      let url = `${BASE_URL}/api/products`;

      if (category !== "All") {
        url += `?category=${encodeURIComponent(category)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        setProducts(data.products || data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/cart/add/${productId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        alert("Please login first");
      } else {
        alert("Added to cart");
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <div className="px-8 py-12 bg-gray-100 min-h-screen">

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full cursor-pointer font-semibold transition 
              ${selectedCategory === cat
                ? "bg-black text-white"
                : "bg-white text-black border"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.productId}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col"
          >

            {/* Product Image */}
            <img
              src={
                product.images?.[0]
                  ? `${BASE_URL}${product.images[0]}`
                  : "/no-image.png"
              }
              alt={product.name}
              className="h-32 md:h-40 w-full object-contain mb-3"
            />

            <h3 className="text-sm font-semibold line-clamp-2">
              {product.name}
            </h3>

            <p className="text-gray-500 text-xs line-clamp-2 mb-2">
              {product.description}
            </p>

            <div className="mt-auto flex flex-col gap-2">
              <span className="text-sm font-bold text-red-500">
                ₹{product.price}
              </span>

              <button
                onClick={() => addToCart(product.productId)}
                className="bg-black text-white text-xs py-2 rounded-md hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Products;
