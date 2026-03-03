import { MapPin } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaCaretDown } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from "lucide-react";

const Navbar = ({ user, setUser, location, getLocation, openDropDown, setOpenDropDown }) => {

    // const [user, setUser] = useState("")
    const [showLogout, setShowLogout] = useState(false)
    const [cartCount, setCartCount] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate()


    const toggleDropDown = () => {
        setOpenDropDown(!openDropDown)
    }

    const closeDropDown = () => {
        setOpenDropDown(false)
    }

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:8080/api/logout", {
                method: "POST",
                credentials: "include"
            });

            setUser(null);
            setCartCount(0);
            navigate("/signIn");

        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    const fetchCartCount = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/cart", {
                credentials: "include"
            });

            if (!res.ok) {
                setCartCount(0);
                return;
            }

            const data = await res.json();

            const totalQty = data.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

            setCartCount(totalQty);

        } catch (err) {
            console.error(err);
            setCartCount(0);
        }
    };

    useEffect(() => {
        fetchCartCount();

        const handleCartUpdate = () => {
            fetchCartCount();
        };

        window.addEventListener("cartUpdated", handleCartUpdate);

        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, []);

    return (
        <div className='bg-white py-3 shadow-2xl'>
            <div className='max-w-6xl mx-auto flex justify-between items-center px-4'>

                {/* Logo */}
                <Link to='/'>
                    <h1 className='font-bold text-3xl'>
                        <span className='text-red-500 font-serif'>G</span>adgeo
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <nav className='hidden md:flex gap-7 items-center'>

                    <ul className='flex gap-7 items-center text-xl font-semibold'>
                        <NavLink to='/'><li>Home</li></NavLink>
                        <NavLink to='/products'><li>Products</li></NavLink>
                        <NavLink to='/about'><li>About</li></NavLink>
                        <NavLink to='/contact'><li>Contact</li></NavLink>
                    </ul>

                    {/* Cart */}
                    <Link to='/cart' className='relative'>
                        <IoCartOutline className='h-7 w-7' />
                        <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white text-xs'>
                            {cartCount}
                        </span>
                    </Link>

                    {/* Login Section */}
                    <div className='relative'>
                        {user ? (
                            <div
                                className='flex items-center gap-2 cursor-pointer'
                                onClick={() => setShowLogout(!showLogout)}
                            >
                                <div className='w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold'>
                                    {user?.email?.[0]?.toUpperCase()}
                                </div>

                                <span className='font-semibold text-green-600'>
                                    Signed In
                                </span>

                                {showLogout && (
                                    <div className='absolute top-12 right-0 bg-white shadow-xl border rounded-md p-3'>
                                        <button
                                            onClick={handleLogout}
                                            className='text-red-500 hover:text-red-700'
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to='/signIn'>
                                <button className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700'>
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </div>

                </nav>

                {/* Mobile Menu Button */}
                <button
                    className='md:hidden'
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div className='md:hidden flex flex-col gap-5 px-6 py-4 bg-white shadow-lg text-lg font-semibold'>

                    <NavLink to='/' onClick={() => setMobileOpen(false)}>Home</NavLink>
                    <NavLink to='/products' onClick={() => setMobileOpen(false)}>Products</NavLink>
                    <NavLink to='/about' onClick={() => setMobileOpen(false)}>About</NavLink>
                    <NavLink to='/contact' onClick={() => setMobileOpen(false)}>Contact</NavLink>

                    <Link to='/cart' onClick={() => setMobileOpen(false)}>
                        Cart ({cartCount})
                    </Link>

                    {user ? (
                        <button
                            onClick={() => {
                                handleLogout();
                                setMobileOpen(false);
                            }}
                            className='text-red-500'
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to='/signIn' onClick={() => setMobileOpen(false)}>
                            Sign In
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default Navbar
