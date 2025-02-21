import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCar, FaShieldAlt, FaMoneyBillWave, FaClock, FaUsers, FaStar } from "react-icons/fa";

const WhyWe = () => {
  const features = [
    { id: 1, title: "Reliable & Safe Rides", icon: <FaShieldAlt className='text-yellow-500 text-4xl' /> },
    { id: 2, title: "Affordable Pricing", icon: <FaMoneyBillWave className='text-green-500 text-4xl' /> },
    { id: 3, title: "On-Time Service", icon: <FaClock className='text-blue-500 text-4xl' /> },
    { id: 4, title: "Experienced Drivers", icon: <FaUsers className='text-purple-500 text-4xl' /> },
    { id: 5, title: "Comfort & Cleanliness", icon: <FaCar className='text-orange-500 text-4xl' /> },
    { id: 6, title: "Top Customer Ratings", icon: <FaStar className='text-red-500 text-4xl' /> },
  ];

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex mb-10 flex-col items-center justify-center" data-aos="fade-down" data-aos-duration="1000">
          <h1 className="text-main font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">Why We Choose UCS Cab</h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="flex items-center bg-white border border-gray-200 shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-light"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={index * 100}
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mr-5">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm text-justify">
                  {feature.id === 1 && "Your safety is our priority with professional drivers and secure rides."}
                  {feature.id === 2 && "Enjoy competitive rates without compromising on comfort."}
                  {feature.id === 3 && "Punctual rides ensuring you reach your destination on time."}
                  {feature.id === 4 && "Experienced and courteous drivers providing top-notch service."}
                  {feature.id === 5 && "Clean and well-maintained cabs for a comfortable journey."}
                  {feature.id === 6 && "Thousands of satisfied customers trust us for their daily rides."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWe;
