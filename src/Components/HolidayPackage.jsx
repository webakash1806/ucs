import { useEffect, useState } from 'react';
import ServiceDetailCard from './ServiceDetailCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import airportTrip from '../assets/icons/airportTrip.avif';
import addressPickup from '../assets/icons/addressPickup.avif';
import localTrip from '../assets/icons/localTrip.avif';
import longDistance from '../assets/icons/longDistance.avif';
import { useDispatch, useSelector } from 'react-redux';
import { getPackage, getPackageCategory } from '../Redux/Slices/packageSlice';
import PackageCard from './PackageCard';


const services = [
    {
        id: 1,
        name: 'Address Pickup',
        icon: addressPickup,
        description: 'Conveniently pick up at your chosen location.'
    },
    {
        id: 2,
        name: 'Round Trip',
        icon: localTrip,
        description: 'Travel to your destination and return with ease.'
    },
    {
        id: 3,
        name: 'Long Distance',
        icon: longDistance,
        description: 'Travel comfortably for long distance journeys.'
    },
    {
        id: 4,
        name: 'Airport Transfer',
        icon: airportTrip,
        description: 'Hassle-free airport transfers for your trips.'
    }
];

const HolidayPackage = () => {

    const {data,loading,error,category}=useSelector((state)=>state?.packages)
    
    

    console.log("category is",category);

    const dispatch=useDispatch()
     
    const fetchData=async()=>{
       const response=await dispatch(getPackage())
       console.log(response); 
    }

    const fetchCategory=async()=>{
         const response=await dispatch(getPackageCategory())
    }


 
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



    useEffect(()=>{
        fetchData()
     },[])
 



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
                    {data.map((service, ind) => (
                        <SwiperSlide key={ind + 1} className="flex justify-center px-2">
                            <PackageCard val={service}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HolidayPackage;
