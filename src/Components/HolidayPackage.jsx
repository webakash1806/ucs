import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { getPackage, getPackageCategory } from '../Redux/Slices/packageSlice';
import PackageCard from './PackageCard';

const HolidayPackage = () => {
    const { data, loading, error, category } = useSelector((state) => state?.packages);
    const dispatch = useDispatch();

    const fetchData = async () => {
        const response = await dispatch(getPackage());
        console.log(response);
    };

    const fetchCategory = async () => {
        const response = await dispatch(getPackageCategory());
    };

    const [slidesPerView, setSlidesPerView] = useState(1);

    useEffect(() => {
        const updateSlidesPerView = () => {
            const viewportWidth = window.innerWidth;
            const cardWidth = 18 * 16; // 20rem in pixels (1rem = 16px, adjust as needed)
            const numSlides = Math.floor(viewportWidth / cardWidth);
            setSlidesPerView(numSlides || 1); // Ensure at least 1 slide is visible
        };

        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);

        return () => {
            window.removeEventListener('resize', updateSlidesPerView);
        };
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    // Filter data based on destinationType "home"
    const filteredData = data.filter((service) => service.destinationType === 'home');

    return (
        <div className="sm:px-6 px-4 py-12 bg-[#F5F6F7] flex flex-col items-center">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-main md:text-4xl">
                    UCS CAB: Holiday Package
                </h1>
                <p className="mt-4 text-gray-600">
                    Experience seamless travel with our wide range of services, tailored to suit your needs.
                </p>
            </div>

            {/* Slider Section */}
            <div className="relative w-full max-w-[84rem] mx-auto flex items-center justify-center">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    speed={1500}
                    className="flex items-center justify-center w-full gap-6 mx-auto"
                    slidesPerView={slidesPerView > 4 ? 4 : slidesPerView}
                    spaceBetween={1} // Reduce the gap between slides
                >
                    {filteredData.map((service, ind) => (
                        <SwiperSlide key={ind + 1} className="flex justify-center px-2">
                            <PackageCard val={service} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HolidayPackage;
