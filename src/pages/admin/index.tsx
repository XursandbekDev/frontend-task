import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Sidebar from '../../components/Sidebar';
// import Logout from '../../components/Logout';
import { CiMenuBurger } from "react-icons/ci";

const Admin: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            fetchUserInfo();
        }
    }, [navigate]);

    const fetchUserInfo = async () => {
        try {
            // Replace with your API endpoint
            const response = await axios.get('https://fakestoreapi.com/users/1');
            const userData = response.data;
            setUsername(userData.username); // Adjust based on API response structure
        } catch (err) {
            console.error('Xatolik!', err);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className={`flex-1 p-6 transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : ''}`}>
                <header className="flex justify-between items-center p-4 bg-gray-200">
                    <button
                        className="text-gray-700 md:hidden"
                        onClick={toggleSidebar}
                    >
                        <CiMenuBurger />
                    </button>
                    <div className="flex items-center space-x-4">
                        <span className="hidden md:block">Welcome, {username}</span>
                        <Logout />
                    </div>
                </header>
                <main>
                    {/* Admin content here */}
                </main>
            </div>
        </div>
    );
};

export default Admin;

// import React from 'react';

// const Admin: React.FC = () => {
//   // Dark mode switching function
//   const toggleDarkMode = (mode: 'dark' | 'light') => {
//     if (mode === 'dark') {
//       document.body.classList.add('dark');
//     } else {
//       document.body.classList.remove('dark');
//     }
//   };

//   // Function to open the sidebar
//   const openNav = () => {
//     // Logic for opening the sidebar can go here
//   };

//   return (
//     <div className="bg-white dark:bg-[#0F172A]">
//       <div className="fixed w-full z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10">
//         <div className="logo ml-12 dark:text-white transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
//           NERVE
//         </div>
//         {/* SPACER */}
//         <div className="grow h-full flex items-center justify-center"></div>
//         <div className="flex-none h-full text-center flex items-center justify-center">
//           <div className="flex space-x-3 items-center px-3">
//             <div className="flex-none flex justify-center">
//               <div className="w-8 h-8 flex">
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
//                   alt="profile"
//                   className="shadow rounded-full object-cover"
//                 />
//               </div>
//             </div>
//             <div className="hidden md:block text-sm md:text-md text-black dark:text-white"></div>
//           </div>
//         </div>
//       </div>

//       <aside className="w-60 -translate-x-48 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B]">
//         {/* Open sidebar button */}
//         <div className="max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B] absolute top-2 rounded-full h-12">
//           <div className="flex pl-4 items-center space-x-2">
//             <div
//               onClick={() => toggleDarkMode('dark')}
//               className="moon text-white hover:text-blue-500 dark:hover:text-[#38BDF8]"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
//               </svg>
//             </div>
//             <div
//               onClick={() => toggleDarkMode('light')}
//               className="sun hidden text-white hover:text-blue-500 dark:hover:text-[#38BDF8]"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
//               </svg>
//             </div>
//           </div>
//           <div className="text-white hover:text-blue-500 dark:hover:text-[#38BDF8]">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
//             </svg>
//           </div>
//         </div>

//         <div
//           onClick={openNav}
//           className="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
//           </svg>
//         </div>

//         {/* MAX SIDEBAR */}
//         <div className="max hidden text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]">
//           <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 6h18m-7 12h4m-8 0h4m-8 0H4m0 0h4m-4 0h4m-4 0H4m16-6h4m-4 0h-4m4 0h-4" />
//             </svg>
//             <div className="text-sm">Products</div>
//           </div>
//           <div className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 7h16M4 7v10m16-10v10m0 0h-16m16 0H4" />
//             </svg>
//             <div className="text-sm">Orders</div>
//           </div>
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default Admin;
