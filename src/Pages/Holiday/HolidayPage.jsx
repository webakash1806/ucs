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
import { getPackage, getPackageCategory, getPackageTag } from '../../Redux/Slices/packageSlice';
import React, { useEffect, useRef, useState } from 'react';
import CategoriesBar from './CategoryBar';
import { Link, useNavigate } from 'react-router-dom';

const Category = ({ image, label, isNew = false }) => {



  return (
    <div className="flex items-center text-center relative ">
      {/* Circle with Icon */}
      {/* <div className="bg-gray-100 rounded-full p-4 w-12 h-12 flex items-center justify-center shadow-sm">
        
          <img src={icon} alt="" />
        </div>
   */}
      {/* Label */}
      <img src={image} alt="" />
      <span className="text-sm mt-2 font-medium text-gray-600">{label}</span>

      {/* New Badge */}
      {/* {isNew && (
          <div className="absolute -top-1 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </div>
        )} */}
    </div>
  );
};

const HolidayPage = () => {
  const slides = [
    { id: 1, image: car1 },
    { id: 2, image: car2 },
  ];

  // Local States
  const [input, setInput] = useState(""); // Holds the input value
  const [filteredTags, setFilteredTags] = useState([]); // Stores suggestions
  const [showSuggestions, setShowSuggestions] = useState(false); // Controls visibility
  const navigate = useNavigate()

  const inputRef = useRef(null); // To track input focus


  const { data, loading, error, packageCategory, packageTag } = useSelector((state) => state?.packages)



  const dispatch = useDispatch()

  const fetchData = async () => {
    const response = await dispatch(getPackage())
    console.log(response);

  }

  const fetchCategory = async () => {
    const response = await dispatch(getPackageCategory())
    console.log("response is", response);

  }

  const fetchTagData = async () => {
    const response = await dispatch(getPackageTag())
    console.log("fetch tag data is", response);
  }

  // Handle Input Change (Filter Tags Dynamically)
  // Handle input changes (filters suggestions)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Filter suggestions based on input
    if (value.trim() !== "") {
      const filtered = packageTag.filter((tag) =>
        tag?.tagName?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags(packageTag); // Show all tags if input is empty
    }

    setShowSuggestions(true); // Show suggestions on input
  };

  // Handle input focus (show all suggestions)
  const handleInputFocus = () => {
    setFilteredTags(packageTag); // Show all tags
    setShowSuggestions(true);
  };

  // Hide suggestions on outside click
  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowSuggestions(false); // Hide suggestions
    }
  };

  // Add event listener to detect clicks outside the component
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Handle suggestion click
  const handleSuggestionClick = (tagName) => {
    setInput(tagName); // Set input value
    setShowSuggestions(false); // Hide suggestions
  };



  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchCategory()
  }, [])

  useEffect(() => {
    fetchTagData()
  }, [])

  if (error) {
    return <p>Error..</p>
  }

  {
    data && data.length > 0 && data.map(item => (
      <div key={item.id}>{item.name}</div>
    ))
  }


  // if(loading){
  //     return <p>Loading...</p>
  // }

  const Category = ({ icon, label, isNew = false, image }) => {
    return (
      <div className="flex items-center text-center relative ">
        {/* Circle with Icon */}
        <div className="bg-gray-100 rounded-full p-4 w-20 h-20 flex items-center justify-center shadow-sm" onClick={() => navigate(`/package/detail/${label}`, { state: { input: label } })}>
          <img src={image} alt="" className='w-[20rem]' />
        </div>

        <span className="text-sm mt-2 font-medium text-gray-600 cursor-pointer" onClick={() => navigate(`/package/detail/${label}`, { state: { input: label } })}>{label}</span>
      </div>
    );
  };






  return (
    <section className='overflow-x-hidden'>
      <div className="relative w-full min-h-[25rem] flex flex-col items-center justify-center border border-red-500  ">


        {/* Input Section */}
        <div ref={inputRef} className="absolute z-10 w-full flex items-start justify-center mt-8">
          <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-lg w-[90%] max-w-[600px]">
            {/* Input Field */}
            <input
              type="text"
              placeholder="Enter your designation"
              value={input}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="flex-1 px-4 py-2 outline-none text-gray-700 rounded-full"
            />

            {/* Search Button */}
            <button className="px-10 py-2 bg-blue-500 text-white rounded-full flex items-center justify-center" onClick={() => navigate(`/package/detail/${input}`, { state: { input } })}>
              <FaSearch className="mr-1" /> Search
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {/* Suggestions Dropdown */}
          {showSuggestions && filteredTags.length > 0 && (
            <ul className=" absolute top-14 w-[60%] max-w-[600px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden z-[9999]">
              {filteredTags.map((tag, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(tag.tagName)}
                >
                  {tag.tagName}
                </li>
              ))}
            </ul>
          )}

        </div>

        {/* Slider Section */}
        <div className="relative w-full h-[30rem] "> {/* Reduced height */}
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


        <div className="absolute bottom-[-2rem] z-30 mx-auto left-1/2 z-10">
          <div className="transform -translate-x-1/2 bg-white shadow-xl rounded-full  flex items-center px-10 py-2 space-x-4">

            {packageCategory.map((val, index) => {
              return (
                <Category label={val?.categoryName} image={val?.categoryPhoto?.secure_url} />
              )
            })}

          </div>
        </div>



      </div>
      {/* <CategoriesBar/> */}
      <PopularDesti holiday={data} isLoading={loading} isError={error} />
      {/* <CallToAction/> */}
      <WhyWe />

    </section>
  );
};

export default HolidayPage;
