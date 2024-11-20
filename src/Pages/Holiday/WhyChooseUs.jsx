import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faRoute,
	faSuitcaseRolling,
	faCar,
	faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const serviceList = [
	{
		icon: faRoute,
		title: "Customized Holiday Packages",
		description:
			"Explore top-rated holiday packages tailored just for you. Discover the beauty of Uttarakhand and experience a perfect blend of adventure, nature, and relaxation.",
	},
	{
		icon: faSuitcaseRolling,
		title: "Seamless Travel Experience",
		description:
			"Our Dehradun travel experts offer hassle-free booking and curated holiday packages designed to maximize comfort and enjoyment.",
	},
	{
		icon: faCar,
		title: "Reliable UCS Cab Services",
		description:
			"Travel across Dehradun with UCS Cab services, known for safe, efficient, and comfortable rides. Experience premium taxi service for a smooth journey.",
	},
	{
		icon: faMapMarkedAlt,
		title: "Local Expertise",
		description:
			"Benefit from our in-depth knowledge of Dehradun and Uttarakhand, ensuring a memorable experience in the region's scenic destinations.",
	},
];

const ServiceItem = ({ service }) => (
	<div className="bg-white dark:bg-slate-800 shadow h-full p-3 md:mt-4">
		<div className="p-4 lg:p-8">
			<div className="text-[40px] text-blue-600 mb-2">
				<FontAwesomeIcon icon={service.icon} />
			</div>
			<h5 className="text-xl font-medium my-6">{service.title}</h5>
			<p className="opacity-75 mt-4">{service.description}</p>
		</div>
	</div>
);

ServiceItem.propTypes = {
	service: PropTypes.object.isRequired,
};

function ShapeOne() {
	return (
		<svg
			className="absolute -bottom-[20%] left-0 -z-[1]"
			width="405"
			height="626"
			viewBox="0 0 405 626"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="-302.65"
				y="296.986"
				width="433.92"
				height="140"
				rx="73.8464"
				transform="rotate(-33.796 -302.65 296.986)"
				fill="#7434F8"
				fillOpacity="0.5"
			/>
			<rect
				x="-315"
				y="502.403"
				width="666.584"
				height="140"
				rx="73.8464"
				transform="rotate(-33.796 -315 502.403)"
				fill="#FAA515"
				fillOpacity="0.5"
			/>
		</svg>
	);
}

function ShapeTwo() {
	return (
		<svg
			className="absolute -top-[20%] right-0 -z-[1]"
			width="340"
			height="658"
			viewBox="0 0 495 778"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="389" cy="389" r="389" fill="#0d6efd" fillOpacity="0.19" />
		</svg>
	);
}

const WhyWe = () => {
	return (
		<section className="ezy__service20 light py-14 md:py-24 bg-gray-50  text-zinc-900 dark:text-white relative z-[1] overflow-hidden">
			<ShapeOne />
			<ShapeTwo />

			<div className="max-w-7xl px-4 mx-auto">
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12 md:col-span-4">
						<h2 className="text-3xl md:text-[40px] font-bold leading-normal mb-4 text-black">
							Why Choose Us for Your Holiday in Dehradun
						</h2>
						<p className="text-[17px] leading-normal opacity-80 text-black">
							Plan your dream vacation with our expertly designed holiday packages, personalized travel experiences, and premium UCS cab services in Dehradun.
						</p>
					</div>
					<div className="col-span-12 md:col-span-8">
						<div className="grid grid-cols-2 gap-6 gap-x-5">
							<div className="col-span-2 md:col-span-1">
								{serviceList.slice(0, 2).map((service, i) => (
									<div key={i}>
										<ServiceItem service={service} />
									</div>
								))}
							</div>

							<div className="col-span-2 md:col-span-1 md:mt-12">
								{serviceList.slice(2, 4).map((service, i) => (
									<div key={i}>
										<ServiceItem service={service} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhyWe;
