import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const CallToAction = () => {
	return (
		<section className="ezy__cta2 light relative overflow-hidden py-14 md:py-24 bg-[#08828E]">
			{/* shapes */}
			<div className="w-[400px] h-[400px] bg-white bg-opacity-5 rounded-full -m-[100px] absolute left-0 top-0"></div>
			<div className="w-[400px] h-[400px] bg-white bg-opacity-5 rounded-full -m-[100px] absolute right-0 bottom-0"></div>

			<div className="container relative px-4">
				<div className="grid grid-cols-12 justify-center text-center text-white">
					<div className="col-span-12 lg:col-span-6 lg:col-start-4 mx-auto">
						<div className="lg:px-16">
							<h2 className="text-2xl md:text-[45px] leading-none font-bold mb-6">
								Have any query?
							</h2>
							<p className="text-lg leading-6 mb-12">
								We’re here to help! Contact us on WhatsApp for quick assistance.
							</p>
							<a
								 href="https://wa.me/919520801801?text=Hi%2C%20I%20want%20to%20know%20about%20the%20package" // Pre-defined message added

								target="_blank"
								rel="noopener noreferrer"
								className=" text-[#25D366] py-3 px-7 rounded transition flex items-center justify-center gap-3"
							>
								<FontAwesomeIcon icon={faWhatsapp} size="lg" className="text-[5rem]" /> {/* Increased icon size */}
								<span className="text-[2rem] font-semibold">WhatsApp Us</span> {/* Adjusted text size */}
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CallToAction;
