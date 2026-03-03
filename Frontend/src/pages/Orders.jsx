import React, { useEffect, useState } from "react";

const Orders = () => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    fetch(`${BASE_URL}/api/orders`, {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        console.log("Orders API:", data);
        setUserData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">Loading Orders...</h2>
      </div>
    );
  }

  if (!userData || !userData.products || userData.products.length === 0) {
    return (
      <div className="px-6 md:px-12 py-10 bg-gray-100 min-h-screen flex justify-center items-center">
        <h2 className="text-xl text-gray-600">No orders found.</h2>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-10 bg-gray-100 min-h-screen">

      <h2 className="text-3xl font-bold text-center mb-10">
        My Orders
      </h2>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        <div className="mb-6">
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Role:</strong> {userData.role}</p>
        </div>

        <div className="space-y-6">
          {userData.products.map((item, index) => (
            <div key={index} className="border-b pb-4">

              <div className="flex items-center gap-6">

                <img
                  src={`http://localhost:8080${item.image_url}`}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>

                  <p className="text-sm mt-2">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-sm">
                    Price per unit: ₹{item.price_per_unit}
                  </p>

                  <p className="font-bold mt-1">
                    Total: ₹{item.total_price}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Order ID: {item.order_id}
                  </p>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Orders;
