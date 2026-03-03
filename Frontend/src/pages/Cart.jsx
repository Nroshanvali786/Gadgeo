import React from 'react'

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${BASE_URL}/api/cart`, {
        credentials: "include"
      });

      const data = await res.json();
      setCartItems(data);

      calculateTotal(data);

    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const calculateTotal = (items) => {
    const totalPrice = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  const increaseQty = async (id, quantity) => {
    await fetch(`http://localhost:8080/api/cart/${id}?quantity=${quantity + 1}`, {
      method: "PUT",
      credentials: "include"
    });

    fetchCart();
  };

  const decreaseQty = async (id, quantity) => {
    if (quantity === 1) return;

    await fetch(`http://localhost:8080/api/cart/${id}?quantity=${quantity - 1}`, {
      method: "PUT",
      credentials: "include"
    });

    fetchCart();
  };

  const removeItem = async (id) => {
    await fetch(`http://localhost:8080/api/cart/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    fetchCart();
  };

  const handlePayment = async () => {
    try {

      // 1️⃣ Create Razorpay Order (backend)
      const orderRes = await fetch(
        "http://localhost:8080/api/payment/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            totalAmount: total,
            cartItems: cartItems.map(item => ({
              productId: item.product.productId,
              quantity: item.quantity,
              price: item.product.price
            }))
          })
        }
      );

      if (!orderRes.ok) {
        alert("Failed to create order");
        return;
      }

      const razorpayOrderId = await orderRes.text();

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: "rzp_test_SJPdSiOp14Lt0F",
        amount: total * 100,
        currency: "INR",
        name: "My Store",
        description: "Order Payment",
        order_id: razorpayOrderId,

        handler: async function (response) {

          // 3️⃣ Verify Payment
          const verifyRes = await fetch(
            "http://localhost:8080/api/payment/verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              })
            }
          );

          if (verifyRes.ok) {
            alert("Payment Successful!");
            navigate("/orders");
          } else {
            alert("Payment verification failed");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="px-8 py-12 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Your Cart</h2>

        <button
          onClick={() => navigate("/orders")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          View Orders
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Cart is empty</p>
      ) : (
        <div className="space-y-6">

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >

              <div className="flex items-center gap-10">
                <img
                  src={
                    item.product.images && item.product.images.length > 0
                      ? `http://localhost:8080${item.product.images[0].imageUrl}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={item.product.name}
                  className="h-50 object-contain"
                />

                <div className='text-2xl'>
                  <h3 className="font-semibold text-lg">
                    {item.product.name}
                  </h3>

                  <p className="text-gray-600">
                    ₹{item.product.price}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item.id, item.quantity)}
                      className="px-3 bg-gray-200 rounded cursor-pointer"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.id, item.quantity)}
                      className="px-3 bg-gray-200 rounded cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">
                  ₹{item.product.price * item.quantity}
                </p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 mt-2 cursor-pointer"
                >
                  Remove
                </button>
              </div>

            </div>
          ))}

          {/* <div className="text-right text-2xl font-bold mt-8">
            Total: ₹{total}
          </div> */}
          <div className="text-right text-2xl font-bold mt-8">
            Total: ₹{total}
          </div>

          <div className="text-right mt-4">
            <button
              onClick={handlePayment}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Pay Now
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
