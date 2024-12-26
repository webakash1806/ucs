import React from 'react';
import img from '../../assets/route1.jpg'
import { FaMapMarkerAlt } from 'react-icons/fa'; // Location Icon

const RouteDesign = () => {
  return (
    <div className="relative mt-8 lg:mt-12">
      {/* Curved Line Image (Optional, can be used as background if needed) */}
      <div className="absolute inset-x-0 opacity-100 hidden xl:px-44 top-2 md:block md:px-20 lg:px-40 ">
        <img
          className="w-full"
          src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
          alt=""
        />
      </div>

      {/* Location Route Steps */}
      <div className="relative flex justify-between items-center mt-12">
        {/* Location 1: Delhi */}
        <div className="flex flex-col items-center relative">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
            <FaMapMarkerAlt className="text-xl text-gray-700" />
          </div>
          <span className="mt-2 text-sm text-gray-700">Delhi</span>
          {/* Curved Line to the next location */}
       
        </div>

        {/* Location 2: Mumbai */}
        <div className="flex flex-col items-center relative">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
            <FaMapMarkerAlt className="text-xl text-gray-700" />
          </div>
          <span className="mt-2 text-sm text-gray-700">Mumbai</span>
          {/* Curved Line to the next location */}
       
        </div>

        {/* Location 3: Bangalore */}
        <div className="flex flex-col items-center relative">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
            <FaMapMarkerAlt className="text-xl text-gray-700" />
          </div>
          <span className="mt-2 text-sm text-gray-700">Bangalore</span>
          {/* Curved Line to the next location */}
     
        </div>

        {/* Location 4: Chennai */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
            <FaMapMarkerAlt className="text-xl text-gray-700" />
          </div>
          <span className="mt-2 text-sm text-gray-700">Chennai</span>
        </div>
      </div>
    </div>
  );
};

export default RouteDesign;
