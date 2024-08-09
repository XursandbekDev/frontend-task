import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
        else if (!token) {
            navigate("/")
        }
    }, [navigate]);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // API dan foydalanuvchi ma'lumotlarini olish
            const response = await axios.get('https://fakestoreapi.com/users/1');
            const AdminData = response.data;

            // Email va parolni tekshirish
            if (email === AdminData.email && password === AdminData.password) {
                localStorage.setItem('token', 'fake-admin-token'); // tokenni saqlash
                navigate('/dashboard'); // Admin paneliga yo'naltirish
                setError('');
            } else {
                setError('Noto‘g‘ri email yoki parol!');
            }
        } catch (err) {
            console.error('Login xatosi', err);
            setError('Xato yuz berdi. Iltimos, qayta urinib ko‘ring.');
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <div
                        className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                        style={{ backgroundImage: "url('https://img.lovepik.com/element/45009/2348.png_860.png')" }}
                    ></div>
                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center"> Xush Kelibsiz!</h3>
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Email kiriting"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                    Parolni kiriting
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="******************"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                />

                                {error && <p className="text-xs italic text-red-500">{error}</p>}
                            </div>
                            <div className="mb-6 text-center">
                                <button
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Kirish
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
