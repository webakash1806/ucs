import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import HolidayScrollPage from "./HolidayPageScroll";
import CallToAction from "./CallAction";
import CTA from "./CTA";



const PlaceItem = ({ data }) => {
	const navigate = useNavigate();
  
	return (
	  <div
		className="shadow-lg border-none rounded-lg mt-4 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
		onClick={() => navigate('/holiday/package/detail', { state: { ...data } })}
	  >
		{/* Image Section */}
		<div className="relative overflow-hidden rounded-t-lg">
		  <img
			src={data?.mainPhoto?.secure_url}
			alt={data?.packageName || "Holiday Location"}
			className="w-full h-72 object-cover transition-all duration-500"
		  />
		  <div className="absolute top-4 right-4 bg-main text-white px-4 py-2 rounded-md">
			<h6 className="mb-0 font-normal">From {data?.rate}/{data?.rateBy}</h6>
		  </div>
		</div>
  
		{/* Content Section */}
		<div className="p-6 bg-white rounded-b-lg">
		  <h5 className="font-medium text-[20px] mb-1 text-main">{data?.packageName}</h5>
		  <p className="text-[14px] opacity-50 mb-0 text-black">{data?.location}</p>
		</div>
	  </div>
	);
  };
  



PlaceItem.propTypes = {
	data: PropTypes.object.isRequired,
};

const PopularDesti = ({holiday,isLoading,isError}) => {


    
	const filteredDestinations = holiday.filter(
		holiday => holiday.destinationType === 'topDestination' || holiday.destinationType === 'both'
	  );
	

	return (
		<section className="ezy__travel3 light   bg-white  text-zinc-900 dark:text-white relative overflow-hidden z-10">
		
             <HolidayScrollPage holidayData={filteredDestinations}/>
			 <CallToAction/>
			 {/* <CTA/> */}

			<div className="max-w-7xl px-4 mx-auto py-12">
			<div className='text-start flex flex-col md:items-start justify-start b max-w-[30rem]'>
                <h2 className="font-bold leading-none text-3xl mb-4 text-main font-strong">
				Exclusive Holiday Packages
			  </h2>
			  <p className="text-black text-xl mb-8">
			  Experience seamless travel with UCS Cab Services, your trusted partner for holiday packages.
			  </p>

</div>

                

				<div className="grid grid-cols-12 gap-4 ">
					{holiday.map((data, i) => (
						<div
							className="col-span-12 md:col-span-6 lg:col-span-4 px-1 "
							key={i}
						>
							<PlaceItem data={data} />
						</div>
					))}
				</div>
			</div>
			
		</section>
	);
};

export default PopularDesti
