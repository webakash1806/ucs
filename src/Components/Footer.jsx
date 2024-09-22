import { Link } from 'react-router-dom'; // If you're using React Router
import logo from '../assets/transparentlogo.png'
import {
    BsFacebook,
    BsInstagram,
    BsLinkedin,
    BsWhatsapp
} from 'react-icons/bs'

const Footer = () => {
    return (
        <footer className="relative flex flex-col items-center justify-center overflow-x-hidden">

            <div className="mx-auto w-full sm:px-28 px-4 bg-[#001e3a] pt-8">
                <div className="py-8">
                    <div className="flex flex-wrap items-center justify-around">
                        {/* About Section */}
                        <div className="w-full mb-8 lg:w-1/3 md:w-full xl:mb-0">
                            <div className="text-white">
                                <Link to="/">
                                    <img src={logo} alt="Logo" className="mb-4 w-[10rem] drop-shadow-[0px_0px_1px_#fff]" />
                                </Link>

                                <div>
                                    <ul>
                                        <li className="text-[#e0e4ff] leading-8 text-[0.9rem] hover:text-white">
                                            <a className="flex items-center gap-2" href="tel:6207234759">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 24 24"
                                                    className="text-[1.3rem]"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path>
                                                </svg>
                                                +91 6207234759
                                            </a>
                                        </li>
                                        <li className="text-[#e0e4ff] leading-8 text-[0.9rem] hover:text-white">
                                            <a className="flex items-center gap-2" href="mailto:name@email.com">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 24 24"
                                                    className="text-[1.3rem]"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path>
                                                </svg>
                                                contact@domain.com
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className='flex gap-4 mt-4'>
                                    <a href={''} className='text-[18px]'><BsLinkedin /></a>
                                    <Link to={''} target='_blank' className='text-[18px]'><BsFacebook /></Link>
                                    <Link to={`https://wa.me/${''}?text=Hello`} target='_blank' className='text-[18px]'><BsWhatsapp /></Link>
                                    <Link to={''} target='_blank' className='text-[18px]'><BsInstagram /></Link>
                                    {/* <a href="" className='text-[18px]'><BsTwitter /></a> */}
                                </div>
                            </div>
                        </div>

                        {/* Services Section */}
                        <div className="w-full mb-8 xl:w-1/4 md:w-1/3 md:mb-0">
                            <div className="text-white">
                                <h2 className="text-[1.1rem] font-semibold mb-4">Services</h2>
                                <div className="flex gap-1 mb-4">
                                    <div className="w-[2.5rem] h-[3.5px] bg-white rounded-full"></div>
                                    <div className="w-[1rem] h-[3.5px] bg-white rounded-full"></div>
                                    <div className="w-[3.5px] h-[3.5px] bg-white rounded-full"></div>
                                </div>
                                <ul>
                                    <li className="text-[#e0e4ff] leading-8 text-[0.9rem] hover:text-white">
                                        <Link to="/services/local-car-rentals">Local Car Rentals</Link>
                                    </li>
                                    <li className="text-[#e0e4ff] leading-8 text-[0.9rem] hover:text-white">
                                        <Link to="/services/round-trip">Round trip</Link>
                                    </li>
                                    <li className="text-[#e0e4ff] leading-8 text-[0.9rem] hover:text-white">
                                        <Link to="/services/one-way-cabs">One-way Cabs</Link>
                                    </li>

                                    <li className="text-[#e0e4ff] leading-8 text-[0.9rem] hover:text-white">
                                        <Link to="/services/airport-cabs">Airport Taxi</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Quick Links Section */}
                        <div className="w-full xl:w-1/6 md:w-1/3">
                            <div className="text-white">
                                <h2 className="text-[1.1rem] font-semibold mb-4">Quick Links</h2>
                                <div className="flex gap-1 mb-4">
                                    <div className="w-[2.5rem] h-[3.5px] bg-white rounded-full"></div>
                                    <div className="w-[1rem] h-[3.5px] bg-white rounded-full"></div>
                                    <div className="w-[3.5px] h-[3.5px] bg-white rounded-full"></div>
                                </div>
                                <ul>
                                    <li className="text-[#e0e4ff] leading-8 text-[0.9rem] hover:text-white">
                                        <Link to="/about">About us</Link>
                                    </li>
                                    <li className="text-[#e0e4ff] leading-8 text-[0.9rem] hover:text-white">
                                        <Link to="/contact">Contact us</Link>
                                    </li>
                                    <li className="text-[#e0e4ff] leading-8 text-[0.9rem] hover:text-white">
                                        <Link to="/privacy-policy">Privacy Policy</Link>
                                    </li>
                                    <li className="text-[#e0e4ff] leading-8 text-[0.9rem] hover:text-white">
                                        <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
                                    </li>
                                    <li className="text-[#e0e4ff] leading-8 text-[0.9rem] hover:text-white">
                                        <Link to="/FAQ">FAQs</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}

            </div>
            <div className="flex w-full bg-[#000a12] items-center justify-center gap-1 text-[1rem] py-4 text-[#fff]">

                <span className="text-center text-[0.9rem]">© 2024 UCS All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
