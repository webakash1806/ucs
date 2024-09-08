import React, { useEffect } from 'react';
import { FaTaxi, FaTruck, FaShieldAlt, FaCoins, FaCar, FaRoad } from 'react-icons/fa';
import carImg from '../assets/carRed.png';
import { MdCleanHands, MdOutlineTimer, MdPayment, MdSupportAgent } from 'react-icons/md';
import { BiSolidLike } from 'react-icons/bi';
import best from '../assets/icons/best.gif';
import budgetTrip from '../assets/icons/budgetTrip.gif';
import safePayment from '../assets/icons/safePayments.gif';
import safety from '../assets/icons/safety.gif';
import wellCar from '../assets/icons/wellCar.gif';
import timer from '../assets/icons/timer.gif';
import support from '../assets/icons/support.gif';
import { AiOutlineSafety } from 'react-icons/ai';
import { RiCustomerService2Fill } from 'react-icons/ri';


const WhyChoose = () => {
    const icons = [best, budgetTrip, safety, safePayment, wellCar, timer, support];

    let translateValue = '8'
    if (window.matchMedia('(min-width: 640px)').matches) {
        translateValue = '12';
    }



    return (
        <div className="relative flex py-10 pb-36 flex-col justify-center items-center w-full gap-4 overflow-hidden">
            <h1 className='text-main font-semibold text-[1.8rem] mb-4'>Why Choose Us?</h1>
            <div className='flex flex-col items-center justify-center lg:flex-row'>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <div data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1200" data-aos-delay="0" className="relative w-[18rem] flex items-center gap-2  lg:py-[0.6rem]  p-3 py-[0.3rem] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg shadow-2xl border-l-4 border-blue-300">
                        <AiOutlineSafety />
                        <h2 className="text-[1.05rem] tracking-wide">Secured and Safe Rides</h2>
                        <span className="absolute bottom-0 right-4 w-5 h-5 bg-white rounded-full opacity-20"></span>
                        <span className="absolute bottom-1 right-8 w-3 h-3 bg-white rounded-full opacity-20"></span>
                    </div>

                    <div data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1200" data-aos-delay="300" className="relative w-[18rem] flex items-center gap-2  lg:py-[0.6rem]  p-3 py-[0.3rem] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg shadow-2xl border-l-4 border-blue-300">
                        <RiCustomerService2Fill />
                        <h2 className="text-[1.05rem] tracking-wide">24/7 Customer Support</h2>
                        <span className="absolute bottom-0 right-4 w-5 h-5 bg-white rounded-full opacity-20"></span>
                        <span className="absolute bottom-1 right-8 w-3 h-3 bg-white rounded-full opacity-20"></span>
                    </div>

                    <div data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1200" data-aos-delay="600" className="relative w-[18rem] flex items-center gap-2  lg:py-[0.6rem]  p-3 py-[0.3rem] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg shadow-2xl border-l-4 border-blue-300">
                        <MdCleanHands />
                        <h2 className="text-[1.05rem] tracking-wide">Sanitized and Clean</h2>
                        <span className="absolute bottom-0 right-4 w-5 h-5 bg-white rounded-full opacity-20"></span>
                        <span className="absolute bottom-1 right-8 w-3 h-3 bg-white rounded-full opacity-20"></span>
                    </div>

                    <div data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1200" data-aos-delay="900" className="relative w-[18rem] flex items-center gap-2  lg:py-[0.6rem]  p-3 py-[0.3rem] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg shadow-2xl border-l-4 border-blue-300">
                        <MdOutlineTimer />
                        <h2 className="text-[1.05rem] tracking-wide">On Time Punctuality</h2>
                        <span className="absolute bottom-0 right-4 w-5 h-5 bg-white rounded-full opacity-20"></span>
                        <span className="absolute bottom-1 right-8 w-3 h-3 bg-white rounded-full opacity-20"></span>
                    </div>
                </div>

                <div className="relative h-[25rem] w-[32rem] flex items-center justify-center sm:my-16">
                    {/* Rotating circle with icons */}
                    <div className="absolute sm:size-[24.5rem] size-[16.5rem] rounded-full animate-spin-slow border-2 border-main transition-all z-[10] duration-[5000] flex items-center justify-center">
                        {icons.map((Icon, index) => (
                            <div key={index} className={`absolute bg-white shadow-[0px_0px_12px_-6px_#000] rounded-full p-2 sm:p-3 text-white `} style={{
                                transform: `rotate(${index * (360 / icons.length)}deg) translate(${translateValue}rem)`,
                            }}


                            >
                                <div className="flex items-center justify-center" style={{
                                    transform: `rotate(${-(index * (360 / icons.length))}deg)`, // Reset icon rotation
                                }}>
                                    <img src={Icon} className="w-[2.5rem] sm:w-[3.2rem]  animate-spin-reverse" ></img>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Car Image */}
                    <img src={carImg} className='w-[10.5rem]  sm:w-[13rem] object-cover' alt="Car" />
                </div>
                <div className='flex flex-col gap-4 lg:gap-6'>
                    <div data-aos="fade-left" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1200" data-aos-delay="0" className="relative w-[18rem] flex items-center gap-2  lg:py-[0.6rem]  p-3 py-[0.3rem] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg shadow-2xl border-r-4 border-blue-300">
                        <FaCar />
                        <h2 className="text-[1.05rem] tracking-wide">Variety of Cars</h2>
                        <span className="absolute bottom-0 right-4 w-5 h-5 bg-white rounded-full opacity-20"></span>
                        <span className="absolute bottom-1 right-8 w-3 h-3 bg-white rounded-full opacity-20"></span>
                    </div>

                    <div data-aos="fade-left" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1200" data-aos-delay="300" className="relative w-[18rem] flex items-center gap-2  lg:py-[0.6rem]  p-3 py-[0.3rem] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg shadow-2xl border-r-4 border-blue-300">
                        <FaCoins />
                        <h2 className="text-[1.05rem] tracking-wide">Best in Affordable Price</h2>
                        <span className="absolute bottom-0 right-4 w-5 h-5 bg-white rounded-full opacity-20"></span>
                        <span className="absolute bottom-1 right-8 w-3 h-3 bg-white rounded-full opacity-20"></span>
                    </div>

                    <div data-aos="fade-left" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1200" data-aos-delay="600" className="relative w-[18rem] flex items-center gap-2  lg:py-[0.6rem]  p-3 py-[0.3rem] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg shadow-2xl border-r-4 border-blue-300">
                        <FaRoad />
                        <h2 className="text-[1.05rem] tracking-wide">Road Trip Expert</h2>
                        <span className="absolute bottom-0 right-4 w-5 h-5 bg-white rounded-full opacity-20"></span>
                        <span className="absolute bottom-1 right-8 w-3 h-3 bg-white rounded-full opacity-20"></span>
                    </div>

                    <div data-aos="fade-left" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1200" data-aos-delay="900" className="relative w-[18rem] flex items-center gap-2  lg:py-[0.6rem]  p-3 py-[0.3rem] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg shadow-2xl border-r-4 border-blue-300">
                        <MdPayment />
                        <h2 className="text-[1.05rem] tracking-wide">Hassle free payment mode</h2>
                        <span className="absolute bottom-0 right-4 w-5 h-5 bg-white rounded-full opacity-20"></span>
                        <span className="absolute bottom-1 right-8 w-3 h-3 bg-white rounded-full opacity-20"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChoose;
