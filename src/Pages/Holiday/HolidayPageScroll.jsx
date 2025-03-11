import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom'; // For navigation

// Import AOS (Animate On Scroll) for animations
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';



const HolidayCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <article 
      className="relative flex flex-col justify-end overflow-hidden rounded-3xl max-w-[24rem] mx-auto cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
      onClick={() => navigate('/package/detail', { state: { ...data } })}
    >
      {/* Image */}
      <img 
        src={data?.mainPhoto?.secure_url} 
        alt={data?.location || "Holiday Location"} 
        className="w-full h-60 object-cover rounded-t-3xl transition-all duration-500"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent rounded-t-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10 p-2 pb-2  ">
        <p className=" text-md text-white/80">{data?.packageName}</p>
        
        <p className="text-md text-white/80">{data?.rate} <span>{data?.rateBy}</span></p>
      </div>
    </article>
  );
};



const HolidayScrollPage = ({ holidayData }) => {
  useEffect(() => {
    AOS.init(); // Initialize AOS animations
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  


  return (
    <section className="relative bg-gray-100  md:py-10  ">
      <div className="max-w-7xl mx-auto p-8 md:px-8">
        <div className='text-start md:text-center flex flex-col md:items-start justify-start b'>
          <h2 className="font-bold mb-2 transition duration-300 transform text-main text-3xl">
          Top Trending Destinations
          </h2>
          <h1 className="mb-4  text-black text-xl">Explore Our Top Vacation Packages</h1>
        </div>

        <Slider {...settings}>

          {holidayData.map((holiday, index) => (
            <div key={index} className="">
              <HolidayCard data={holiday} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
    className="absolute top-1/2 right-[-3rem] transform -translate-y-1/2 bg-[#1f708e] text-white rounded-full p-3 cursor-pointer hover:bg-[#1f708e] z-10"
    onClick={onClick}
  >
    <FaArrowRight size={20} />
  </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
    className="absolute top-1/2 left-[-3rem] transform -translate-y-1/2 bg-[#1f708e] text-white rounded-full p-3 cursor-pointer hover:bg-[#1f708e] z-10"
    onClick={onClick}
  >
    <FaArrowLeft size={20} />
  </div>
  );
};

export default HolidayScrollPage;
