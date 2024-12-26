import { useEffect, useState } from 'react';
import ServiceDetailCard from '../../Components/ServiceDetailCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';


import { useDispatch, useSelector } from 'react-redux';

import { getPackage, getPackageCategory } from '../../Redux/Slices/packageSlice';
import PackageCard from '../../Components/PackageCard';




const SimilarPackage = ({similar}) => {
    console.log(similar);
    

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
                   View Similar Package
                </h1>
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
                    {similar.map((service, ind) => (
                        <SwiperSlide key={ind + 1} className="flex justify-center px-2">
                            <PackageCard val={service}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SimilarPackage;
