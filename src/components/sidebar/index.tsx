import React from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed top-0 left-0 w-64 h-full  bg-gray-800 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-64 md:h-full`}>
            <button
                className="p-4 text-white md:hidden"
                onClick={onClose}
            >
                X
            </button>
            <h1 className='text-white font-bold ml-5 text-xl mt-5 ' >Admin sahifa</h1>
            <ul className="mt-16">
                <li className="border-b border-gray-700">
                    <Link to="/add-product" className="block p-4 hover:bg-gray-700">
                        Mahsulot qo'shish
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
