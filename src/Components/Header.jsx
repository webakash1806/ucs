import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import logo from '../assets/logo.jpg'
import call from '../assets/icons/call.gif';
import signup from '../assets/icons/signup.gif';
import login from '../assets/icons/login.gif';


const Header = () => {
    return (
        <header className="w-full bg-white shadow-md">
            <div className="flex items-center justify-between px-2 pt-[0.35rem] pb-[0.6rem] mx-auto sm:px-8 md:mx-12 lg:mx-28">
                {/* Logo */}
                <div>
                    <Link to="/">
                        <img
                            alt="UCS"
                            src={logo}

                            className="sm:w-[7.8rem] w-[7.2rem] h-auto"
                        />
                    </Link>
                </div>

                {/* Contact Us */}
                <div className='hidden sm:block hover:cursor-pointer'>
                    <div className="bg-main shadow-md pl-1 hover:scale-105 transition-all duration-300 hover:shadow-[0px_0px_5px_-3px_#808080] flex items-center justify-center gap-3 p-1 rounded-full px-4 text-white">
                        <img src={call} className='w-[2.3rem] rounded-full' alt="" />
                        <Link to={''} className='text-[1.2rem]'>
                            9520801801
                        </Link>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-3 sm:space-x-6">
                    <div className='block sm:hidden'>
                        <Link to={''} className='flex flex-col items-center mr-1 group'>
                            <img src={call} className='w-[2.4rem] sm:w-[2.7rem]' alt="" />

                            <p className='text-[0.85rem] leading-3 group-hover:text-main font-semibold'>
                                Call us
                            </p>
                        </Link>
                    </div>
                    <Link to={'/login'} className='flex flex-col items-center group'>
                        <img src={login} className='w-[2.4rem] sm:w-[2.7rem]' alt="" />

                        <p className='text-[0.85rem] leading-3 group-hover:text-main font-semibold'>
                            Login
                        </p>
                    </Link>
                    <Link to={'/register'} className='flex flex-col items-center group'>
                        <img src={signup} className='w-[2.4rem] sm:w-[2.7rem]' alt="" />
                        <p className='text-[0.85rem] leading-3 group-hover:text-main font-semibold'>
                            Sign up
                        </p>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
