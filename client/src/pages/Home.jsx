import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import startListening from '../helper/listening.utils';
import { FaSearch } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";
import { MdHearing } from "react-icons/md";

const Home = () => {
    const [listening, setListening] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleVoiceClick = () => {
        startListening(setListening, navigate);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to search results or handle search
            console.log('Searching for:', searchQuery);
        }
    };

    const addToCart = async (product) => {
        try {
            // Extract price from the product string (e.g., "₹65/litre" -> 65)
            const priceMatch = product.price.match(/\d+/);
            const price = priceMatch ? parseInt(priceMatch[0]) : 0;
            
            const itemData = {
                name: product.name,
                category: product.category,
                quantity: 1,
                price: price
            };

            const response = await axios.post("http://localhost:5000/add", itemData);
            
            if (response.data.success) {
                toast.success(`${product.name} added to your shopping list!`);
                navigate("/list");
            } else {
                toast.error('Failed to add item to cart');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            toast.error(`Failed to add ${product.name} to cart`);
        }
    };

    const suggestedProducts = [
        { name: "Fresh Milk", category: "Dairy", price: "₹65/litre", image: "/milk.jpeg" },
        { name: "Whole Wheat Bread", category: "Bakery", price: "₹50", image: "/bread.jpeg" },
        { name: "Organic Apples", category: "Produce", price: "₹80/kg", image: "/apple.png" },
        { name: "Basmati Rice", category: "Grains", price: "₹200/kg", image: "/rice.jpeg" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Voice Shopping Assistant
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find your favorite products with voice commands or traditional search
                    </p>
                </div>

                {/* Search Section */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for products, brands, or categories..."
                                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200"
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                    <FaSearch className="w-6 h-6 text-gray-400" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                onClick={handleSearch}
                                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <FaSearch className="w-5 h-5" />
                                Search
                            </button>
                        </form>

                        {/* Voice Search Button */}
                        <div className="mt-6 text-center">
                            <button
                                onClick={handleVoiceClick}
                                className="inline-flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl"
                            >
                                {/* Icon/text changes based on listening state */}
                                {listening ? (
                                    <>
                                        <MdHearing className="w-6 h-6 animate-pulse" />
                                        <span>Listening...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaMicrophone className="w-6 h-6" />
                                        <span>Add Product</span>
                                    </>
                                )}
                            </button>
                            {listening && (
                                <p className="mt-3 text-sm text-gray-600">
                                    Speak clearly into your microphone
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Suggested Products Section */}
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Popular Products</h2>
                        <p className="text-gray-600">Quick access to your most searched items</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {suggestedProducts.map((product, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                            >
                                <div className="p-6 flex flex-col h-full">
                                    <div className="text-center mb-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200"
                                        />
                                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                                        <p className="text-xl font-bold text-blue-600">{product.price}</p>
                                    </div>

                                    <button 
                                        onClick={() => addToCart(product)}
                                        className="mt-auto w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="max-w-4xl mx-auto mt-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <button 
                                onClick={() => navigate("/list")}
                                className="flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-200 group"
                            >
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200"><FaCartShopping /></div>
                                <h4 className="font-semibold text-gray-800 mb-1">View Cart</h4>
                                <p className="text-sm text-gray-600 text-center">Check your selected items</p>
                            </button>
                            <button 
                                onClick={() => navigate("/list")}
                                className="flex flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all duration-200 group"
                            >
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200"><FaList /></div>
                                <h4 className="font-semibold text-gray-800 mb-1">Shopping Lists</h4>
                                <p className="text-sm text-gray-600 text-center">Manage your saved lists</p>
                            </button>
                            <button className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group">
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200"><FaStar /></div>
                                <h4 className="font-semibold text-gray-800 mb-1">Favorites</h4>
                                <p className="text-sm text-gray-600 text-center">Your saved products</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home