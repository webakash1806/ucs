import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // If you're using React Router
import logo from '../assets/logo.jpg';
import call from '../assets/icons/call.gif';
import signup from '../assets/icons/signup.gif';
import login from '../assets/icons/login.gif';
import userProfile from '../assets/icons/userProfile.gif';
import logoutIcon from '../assets/icons/logout.gif';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Slices/authSlice';
import { FaCar, FaRegUser, FaUser } from 'react-icons/fa';
import { toast } from 'sonner';
import { IoIosLogOut } from 'react-icons/io';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, data } = useSelector((state) => state.auth);

    const [profileActive, setProfileActive] = useState(false);
    const profileRef = useRef(null);

    const handleLogout = async () => {
        const res = await dispatch(logout());
        if (res?.payload?.success) {
            // toast.success("Logged out!");
            navigate('/');
        }
        setProfileActive(false); // Close popup after logout
    };

    const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setProfileActive(false);
        }
    };



    useEffect(() => {
        // Add event listener on mount
        document.addEventListener('mousedown', handleClickOutside);

        // Remove event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleProfileClick = () => {
        setProfileActive(false);
    };

    return (
        <header className="w-full z-[1000] bg-white shadow-md sticky top-0">
            <div className="flex items-center relative justify-between px-2 pt-[0.35rem] pb-[0.6rem] mx-auto sm:px-8 md:mx-12 lg:mx-28">
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
                    {
                        isLoggedIn ?
                            <>
                                <button onClick={() => setProfileActive(!profileActive)} className='flex flex-col items-center group'>
                                    <img src={userProfile} className='w-[2.4rem] sm:w-[2.7rem]' alt="" />
                                    <p className='text-[0.85rem] leading-3 group-hover:text-main font-semibold'>
                                        {data?.name?.split(" ")[0]}
                                    </p>
                                </button>
                            </>
                            :
                            <>
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
                            </>
                    }
                </div>
                {(isLoggedIn && profileActive) &&
                    <div
                        ref={profileRef}
                        className='absolute border border-main shadow-[0px_0px_16px] overflow-hidden text-[#222222] z-[100] bg-white top-[4.7rem] right-6 h-fit rounded w-[11rem]'
                    >
                        <Link
                            to={'/profile'}
                            className='flex items-center gap-2 px-3 py-[0.7rem] border cursor-pointer border-b-gray-200 hover:bg-sky-50'
                            onClick={handleProfileClick}
                        >
                            <FaRegUser />
                            <li className='list-none'>Profile</li>
                        </Link>
                        <Link
                            to={`/booking/${data?._id}`}
                            className='flex items-center gap-2 px-3 py-[0.7rem] border cursor-pointer border-b-gray-200 hover:bg-sky-50'
                            onClick={handleProfileClick}
                        >
                            <FaCar />
                            <li className='list-none'>Booking History</li>
                        </Link>
                        <Link
                            onClick={handleLogout}
                            className='flex items-center gap-2 px-3 py-[0.7rem] border cursor-pointer border-b-gray-200 hover:bg-sky-50'
                        >
                            <IoIosLogOut />
                            <li className='list-none'>Logout</li>
                        </Link>
                    </div>
                }
            </div>
        </header>
    );
};

export default Header;
