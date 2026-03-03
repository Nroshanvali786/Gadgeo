// src/services/adminApi.js

// const BASE_URL = "http://localhost:8080/admin";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addProduct = async (productData) => {
  const response = await fetch(`${BASE_URL}/products/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(productData),
  });

  if (!response.ok) throw new Error("Failed to add product");

  return response.json();
};


export const getOverallBusiness = async () => {
  const response = await fetch(`${BASE_URL}/business/overall`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // remove if not using Spring Security session
  });

  if (!response.ok) {
    throw new Error("Failed to fetch business data");
  }

  return response.json();
};

export const getYearlyBusiness = async (year) => {
  const response = await fetch(
    `${BASE_URL}/business/yearly?year=${year}`,
    { method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
      credentials: "include" }
  );

  if (!response.ok) throw new Error("Failed yearly data");
  return response.json();
};

export const getMonthlyBusiness = async (month, year) => {
  const response = await fetch(
    `${BASE_URL}/business/monthly?month=${month}&year=${year}`,
    { method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
      credentials: "include" }
  );

  if (!response.ok) throw new Error("Failed monthly data");
  return response.json();
};
