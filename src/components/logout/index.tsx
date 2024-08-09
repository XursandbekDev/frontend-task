import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Tokenni o'chirish
        navigate('/'); // Login sahifasiga yo'naltirish
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
        >
            Chiqish
        </button>
    );
};

export default Logout;
