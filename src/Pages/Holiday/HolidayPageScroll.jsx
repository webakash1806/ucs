import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom'; // For navigation

// Import AOS (Animate On Scroll) for animations
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    <div
      className="dark:bg-[#404156] shadow-lg border-none rounded-none mt-4 cursor-pointer"
      onClick={() => navigate('/holiday/package/detail', { state: { ...data } })}
    >
      <div className="relative">
        <img src={data?.mainPhoto?.secure_url} alt="" className="w-full h-auto" />
        <div className="absolute top-4 right-4 bg-[#414257] text-white px-3 py-2">
          <h6 className="mb-0 font-normal">From {data?.rate}</h6>
        </div>
      </div>
      <div className="p-4">
        <h5 className="font-medium text-[20px] mb-1">{data?.packageName}</h5>
        <p className="text-[14px] opacity-50 mb-0">{data?.location}</p>
      </div>
    </div>
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
    <section className="relative bg-gray-100  pb-6">
      <div className="max-w-7xl mx-auto p-8 md:px-12">
        <div className='text-start md:text-center flex flex-col md:items-center justify-center'>
          <h2 className="font-bold mb-4 transition duration-300 transform text-main text-3xl">
          Top Trending Destinations
          </h2>
          <h1 className="mb-8 lg:w-1/2 lg:text-center text-black text-xl">Explore Our Top Vacation Packages</h1>
        </div>

        <Slider {...settings}>
          {holidayData.map((holiday, index) => (
            <div key={index} className="p-4">
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
    <div className={`${className} arrow-next text-black bg-black rounded-full border border-red-500`} onClick={onClick}>
      &#8250; {/* Right Arrow Icon */}
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} arrow-prev text-black bg-black rounded-full`} onClick={onClick}>
      &#8249; {/* Left Arrow Icon */}
    </div>
  );
};

export default HolidayScrollPage;
