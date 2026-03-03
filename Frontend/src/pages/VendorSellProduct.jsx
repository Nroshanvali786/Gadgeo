
import { useState } from "react";
import { addProduct } from "../services/AdminApi";

export default function AdminAddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        categoryId: Number(formData.categoryId),
      });
      alert("Product Added Successfully ✅");
    } catch (error) {
      alert("Error adding product ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "description", "price", "stock", "categoryId", "imageUrl"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          ))}

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}