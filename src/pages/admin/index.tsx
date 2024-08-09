import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/sidebar';
import Logout from '../../components/logout';
import { CiMenuBurger } from "react-icons/ci";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
type Product = {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
    category: string;
};

const Admin: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            fetchUserInfo();
            fetchProducts();
        }
    }, [navigate]);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/users/1');
            const userData = response.data;
            setUsername(userData.username); 
        } catch (err) {
            console.error('Error fetching user info:', err);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/products');
            setProducts(response.data);
        } catch (err) {
            console.error('product qoshishda hatolik:', err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            alert('Product ochirildi!');
            fetchProducts(); 
        } catch (err) {
            console.error(' product ochirishda hatolik! :', err);
        }
    };

    const handleUpdate = async (product: Product) => {
        try {
            await axios.put(`http://localhost:3000/products/${product.id}`, product);
            alert('Produt yangilandi');
            fetchProducts(); 
        } catch (err) {
            console.error('Error updating product:', err);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : ''}`}>
                <header className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
                    <button
                        className="text-white md:hidden"
                        onClick={toggleSidebar}
                    >
                        <CiMenuBurger size={24} />
                    </button>
                    <div className="flex items-center space-x-4">
                        <p className="text-lg">Welcome {username}</p>
                        <Logout />
                    </div>
                </header>
                <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">Product List</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border-b">Nomi</th>
                                    <th className="py-2 px-4 border-b">Narxi</th>
                                    <th className="py-2 px-4 border-b">Description</th>
                                    <th className="py-2 px-4 border-b">Kategoriya</th>
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b">
                                        <td className="py-2 px-4">{product.name}</td>
                                        <td className="py-2 px-4">{product.price} so'm </td>
                                        <td className="py-2 px-4">{product.description}</td>
                                        <td className="py-2 px-4">{product.category}</td>
                                        <td className="py-2 px-4">
                                            <button
                                                onClick={() => setSelectedProduct(product)}
                                                className=" text-black px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                                            >
                                                <CiEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className=" text-black px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                <RiDeleteBin6Fill />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedProduct && (
                        <div className="mt-8 p-4 bg-white border border-gray-300 rounded-lg">
                            <h3 className="text-xl font-bold mb-4"> product yangilash </h3>
                            <input
                                value={selectedProduct.name}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                                placeholder="Nomi"
                            />
                            <input
                                type="number"
                                value={selectedProduct.price}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, price: +e.target.value })}
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                                placeholder="Narxi"
                            />
                            <input
                                value={selectedProduct.description}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                                placeholder="Description"
                            />
                            <input
                                value={selectedProduct.image}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e.target.value })}
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                                placeholder="Image URL"
                            />
                            <input
                                value={selectedProduct.category}
                                onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                                placeholder="Kategoriya"
                            />
                            <button
                                onClick={() => {
                                    if (selectedProduct) {
                                        handleUpdate(selectedProduct);
                                    }
                                }}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                Yangilash
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Admin;
