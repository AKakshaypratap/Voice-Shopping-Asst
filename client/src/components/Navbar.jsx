import React from 'react';
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold flex gap-2 items-center justify-center"><FaCartShopping /> Voice Shopping Assistant</h1>
            <ul className="flex space-x-4">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/list" className="hover:underline">My List</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;

// git config user.name "AKakshaypratap"
// git config user.email "akshpratap73005@gmail.com"