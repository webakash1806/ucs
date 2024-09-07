import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade'; // Import the fade effect styles
import car1 from '../assets/car1.jpg';
import car2 from '../assets/car2.jpg';
import car3 from '../assets/car3.jpg';
import { GoArrowSwitch } from 'react-icons/go';

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

    return (
        <div className="relative w-full min-h-[37rem] flex flex-col md:flex-row-reverse items-center justify-center">
            {/* Form Section */}
            <div className='absolute gap-6 md:gap-2 lg:gap-12 flex-col md:flex-row md:justify-around z-10 w-full h-[35rem]  flex items-center justify-center'>
                <div className="relative max-w-[30rem] lg:max-w-[35rem] h-auto flex items-center justify-center">
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
                                <div className="flex flex-col justify-center items-center lg:items-start lg:text-start text-center w-full h-full">
                                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-xl text-gray-200 mb-6">
                                        {slide.description}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


                <div className=" min-w-[19.5rem] mb-1 max-w-[30rem] p-4 bg-white rounded-lg h-fit shadow-lg  md:p-6 md:rounded-lg">
                    <h2 className="text-[1.4rem] font-semibold text-center mb-4 text-main">
                        Book your new journey
                    </h2>
                    <div className="w-full mb-3">
                        <div className="">
                            <div className="grid grid-cols-2 text-[0.85rem] lg:grid-cols-4 sm:grid-cols-4 md:grid-cols-2 font-semibold">
                                <button className="py-[0.3rem] px-2 border-[0.3px] border-gray-400  bg-main text-white shadow-lg hover:bg-main hover:text-white transition-transform transform scale-105">
                                    One Way
                                </button>
                                <button className="py-[0.3rem] px-2 border-[0.3px] border-gray-400 bg-white text-main hover:bg-[#f0f4f8] transition-transform transform scale-105">
                                    Round Trip
                                </button>
                                <button className="py-[0.3rem] px-2 border-[0.3px] border-gray-400 bg-white text-main hover:bg-[#f0f4f8] transition-transform transform scale-105">
                                    Local Trip
                                </button>
                                <button className="py-[0.3rem] px-2 border-[0.3px] border-gray-400  bg-white text-main hover:bg-[#f0f4f8] transition-transform transform scale-105">
                                    Airport Trip
                                </button>
                            </div>
                        </div>
                    </div>

                    <form className="flex flex-col gap-4 mt-6 relative">
                        <div className="relative flex flex-col gap-4 items-center">
                            <input
                                type="text"
                                placeholder="From Address"
                                className="w-full p-2 border pb-4 border-gray-300 rounded-md outline-none focus:border-main transition duration-300 ease-in-out"
                            />
                            {/* Arrow Icon */}
                            <div className='absolute top-[2.6rem] border-main bg-white border-2 p-[0.4rem] rounded-full'>
                                <GoArrowSwitch className=" top-10 rotate-[90deg]   text-main" />

                            </div>
                            <input
                                type="text"
                                placeholder="To Address"
                                className="w-full p-2 pt-4 border border-gray-300 rounded-md outline-none focus:border-main transition duration-300 ease-in-out"
                            />
                        </div>

                        <div className="flex gap-4">
                            <input
                                type="date"
                                placeholder="Pickup Date"
                                className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-main transition duration-300 ease-in-out"
                            />
                            <input
                                type="time"
                                placeholder="Pickup Time"
                                className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-main transition duration-300 ease-in-out"
                            />
                        </div>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-main mt-2 text-white font-semibold tracking-wide rounded-md hover:bg-[#1780a4] transition duration-300 ease-in-out shadow-lg"
                        >
                            Explore Cab
                        </button>
                    </form>
                </div>
            </div>

            {/* Slider Section */}
            <div className="relative w-full h-[39rem]">
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
