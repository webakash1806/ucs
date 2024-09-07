import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import logo from '../assets/logo.jpg'
import { IoLogInOutline } from "react-icons/io5";
import { FaUser } from 'react-icons/fa';
import { MdAddCall } from 'react-icons/md';
const Header = () => {
    return (
        <header className="w-full bg-white shadow-md">
            <div className=" flex items-center justify-between py-2 px-4 sm:px-8 mx-auto md:mx-12 lg:mx-28">
                {/* Logo */}
                <div>
                    <Link to="/">
                        <img
                            alt="UCS"
                            src={logo}

                            className="sm:w-[7.8rem] w-[7.5rem] h-auto"
                        />
                    </Link>
                </div>

                {/* Contact Us */}
                <div className='hidden sm:block hover:cursor-pointer'>
                    <div className="bg-main shadow-md hover:scale-105 transition-all duration-300 hover:shadow-[0px_0px_5px_-3px_#808080] flex items-center justify-center gap-3 p-2 rounded-full px-6 text-white">
                        <div>
                            <MdAddCall className='text-[1.2rem]' />
                        </div>
                        <Link to={''}>
                            9520801801
                        </Link>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center sm:space-x-6 space-x-4">
                    <div className='sm:hidden block'>
                        <Link to={''} className='flex group items-center flex-col mr-1'>
                            <div className='border w-fit p-[0.4rem] rounded-full border-main text-main transition-all duration-300 group-hover:bg-main group-hover:text-white'>
                                <MdAddCall className='text-[1.2rem]' />
                            </div>
                            <p className='text-[0.85rem] group-hover:text-main font-semibold'>
                                Call us
                            </p>
                        </Link>
                    </div>
                    <Link to={''} className='flex group items-center flex-col'>
                        <div className='border w-fit p-[0.35rem] rounded-full border-main text-main transition-all duration-300 group-hover:bg-main group-hover:text-white'>
                            <IoLogInOutline className='text-[1.3rem]' />
                        </div>
                        <p className='text-[0.85rem] group-hover:text-main font-semibold'>
                            Login
                        </p>
                    </Link>
                    <Link to={''} className='flex group items-center flex-col'>
                        <div className='border w-fit p-[0.49rem] rounded-full border-main text-main transition-all duration-300 group-hover:bg-main group-hover:text-white'>
                            <FaUser className='text-[1.05rem]' />
                        </div>
                        <p className='text-[0.85rem] group-hover:text-main font-semibold'>
                            Sign up
                        </p>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
