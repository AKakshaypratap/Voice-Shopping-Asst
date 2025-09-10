import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import startListening from '../helper/listening.utils';
import { FaTrash } from "react-icons/fa";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { toast } from 'react-toastify';

const List = () => {
    const [list, setList] = useState([]);
    const [listening, setListening] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    console.log(import.meta.env.VITE_BACKEND_URL);

    const fetchList = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/list`);
            setList(response.data.items);
            toast.success(`Loaded ${response.data.items.length} items from your list`);
        } catch (error) {
            console.error('Error fetching list:', error);
            toast.error('Failed to load your shopping list');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchList();
    }, []);

    const handleVoiceClick = () => {
        startListening(setListening, navigate, fetchList);
    };

    const handleDeleteItem = async (itemId, itemName) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete/${itemId}`);
            // Update the list immediately without page refresh
            setList(prevList => prevList.filter(item => item._id !== itemId));
            toast.success(`${itemName} deleted successfully!`);
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error(`Failed to delete ${itemName}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2"> <FaCartShopping /> Shopping List</h1>
                            <p className="text-gray-600">Manage your shopping items with voice commands</p>
                        </div>
                        <button
                            onClick={handleVoiceClick}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${listening
                                ? "bg-red-500 text-white animate-pulse"
                                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                                }`}
                        >
                            {listening ? "Listening..." : <FaMicrophoneAlt />}
                        </button>
                    </div>
                </div>

                {/* List Content */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : list?.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4"><LuNotebookPen /></div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your list is empty</h3>
                            <p className="text-gray-500 mb-4">Add items using voice commands or start shopping!</p>
                            <button
                                onClick={handleVoiceClick}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Add First Item
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Items ({list.length})
                                </h2>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                    Click <FaTrash /> to remove items
                                </div>
                            </div>

                            <div className="grid gap-3">
                                {list?.map((item, index) => (
                                    <div
                                        key={item._id}
                                        className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 text-lg capitalize">
                                                        {item.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                            Qty: {item.quantity}
                                                        </span>
                                                        {item.price > 0 && (
                                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                                ${item.price}
                                                            </span>
                                                        )}
                                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <FaTrash
                                                onClick={() => handleDeleteItem(item._id, item.name)}
                                                title={`Delete ${item.name}`}
                                                className='text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 transform hover:scale-110'
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default List