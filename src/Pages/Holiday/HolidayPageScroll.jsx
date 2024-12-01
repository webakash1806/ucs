import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom'; // For navigation

// Import AOS (Animate On Scroll) for animations
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Sample holiday data
const holidayPackages = [
  { 
    mainPhoto: { secure_url: 'url-to-image-1.jpg' },
    rate: '$2000', 
    packageName: 'Beach Vacation', 
    location: 'Maldives' 
  },
  { 
    mainPhoto: { secure_url: 'url-to-image-2.jpg' },
    rate: '$1500', 
    packageName: 'Mountain Adventure', 
    location: 'Swiss Alps' 
  },
  // Add more holiday data here
];

const HolidayCard = ({ data }) => {
  const navigate = useNavigate();

  return (
  
    // <div
    //   className=" shadow-lg border-none rounded-none mt-4 cursor-pointer"
    //   onClick={() => navigate('/holiday/package/detail', { state: { ...data } })}
    // >
              <article class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto cursor-pointer" onClick={() => navigate('/holiday/package/detail', { state: { ...data } })}>
    <img src={data?.mainPhoto?.secure_url} alt="University of Southern California" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
    <h3 class="z-10 mt-3 text-3xl font-bold text-white">{data?.location}</h3>
    {/* <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-black border">City of love</div> */}
</article>
    // </div>
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
    <section className="relative bg-gray-100  md:py-10 ">
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
