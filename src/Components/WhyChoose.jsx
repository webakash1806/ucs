import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/autoplay'; // Import Autoplay module styles
import 'swiper/css/navigation'; // Import Navigation module styles

// Import Swiper modules
import { Autoplay, Navigation } from 'swiper/modules';

// Import your images
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';

const imagesLeft = [
    { src: img1, title: 'Variety of cars' },
    { src: img2, title: 'Pocket friendly' },
    { src: img3, title: 'Secured & Safe rides' },
    { src: img4, title: 'Experienced & Courteous Chauffeurs' }
];

const imagesRight = [
    { src: img5, title: 'Well Maintained Car' },
    { src: img6, title: 'On time Punctuality' },
    { src: img7, title: 'Cleaned and sanitised car' },
    { src: img8, title: '24 X 7 Customer support' }
];

const WhyChoose = () => {
    const [slidesPerView, setSlidesPerView] = useState(1);

    useEffect(() => {
        const updateSlidesPerView = () => {
            const viewportWidth = window.innerWidth;
            const cardWidth = 16 * 16; // Adjust based on your card width (15rem = 240px)
            const numSlides = Math.ceil(viewportWidth / cardWidth);
            setSlidesPerView(numSlides || 1); // Ensure at least 1 slide is visible
        };

        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);

        return () => {
            window.removeEventListener('resize', updateSlidesPerView);
        };
    }, []);

    return (
        <div className="relative flex py-10 pb-20 flex-col justify-between items-center w-full gap-4 overflow-hidden">
            <h1 className='text-main font-semibold text-[1.8rem] mb-3'>Why Choose Us?</h1>

            {/* Top Scrolling Slider */}
            <div className="w-full mx-auto relative flex-shrink-0 right-10 sm:right-16 lg:right-40">
                <Swiper
                    direction="horizontal"
                    loop={true}
                    autoplay={{ delay: 0, disableOnInteraction: false }}
                    modules={[Autoplay, Navigation]}
                    className="w-full h-full"
                    speed={3000} // Adjust speed for smoother scrolling
                    slidesPerView={slidesPerView} // Ensure only one slide is visible at a time
                    spaceBetween={0} // No space between slides
                >
                    {imagesLeft.concat(imagesLeft).map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-[15rem] h-[12rem] flex flex-col overflow-hidden rounded justify-center items-center">
                                <img src={image.src} alt={image.title} className="w-full h-[10rem] object-cover" />
                                <div className="absolute bottom-4 w-full bg-black bg-opacity-50 text-white px-4 py-2 text-center">{image.title}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Bottom Scrolling Slider */}
            <div className="w-full mx-auto relative flex-shrink-0 left-10 sm:left-16 lg:left-40">
                <Swiper
                    direction="horizontal"
                    loop={true}
                    autoplay={{ delay: 0, disableOnInteraction: false }}
                    modules={[Autoplay, Navigation]}
                    className="w-full h-full"
                    speed={3000} // Adjust speed for smoother scrolling
                    slidesPerView={slidesPerView} // Ensure only one slide is visible at a time
                    spaceBetween={0} // No space between slides
                    autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true }} // Reverse direction for the second swiper
                >
                    {imagesRight.concat(imagesRight).map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-[15rem] h-[12rem] flex flex-col overflow-hidden rounded justify-center items-center">
                                <img src={image.src} alt={image.title} className="w-full h-[10rem] object-cover" />
                                <div className="absolute bottom-4 w-full bg-black bg-opacity-50 text-white px-4 py-2 text-center">{image.title}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default WhyChoose;
