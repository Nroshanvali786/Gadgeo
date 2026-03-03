// src/pages/AdminBusinessDashboard.jsx
import { useEffect, useState } from "react";
import { getOverallBusiness } from "../services/AdminApi";
import { getMonthlyBusiness } from "../services/AdminApi";
import { getYearlyBusiness } from "../services/AdminApi";

export default function AdminBusinessDashboard() {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const [yearlyData, setYearlyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);

  useEffect(() => {
    fetchBusiness();
    // fetchYearly();
    // fetchMonthly();
  }, []);

  const fetchBusiness = async () => {
    try {
      const data = await getOverallBusiness();

      console.log("API Response:", data);   // ✅ log the actual response

      setBusinessData(data);
    } catch (err) {
      console.error("Error:", err);         // also log error
      setError("Failed to load business data");
    } finally {
      setLoading(false);
    }
  };

  const fetchYearly = async () => {
    // const data = await getYearlyBusiness(year);
    // setYearlyData(data);
    try {
      const data = await getYearlyBusiness(year);

      console.log("API Response:", data);   // ✅ log the actual response

      setYearlyData(data);
    } catch (err) {
      console.error("Error:", err);         // also log error
      setError("Failed to load business data");
    } 
  };

  const fetchMonthly = async () => {
    // const data = await getMonthlyBusiness(month, year);
    // setMonthlyData(data);
    try {
      const data = await getMonthlyBusiness(month, year);

      console.log("API Response:", data);   // ✅ log the actual response

      setMonthlyData(data);
    } catch (err) {
      console.error("Error:", err);         // also log error
      setError("Failed to load business data");
    }
  };

  if (loading) {
    return <p className="p-10 text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold mb-6">Business Dashboard</h2>

      {/* Revenue Card */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-xl font-semibold">Total Revenue</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">
          ₹ {businessData?.totalRevenue?.toLocaleString()}
        </p>
      </div>

      {/* Category Sales */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Category Sales</h3>

        {businessData?.categorySales &&
          Object.keys(businessData.categorySales).length > 0 ? (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Units Sold</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(businessData.categorySales).map(
                ([category, quantity]) => (
                  <tr key={category}>
                    <td className="p-2 border">{category}</td>
                    <td className="p-2 border text-center">{quantity}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          <p>No category sales data available.</p>
        )}
      </div>

      {/* Year Selection */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 mt-6">
        <h3 className="text-xl font-semibold mb-4">Yearly Business</h3>

        <div className="flex gap-4 mb-4">
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={fetchYearly}
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Get Yearly Data
          </button>
        </div>

        {yearlyData && (
          <div className="mt-4">
            <p className="text-lg font-bold mb-4">
              ₹ {yearlyData.totalRevenue?.toLocaleString()}
            </p>

            {yearlyData.categorySales &&
              Object.keys(yearlyData.categorySales).length > 0 ? (
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Units Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(yearlyData.categorySales).map(
                    ([category, quantity]) => (
                      <tr key={category}>
                        <td className="p-2 border">{category}</td>
                        <td className="p-2 border text-center">{quantity}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <p>No category sales data available.</p>
            )}
          </div>
        )}
      </div>

      {/* Monthly Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Monthly Business</h3>

        <div className="flex gap-4 mb-4">
          <input
            type="number"
            placeholder="Month (1-12)"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={fetchMonthly}
            className="bg-purple-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Get Monthly Data
          </button>
        </div>

        {monthlyData && (
          <div className="mt-4">
            <p className="text-lg font-bold mb-4">
              ₹ {monthlyData.totalRevenue?.toLocaleString()}
            </p>

            {monthlyData.categorySales &&
              Object.keys(monthlyData.categorySales).length > 0 ? (
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Units Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(monthlyData.categorySales).map(
                    ([category, quantity]) => (
                      <tr key={category}>
                        <td className="p-2 border">{category}</td>
                        <td className="p-2 border text-center">{quantity}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <p>No category sales data available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}