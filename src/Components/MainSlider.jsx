import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade'; // Import the fade effect styles
import car1 from '../assets/car1.jpg';
import car2 from '../assets/car2.jpg';
import car3 from '../assets/car3.jpg';

import { GoArrowSwitch } from 'react-icons/go';
import { FaCalendar, FaCircleNotch, FaRegCalendarAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineAccessTime } from 'react-icons/md';

const MainSlider = () => {
    const slides = [
        {
            id: 1,
            title: 'Experience the Best Local Car Rentals',
            description: 'Reliable and affordable car rentals for all your travel needs.',
            image: car1,
        },
        {
            id: 2,
            title: 'Outstation Taxi at Your Service',
            description: 'Travel with comfort and convenience with our outstation taxi service.',
            image: car2,
        },
        {
            id: 3,
            title: 'Corporate Car Rental Solutions',
            description: 'Tailored rental solutions for your business trips and events.',
            image: car3,
        },
    ];

    const [active, setActive] = useState(1)
    const [outstationActive, setOutstationActive] = useState(1.1)
    const [airportActive, setAirportActive] = useState(3.1)
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());


    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="relative w-full min-h-[40rem] flex flex-col md:flex-row-reverse items-center justify-center">
            {/* Form Section */}
            <div className='absolute gap-4 flex-col md:flex-row-reverse md:justify-around z-10 w-full h-[38rem]  flex items-center justify-center'>
                <div className="relative min-w-[17rem] md:pr-4 w-full max-w-[30rem] md:max-w-[35rem] h-auto flex items-center justify-center">
                    <Swiper
                        modules={[Autoplay, Pagination, EffectFade]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        speed={2000}
                        effect="fade" // Use fade effect for smooth blending
                        fadeEffect={{ crossFade: true }}
                        loop={true}
                        className="w-full h-full"
                    >
                        {slides.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div className="flex flex-col pt-10 justify-center items-center lg:items-start lg:text-start text-center min-w-[17rem] md:pr-4 max-w-[30rem] md:max-w-[35rem] w-full">
                                    <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                                        {slide.title}
                                    </h1>
                                    <p className="mb-6 text-lg text-gray-200 md:text-xl">
                                        {slide.description}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


                <div className=" min-w-[19.5rem] sm:min-w-[23rem] w-full md:w-fit md:min-w-[19.5rem] lg:min-w-[24rem] mb-8 max-w-[25rem] p-4 h-fit">

                    <div className="grid rounded-md overflow-hidden backdrop-blur-sm bg-[#00000033] text-[0.9rem] grid-cols-3 font-semibold">
                        <button
                            onClick={() => setActive(1)}
                            className={`py-[0.3rem] px-2 border-[0.3px] border-gray-400 rounded-l-md border-r-none transition-all duration-300 ease-in-out transform ${active === 1 ? 'bg-main text-white shadow-lg' : 'bg-transparent text-white hover:bg-[#f0f4f8] hover:text-main scale-100'
                                }`}
                        >
                            Outstation
                        </button>

                        <button
                            onClick={() => setActive(2)}
                            className={`py-[0.3rem] px-2 border-[0.3px] border-gray-400 transition-all duration-300 ease-in-out transform ${active === 2 ? 'bg-main text-white shadow-lg' : 'bg-transparent text-white hover:bg-[#f0f4f8] scale-100 hover:text-main'
                                }`}
                        >
                            Local Trip
                        </button>

                        <button
                            onClick={() => setActive(3)}
                            className={`py-[0.3rem] px-2 border-[0.3px] rounded-r-md border-gray-400 transition-all duration-300 ease-in-out transform ${active === 3 ? 'bg-main text-white shadow-lg' : 'bg-transparent text-white hover:bg-[#f0f4f8] scale-100 hover:text-main'
                                }`}
                        >
                            Airport Trip
                        </button>
                    </div>



                    <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 p-5 px-3 mt-2 bg-white rounded-lg ">



                        {active === 1 &&
                            <div className='w-full flex items-center justify-center text-[0.8rem] tracking-wide'>
                                <button
                                    onClick={() => setOutstationActive(1.1)}
                                    className={`py-[0.15rem] font-semibold px-4 border-[0.3px] rounded-l-full border-gray-400 transform scale-105 transition-all duration-500 ease-in-out
        ${outstationActive === 1.1 ? 'bg-main text-white' : 'bg-white text-light hover:bg-[#f0f4f8]'}`}
                                >
                                    One way
                                </button>
                                <button
                                    onClick={() => setOutstationActive(1.2)}
                                    className={`py-[0.15rem] font-semibold px-4 border-[0.3px] rounded-r-full border-gray-400 transform scale-105 transition-all duration-500 ease-in-out
        ${outstationActive === 1.2 ? 'bg-main text-white' : 'bg-white text-light hover:bg-[#f0f4f8]'}`}
                                >
                                    Round Trip
                                </button>
                            </div>}


                        {active === 3 &&
                            <div className='w-full flex  items-center justify-center text-[0.8rem] tracking-wide'>
                                <button
                                    onClick={() => setAirportActive(3.1)}
                                    className={`py-[0.15rem] font-semibold px-4 border-[0.3px] rounded-l-full border-gray-400 transform scale-105 transition-all duration-500 ease-in-out
        ${airportActive === 3.1 ? 'bg-main text-white' : 'bg-white text-main hover:bg-[#f0f4f8]'}`}
                                >
                                    Drop
                                </button>
                                <button
                                    onClick={() => setAirportActive(3.2)}
                                    className={`py-[0.15rem] font-semibold px-4 border-[0.3px] rounded-r-full border-gray-400 transform scale-105 transition-all duration-500 ease-in-out
        ${airportActive === 3.2 ? 'bg-main text-white' : 'bg-white text-main hover:bg-[#f0f4f8]'}`}
                                >
                                    Pickup
                                </button>
                            </div>}

                        <div className="relative border p-1 rounded-md pr-2 border-main bg-[#F7FBFF] pl-7 flex flex-col items-center">

                            <div className='absolute top-[0.75rem]  text-light left-[0.4rem] text-[0.85rem] flex items-center justify-center flex-col'>
                                <div className='rotate-[180deg] mr-[0.01px]  size-[0.75rem] border-light border-[0.2rem] rounded-full' ></div>
                                <div className='h-[3.7rem] border-dashed border-r-[1.3px] mr-[0.155rem] border-light w-1'>

                                </div>
                                <FaLocationDot />
                            </div>
                            <label className='w-full text-light py-1 text-[0.8rem]'>Pick-up Location</label>
                            <input
                                type="text"
                                placeholder="Enter Pickup Location"
                                className="w-full pb-3 font-semibold text-black bg-transparent outline-none placeholder:text-black "
                            />
                            {/* Arrow Icon */}
                            <div className='absolute top-[3.35rem] border-main bg-white right-4 border p-[0.35rem] text-[0.95rem] rounded-full'>
                                <GoArrowSwitch className=" top-10 rotate-[90deg]   text-main" />
                            </div>
                            <label className='w-full  text-light py-3 pb-1 border-t border-t-[#80808051] text-[0.8rem]'>Drop Location</label>
                            <input
                                type="text"
                                placeholder="Enter Drop Location"
                                className="w-full pb-1 font-semibold text-black outline-none placeholder:text-black"
                            />
                        </div>

                        <div className="flex w-full gap-3">
                            <div className="relative border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                                <FaRegCalendarAlt className='text-light left-2 absolute top-[1.67rem]' />
                                <label className='w-full  text-light   text-[0.8rem]'>Pick-up Date</label>

                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    className="w-full pl-5 font-semibold tracking-wide bg-transparent outline-none caret-transparent"
                                    placeholderText="Select Date and Time"
                                />
                            </div>
                            <div className="relative border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                                <MdOutlineAccessTime className='text-light left-2 absolute top-[1.68rem]' />

                                <label className='w-full  text-light text-[0.8rem]'>Pick-up Time</label>
                                <DatePicker
                                    selected={startTime}
                                    onChange={(date) => setStartTime(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="hh:mm aa"
                                    className="w-full pl-5 font-semibold bg-transparent outline-none caret-transparent"

                                    placeholderText="Select Time"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-main text-white font-semibold tracking-wide rounded-md hover:bg-[#1780a4] transition duration-300 ease-in-out shadow-lg"
                        >
                            Explore Cab
                        </button>
                    </form>
                </div>
            </div>

            {/* Slider Section */}
            <div className="relative w-full h-[40rem]">
                <Swiper
                    modules={[Autoplay, Pagination, EffectFade]} // Using EffectFade for smooth transitions
                    pagination={{ clickable: true, type: 'bullets' }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    speed={2000} // Adjust speed for smoother transition
                    loop={true}
                    effect="fade" // Use fade effect for smooth blending
                    // fadeEffect={{ crossFade: true }} // Ensure crossfade for smooth transitions
                    className="w-full h-full"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div
                                className="relative w-full h-full bg-center bg-cover"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundSize: 'cover', // Ensures the image fully covers the slide
                                    backgroundPosition: 'center', // Centers the image in the slide
                                }}
                            >
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default MainSlider;
