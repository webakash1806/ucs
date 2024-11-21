import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import HolidayScrollPage from "./HolidayPageScroll";

const placeData = [
	{
		price: "$325",
		img: "https://cdn.easyfrontend.com/pictures/search1_1.png",
		name: "Toledo",
		location: "United State",
	},
	{
		price: "$325",
		img: "https://cdn.easyfrontend.com/pictures/search1_2.png",
		name: "Noonu Atoll",
		location: "United State",
	},
	{
		price: "$325",
		img: "https://cdn.easyfrontend.com/pictures/search1_3.png",
		name: "Toledo",
		location: "United State",
	},
	{
		price: "$325",
		img: "https://cdn.easyfrontend.com/pictures/search1_4.png",
		name: "Kaafu Atoll",
		location: "United State",
	},
	{
		price: "$325",
		img: "https://cdn.easyfrontend.com/pictures/search1_5.png",
		name: "Barcelona",
		location: "Spain",
	},
	{
		price: "$325",
		img: "https://cdn.easyfrontend.com/pictures/search1_6.png",
		name: "Hiroshima",
		location: "Japan",
	},
	{
		price: "$325",
		img: "https://cdn.easyfrontend.com/pictures/search1_7.png",
		name: "Tibidabo",
		location: "Barcelona",
	},
	{
		price: "$325",
		img: "https://cdn.easyfrontend.com/pictures/search1_8.png",
		name: "Brussels",
		location: "Belgium",
	},
];

const PlaceItem = ({ data }) => {
   
	const navigate=useNavigate()

	console.log(data);
	

	return (
		<div className="dark:bg-[#404156] shadow-lg border-none rounded-none mt-4 cursor-pointer"   onClick={() => navigate('/holiday/package/detail', { state: { ...data } })} >
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
PlaceItem.propTypes = {
	data: PropTypes.object.isRequired,
};

const PopularDesti = ({holiday,isLoading,isError}) => {

    console.log(holiday,isLoading,isError)

	return (
		<section className="ezy__travel3 light py-14  bg-white  text-zinc-900 dark:text-white relative overflow-hidden z-10">
		
             <HolidayScrollPage holidayData={holiday}/>

			<div className="max-w-7xl px-4 mx-auto">
			
                <h2 className="font-bold leading-none text-3xl mb-4 text-black">
                Top Trending Destinations
			  </h2>
                

				<div className="grid grid-cols-12 gap-4">
					{holiday.map((data, i) => (
						<div
							className="col-span-12 md:col-span-6 lg:col-span-3 px-1 "
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
