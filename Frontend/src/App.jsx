import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import axios from 'axios'
import Footer from './components/Footer'
import AdminAddProduct from './pages/AdminAddProduct'
import AdminBusinessDashboard from './pages/AdminBussinessDashboard'

const App = () => {
  const [location, setLocation] = useState();
  const [user, setUser] = useState(null)
  const [openDropDown, setOpenDropDown] = useState(false)
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords
      console.log(latitude, longitude);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`

      try {
        // const location = await axios.get(url)
        const location = await axios.get(url, {
          withCredentials: false
        })
        // console.log(location);
        const exactLocation = location.data.address
        console.log(exactLocation);

        setLocation(exactLocation);
        setOpenDropDown(false)

      } catch (error) {
        console.log(error);
      }


    })
  }
  useEffect(() => {
    getLocation()
  }, [])

  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    fetch(`${BASE_URL}/api/me`, {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        // console.log("User data:", data); 
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);
  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} location={location} getLocation={getLocation} openDropDown={openDropDown} setOpenDropDown={setOpenDropDown} />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/signIn' element={<SignIn setUser={setUser} />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/dashboard" element={<AdminBusinessDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}


export default App
