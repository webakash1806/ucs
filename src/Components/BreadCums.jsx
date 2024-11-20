import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import image2 from "../assets/holiday/holiday1.png"


const BreadCrumbs = ({ items, headText ,image}) => {
  console.log(headText);
  
  return (
    <div
      className="relative flex flex-col items-center justify-center py-16 lg:py-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${image2})` }} // Background image
      data-aos="fade-in" // Add AOS effect here
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Heading */}
      <h1 className="text-white text-center relative z-20 sora-600 px-4 mb-4  text-5xl font-bold" >
        {headText}
      </h1>

      {/* Breadcrumb navigation */}
      <nav className="flex items-center relative z-20 space-x-1 px-4 text-gray-300 text-sm lg:text-base">
        {items?.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-white">
                <MdKeyboardArrowRight className="text-lg lg:text-xl mt-[0.2rem]" />
              </span>
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="hover:text-white transition-colors"
    
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-white" data-aos="fade-right">
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default BreadCrumbs;
