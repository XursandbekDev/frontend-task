
import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../logout';

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        <div className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-64`}>
            <button
                className="p-4 text-gray-400 hover:text-gray-300 md:hidden"
                onClick={onClose}
            >
                Close
            </button>
            <div className="mt-8">
                <ul>
                    <li className="p-4">
                        <Link to="/add-product" className="hover:text-gray-300">
                            Add Products
                        </Link>
                    </li>
                    <li className="p-4">
                        <Logout />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;

