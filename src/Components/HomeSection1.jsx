import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaSyncAlt, FaRoad, FaPlane } from 'react-icons/fa'; // Importing icons from react-icons
import ServiceDetailCard from './ServiceDetailCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';

const HomeSection1 = () => {
    const [slidesPerView, setSlidesPerView] = useState(1);

    useEffect(() => {
        const updateSlidesPerView = () => {
            const viewportWidth = window.innerWidth;
            const cardWidth = 20 * 16; // 20rem in pixels (1rem = 16px, adjust as needed)
            const numSlides = Math.floor(viewportWidth / cardWidth);
            setSlidesPerView(numSlides || 1); // Ensure at least 1 slide is visible
        };

        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);

        return () => {
            window.removeEventListener('resize', updateSlidesPerView);
        };
    }, []);

    const services = [
        {
            id: 1,
            name: 'Address Pickup',
            icon: <FaMapMarkerAlt size={30} className="text-main" />,
            description: 'Conveniently pick up at your chosen location.'
        },
        {
            id: 2,
            name: 'Round Trip',
            icon: <FaSyncAlt size={30} className="text-main" />,
            description: 'Travel to your destination and return with ease.'
        },
        {
            id: 3,
            name: 'Long Distance',
            icon: <FaRoad size={30} className="text-main" />,
            description: 'Travel comfortably for long distance journeys.'
        },
        {
            id: 4,
            name: 'Airport Transfer',
            icon: <FaPlane size={30} className="text-main" />,
            description: 'Hassle-free airport transfers for your trips.'
        }
    ];

    return (
        <div className="px-6 py-12 bg-[#F5F6F7] flex flex-col items-center">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    A Car for Every Occasion
                </h1>
                <p className="text-gray-600 mt-4">
                    Experience seamless travel with our wide range of services, tailored to suit your needs.
                </p>
            </div>

            {/* Slider Section */}
            <div className="relative w-full max-w-[82rem] mx-auto flex items-center justify-center">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    speed={1500}
                    className="w-full mx-auto flex items-center justify-center gap-6"
                    slidesPerView={slidesPerView}
                    spaceBetween={10} // Reduce the gap between slides
                >
                    {services.concat(services).map((service) => (
                        <SwiperSlide key={service.id} className="flex justify-center  px-6">
                            <ServiceDetailCard
                                icon={service.icon}
                                title={service.name}
                                description={service.description}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeSection1;
