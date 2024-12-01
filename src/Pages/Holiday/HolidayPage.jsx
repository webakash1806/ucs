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
import { useDispatch, useSelector } from 'react-redux';
import { getPackage } from '../../Redux/Slices/packageSlice';
import { useEffect } from 'react';
import CategoriesBar from './CategoryBar';

const Category = ({ icon, label, isNew = false }) => {
    return (
      <div className="flex items-center text-center relative border border-green-500">
        {/* Circle with Icon */}
        <div className="bg-gray-100 rounded-full p-4 w-12 h-12 flex items-center justify-center shadow-sm">
          <span className="text-xl">{icon}</span>
        </div>
  
        {/* Label */}
        <span className="text-sm mt-2 font-medium text-gray-600">{label}</span>
  
        {/* New Badge */}
        {isNew && (
          <div className="absolute -top-1 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </div>
        )}
      </div>
    );
  };
  
const HolidayPage = () => {
    const slides = [
        { id: 1, image: car1 },
        { id: 2, image: car2 },
    ];

    const {data,loading,error}=useSelector((state)=>state?.packages)

    console.log("data is",data);
    

    const dispatch=useDispatch()
     
    const fetchData=async()=>{
       const response=await dispatch(getPackage())
       console.log(response);
       
    }


    useEffect(()=>{
       fetchData()
    },[])

    if(error){
        return <p>Error..</p>
    }

    {data && data.length > 0 && data.map(item => (
        <div key={item.id}>{item.name}</div>
    ))}
    

    // if(loading){
    //     return <p>Loading...</p>
    // }

    const Category = ({ icon, label, isNew = false }) => {
        return (
          <div className="flex items-center text-center relative">
            {/* Circle with Icon */}
            <div className="bg-gray-100 rounded-full p-4 w-12 h-12 flex items-center justify-center shadow-sm">
              <span className="text-xl">{icon}</span>
            </div>
      
            {/* Label */}
            <span className="text-sm mt-2 font-medium text-gray-600">{label}</span>
      
            {/* New Badge */}
            {isNew && (
              <div className="absolute -top-1 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                New
              </div>
            )}
          </div>
        );
      };

      console.log(data);
      
      
      

    return (
        <section className='overflow-x-hidden'>
        <div className="relative w-full min-h-[25rem] flex flex-col items-center justify-center ">

            
            {/* Input Section */}
            <div className="absolute z-10 w-full flex items-start justify-center mt-8">
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
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2 font-strong">Discover the UCS Cab Experience</h1>
                                    <p className="text-lg md:text-xl">Where Every Experience Counts!</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="absolute bottom-[-2rem] z-30 mx-auto left-1/2">
  <div className="transform -translate-x-1/2 bg-white shadow-xl rounded-full  flex items-center px-10 py-2 space-x-4">
    {/* Category Items */}
    <Category icon="🌹" label="Honeymoon" isNew={true} />
    <Category icon="🙏" label="Pilgrimage" />
    <Category icon="💆" label="Ayurveda" />
    <Category icon="✨" label="Luxury" />
    <Category icon="⛰️" label="Adventure" />
    {/* <Category icon="👨‍👩‍👧‍👦" label="Group Departure" /> */}
  </div>
</div>


   
        </div>
        {/* <CategoriesBar/> */}
        <PopularDesti holiday={data} isLoading={loading} isError={error}/>
        {/* <CallToAction/> */}
        <WhyWe/>
      
        </section>
    );
};

export default HolidayPage;
