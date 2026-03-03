import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-lg font-semibold">
                    © {new Date().getFullYear()} GadeoStore. All Rights Reserved.
                </p>

                <div className="flex justify-center gap-6 mt-4 text-sm">
                    <a href="/about" className="hover:text-gray-400">Privacy Policy</a>
                    <a href="/about" className="hover:text-gray-400">Terms</a>
                    <a href="/contact" className="hover:text-gray-400">Contact</a>
                </div>


                <div className="flex flex-col items-center justify-center py-10 space-y-6">

                    {/* Logo */}
                    <Link to={'/'}>
                        <h1 className="text-3xl font-bold text-white">
                            <span className="text-red-500 font-serif">G</span>adgeo
                        </h1>
                    </Link>

                    {/* Language & Country Buttons */}
                    <div className="flex gap-4">

                        <button className="border border-gray-600 px-6 py-2 rounded-md hover:border-gray-400 transition">
                            🌐 English
                        </button>

                        <button className="border border-gray-600 px-6 py-2 rounded-md hover:border-gray-400 transition">
                            🇮🇳 India
                        </button>

                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer