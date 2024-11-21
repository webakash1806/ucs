import React, { useState, useEffect } from "react";
import img1 from '../../assets/holiday/holiday1.png';
import img2 from '../../assets/holiday/holiday2.png';
import HolidayDetailScroll from "./HolidayDetailScroll";
import { TbPointFilled } from "react-icons/tb";
import { SiTicktick } from "react-icons/si";
import BreadCrumbs from "../../Components/BreadCums";
import DayWiseSection from "./DayWise";
import { useDispatch } from "react-redux";
import { getPackage } from "../../Redux/Slices/packageSlice";
import { useLocation } from "react-router-dom";
import './StyleHoliday.css'

const HolidayDetail = () => {
  const [showDetails, setShowDetails] = useState(null);
  const [openTerms, setOpenTerms] = useState(false);
  const [openBookingPolicy, setOpenBookingPolicy] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('terms');
  const dispatch=useDispatch()

  const {state}=useLocation()

  console.log(state);
  



  const termsPoints = [
    'Users must be 18 years or older to make a booking.',
    'Bookings are subject to availability and confirmation.',
    'Payment must be made in full before the booking is confirmed.',
    'Cancellations may incur fees as per our cancellation policy.',
  ];

  const bookingPolicyPoints = [
    'Cancellations made within 24 hours are eligible for a full refund.',
    'Changes to bookings may result in additional charges.',
    'Late arrivals may be treated as a no-show and may forfeit the booking.',
    'Customers are responsible for providing accurate details during booking.',
  ];

  const images = [img1, img2];

  const fetchData=async()=>{
    const response=await dispatch(getPackage())
    console.log(response);
    
  }



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  useEffect(()=>{
      fetchData()
  },[])

  const toggleDetails = (day) => {
    setShowDetails(showDetails === day ? null : day);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Package' },
    { label: 'PackageDetail' },
  ];

  const formattedInclusive = state?.inclusive
  ? state.inclusive.replace(
      /{tick}/g, // Replace a placeholder `{tick}` with the icon
      `<i class="text-green-500"><svg xmlns="http://www.w3.org/2000/svg" class="text-green-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.293 9.293a1 1 0 0 1 1.414 0L10 11.586l4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0L6.293 10.707a1 1 0 0 1 0-1.414z"/></svg></i>`
    )
  : '';

  return (
    <div className="bg-gray-50 font-sans text-gray-800 ">
      <BreadCrumbs headText={"Dubai Delights"} items={breadcrumbItems} />
      
      <div className="container mx-auto p-4 lg:p-6 flex flex-col lg:flex-row lg:max-w-7xl gap-6">
        
        {/* Left Section */}
        <div className="flex-1">
          <HolidayDetailScroll data={state?.photos} />
          <div className="bg-gray-50 border border-gray-100 mt-4 ">
            <DayWiseSection  data={state?.dayWise} />
          </div>
          
     
          <div className="flex flex-col lg:flex-row gap-4 pt-4">
  {/* Inclusive Section */}
  <div className="lg:w-1/2 w-full border border-gray-200 rounded-lg p-4 shadow-sm bg-[#EAFAEA]">
    <div className="flex items-center mb-2">
      <i className="text-blue-600 mr-2">🌟</i> {/* Icon */}
      <h2 className="text-lg font-semibold text-blue-700">Inclusive</h2>
    </div>
      <div className="holiday">
    <div
             
                dangerouslySetInnerHTML={{ __html: formattedInclusive}}
            />
            </div> 


    {/* <div className="flex items-center gap-2 mb-2">
      <i className="text-green-500"><SiTicktick /></i>
      <p className="text-gray-600">Feature 1 included</p>
    </div> */}
    {/* <div className="flex items-center gap-2 mb-2">
      <i className="text-green-500"><SiTicktick /></i>
      <p className="text-gray-600">Feature 2 included</p>
    </div>
    <div className="flex items-center gap-2 mb-2">
      <i className="text-green-500"><SiTicktick /></i>
      <p className="text-gray-600">Feature 3 included</p>
    </div>
    <div className="flex items-center gap-2 mb-2">
      <i className="text-green-500"><SiTicktick /></i>
      <p className="text-gray-600">Feature 4 included</p>
    </div> */}
  </div>

  {/* Exclusive Section */}
  <div className="lg:w-1/2 w-full border border-gray-200 rounded-lg p-4 shadow-sm bg-[#FBEBEB]">
    <div className="flex items-center mb-2">
      <i className="text-red-600 mr-2">🚫</i> {/* Icon */}
      <h2 className="text-lg font-semibold text-red-700">Exclusive</h2>
    </div>
    {/* Scrollable Content */}
    <div className="h-32 overflow-y-scroll space-y-2 pr-2">
      <div className="holiday">
    <div
             className=""
             dangerouslySetInnerHTML={{ __html: state?.
              exclusive
               }}
         />
         </div>
      {/* <div className="flex items-center gap-2">
        <i className="text-gray-500">❌</i>
        <p className="text-gray-600">Feature 1 excluded</p>
      </div>
      <div className="flex items-center gap-2">
        <i className="text-gray-500">❌</i>
        <p className="text-gray-600">Feature 2 excluded</p>
      </div>
      <div className="flex items-center gap-2">
        <i className="text-gray-500">❌</i>
        <p className="text-gray-600">Feature 3 excluded</p>
      </div>
      <div className="flex items-center gap-2">
        <i className="text-gray-500">❌</i>
        <p className="text-gray-600">Feature 4 excluded</p>
      </div>
      <div className="flex items-center gap-2">
        <i className="text-gray-500">❌</i>
        <p className="text-gray-600">Feature 5 excluded</p>
      </div> */}
    </div>
  </div>

  


          </div>
          {/* Terms and Booking Policy Section */}
          <div className="p-4 mt-4 bg-white shadow-lg rounded-lg">
            <div className="flex justify-start mb-4 border-b-2">
              <button
                onClick={() => setActiveTab('terms')}
                className={`px-4 py-2 font-semibold ${activeTab === 'terms' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
              >
                Terms & Conditions
              </button>
              <button
                onClick={() => setActiveTab('booking')}
                className={`px-4 py-2 font-semibold ${activeTab === 'booking' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
              >
                Booking Policy
              </button>
            </div>

            <div className="mt-4">
              {activeTab === 'terms' && (
                // <ul className="list-disc list-inside space-y-2 text-gray-700">
                //   {termsPoints.map((point, index) => (
                //     <li key={index}>{point}</li>
                //   ))}
                // </ul>
                <div className="holiday">
                <div
             
             dangerouslySetInnerHTML={{ __html: state?.termsAndCondition
              
               }}
         />
         </div>
              )}
              {activeTab === 'booking' && (
                // <ul className="list-disc list-inside space-y-2 text-gray-700">
                //   {bookingPolicyPoints.map((point, index) => (
                //     <li key={index}>{point}</li>
                //   ))}
                // </ul>
                <div className="holiday">
                <div
             
                dangerouslySetInnerHTML={{ __html: state?.bookingPolicy

                  }}
            />
            </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/3">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Price Section */}
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <div className="flex items-center justify-between w-full mb-2">
                <p className="text-sm font-semibold text-gray-800">Starting from</p>
                <select className="bg-white text-xs border border-gray-300 rounded px-1 py-0.5">
                  <option>{state?.location}</option>
                </select>
              </div>
              <div className="text-3xl font-bold text-black mb-1 font-p1">Rs {state?.rate}</div>
              {/* <p className="text-xs text-gray-600">per person</p>
              <p className="text-xs text-gray-500">
                EMI starts from <span className="font-semibold text-blue-600">₹6552</span>
              </p> */}
            </div>

            {/* What We Included */}
            <div className="px-4 mb-8">
      {/* Header Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Package Included</h2>

      {/* Package Points in a Row */}
      <div className="flex flex-wrap gap-4">
        {state?.includedDetails && state.includedDetails.length > 0 ? (
          state.includedDetails.map((val, index) => (
            <div key={index} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg shadow-sm">
              {/* Check Icon */}
              <i className="text-green-500 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-circle">
                  <path d="M16 8a8 8 0 1 1-8-8 8 8 0 0 1 8 8zm-8-1a1 1 0 0 0-.707.293L6 8.707l-2-2a1 1 0 1 0-1.414 1.414l2.707 2.707a1 1 0 0 0 1.414 0l4-4a1 1 0 1 0-1.414-1.414L8 7z" />
                </svg>
              </i>
              {/* Point Text */}
              <p className="text-sm font-medium text-gray-700">{val}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No details available.</p>
        )}
      </div>
    </div>

            {/* Dates Selection */}
            <div className="flex items-center px-4 text-xs mb-4">
              <div className="text-gray-500  flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-800">Duration:</h2>
                <p className=" text-2xl text-black font-normal" >{state?.duration}</p>
              </div>
              {/* <button className="text-blue-600 underline hover:text-blue-700">
                Modify
              </button> */}
            </div>

            {/* Book Now and Submit Query Buttons */}
            <div className="px-4 flex flex-col gap-2 mb-4">
              <button className="bg-orange-500 w-full text-white py-2 font-semibold text-sm hover:bg-orange-600 transition rounded-full">
                SUBMIT QUERY
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-4 pt-2 text-center border-t border-gray-100 flex flex-col gap-2">
              <p className="font-semibold text-gray-700 text-xl">Need Help?</p>
              <p className="text-sm text-gray-500">
                Email: <a href="mailto:ucs@gmail.com" className="text-blue-600 underline hover:text-blue-700">ucs@gmail.com</a>
              </p>
              <p className="text-sm text-gray-500">
                Phone: <a href="tel:919876543210" className="text-blue-600 underline hover:text-blue-700">+91 9876543210</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayDetail;
