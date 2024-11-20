import React, { useState, useEffect } from "react";
import img1 from '../../assets/holiday/holiday1.png';
import img2 from '../../assets/holiday/holiday2.png';
import HolidayDetailScroll from "./HolidayDetailScroll";
import { TbPointFilled } from "react-icons/tb";
import { SiTicktick } from "react-icons/si";
import BreadCrumbs from "../../Components/BreadCums";
import DayWiseSection from "./DayWise";

const HolidayDetail = () => {
  const [showDetails, setShowDetails] = useState(null);
  const [openTerms, setOpenTerms] = useState(false);
  const [openBookingPolicy, setOpenBookingPolicy] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('terms');

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  const toggleDetails = (day) => {
    setShowDetails(showDetails === day ? null : day);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Package' },
    { label: 'PackageDetail' },
  ];

  return (
    <div className="bg-gray-50 font-sans text-gray-800">
      <BreadCrumbs headText={"Dubai Delights"} items={breadcrumbItems} />
      
      <div className="container mx-auto p-4 lg:p-6 flex flex-col lg:flex-row lg:max-w-7xl gap-6">
        
        {/* Left Section */}
        <div className="flex-1">
          <HolidayDetailScroll />
          <div className="bg-gray-50 border border-gray-100 mt-4">
            <DayWiseSection />
          </div>
          
     
          <div className="flex flex-col lg:flex-row gap-4 pt-4">
  {/* Inclusive Section */}
  <div className="lg:w-1/2 w-full border border-gray-200 rounded-lg p-4 shadow-sm bg-[#EAFAEA]">
    <div className="flex items-center mb-2">
      <i className="text-blue-600 mr-2">🌟</i> {/* Icon */}
      <h2 className="text-lg font-semibold text-blue-700">Inclusive</h2>
    </div>
    <div className="flex items-center gap-2 mb-2">
      <i className="text-green-500"><SiTicktick /></i>
      <p className="text-gray-600">Feature 1 included</p>
    </div>
    <div className="flex items-center gap-2 mb-2">
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
    </div>
  </div>

  {/* Exclusive Section */}
  <div className="lg:w-1/2 w-full border border-gray-200 rounded-lg p-4 shadow-sm bg-[#FBEBEB]">
    <div className="flex items-center mb-2">
      <i className="text-red-600 mr-2">🚫</i> {/* Icon */}
      <h2 className="text-lg font-semibold text-red-700">Exclusive</h2>
    </div>
    {/* Scrollable Content */}
    <div className="h-32 overflow-y-scroll space-y-2 pr-2">
      <div className="flex items-center gap-2">
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
      </div>
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
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {termsPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'booking' && (
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {bookingPolicyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
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
                  <option>New Delhi</option>
                </select>
              </div>
              <div className="text-3xl font-bold text-black mb-1 font-p1">₹34,775</div>
              <p className="text-xs text-gray-600">per person</p>
              <p className="text-xs text-gray-500">
                EMI starts from <span className="font-semibold text-blue-600">₹6552</span>
              </p>
            </div>

            {/* Hotel Info */}
            <div className="px-4 mb-4">
              <p className="font-semibold text-gray-700">Hotel Included</p>
              <p className="text-lg text-blue-600">3<sup>★</sup></p>
            </div>

            {/* Dates Selection */}
            <div className="flex items-center px-4 text-xs mb-4">
              <p className="text-gray-500 mr-2 flex items-center">
                <i className="pi pi-calendar mr-1" /> 3 Dec - 7 Dec
              </p>
              <button className="text-blue-600 underline hover:text-blue-700">
                Modify
              </button>
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
