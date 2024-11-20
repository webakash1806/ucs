import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import car1 from "../../assets/holiday/holiday1.png"
import car2 from "../../assets/holiday/holiday2.png"

import { FaSearch } from 'react-icons/fa'; // Import search icon from react-icons
import PopularDesti from './PopularDesti';
import CallToAction from './CallAction';
import WhyWe from './WhyChooseUs';


const HolidayPage = () => {
    const slides = [
        { id: 1, image: car1 },
        { id: 2, image: car2 },
    ];

    return (
        <section>
        <div className="relative w-full max-h-[25rem] flex flex-col items-center justify-center">

            
            {/* Input Section */}
            <div className="absolute z-10 w-full flex items-center justify-center mt-8">
                <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-lg w-[90%] max-w-[600px]">
                    <input
                        type="text"
                        placeholder="Enter your designation"
                        className="flex-1 px-4 py-2 outline-none text-gray-700 rounded-full"
                    />
                    <button className="px-10 py-2 bg-blue-500 text-white rounded-full flex items-center justify-center">
                        <FaSearch className="mr-1" /> Search
                    </button>
                </div>
            </div>

            {/* Slider Section */}
            <div className="relative w-full h-[30rem]"> {/* Reduced height */}
                <Swiper
                    modules={[Autoplay, Pagination, EffectFade]}
                    pagination={{ clickable: true, type: 'bullets' }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    speed={2000}
                    loop={true}
                    effect="fade"
                    className="w-full h-full"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div
                                className="relative w-full h-full bg-center bg-cover"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                                <div className="relative z-20 text-center text-white my-auto pt-[5rem]">
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2 font-strong">Kerala Tour Package</h1>
                                    <p className="text-lg md:text-xl">Where Every Experience Counts!</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
        <PopularDesti/>
        <CallToAction/>
        <WhyWe/>
      
        </section>
    );
};

export default HolidayPage;
