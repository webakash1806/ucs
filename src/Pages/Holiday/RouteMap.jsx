import React from 'react';
import img from '../../assets/route1.jpg'
import { FaMapMarkerAlt } from 'react-icons/fa'; 
import routeimg from '../../assets/route.avif'

const RouteDesign = ({data}) => {
  
   console.log("routes is",data);
   


  return (
    <div className="relative  bg-white mt-4 " > 
      {/* Curved Line Image (Optional, can be used as background if needed) */}
      {/* <div className="absolute inset-x-0 opacity-100 hidden xl:px-44 top-2 md:block md:px-20 lg:px-100 ">
        <img
          className="w-full"
          src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
          alt=""
        />
      </div> */}

      {/* Location Route Steps */}
      <div className="relative flex justify-around items-center">

        {data.map((val,index)=>{
           return(
            <div className="flex flex-col items-center relative">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full ">
              <FaMapMarkerAlt className="text-xl text-gray-700" />
              <img src={routeimg} alt="" />
            </div>
            <span className="mt-2 text-lg font-bold  text-main">{val}</span>
            {/* Curved Line to the next location */}
         
          </div>
           )
        })}



      </div>
    </div>
  );
};

export default RouteDesign;
