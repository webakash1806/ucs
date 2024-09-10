import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade'; // Import the fade effect styles
import car1 from '../assets/car1.jpg';
import car2 from '../assets/car2.jpg';
import car3 from '../assets/car3.jpg';
import MainForm from './MainForm';


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

                <MainForm />

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
