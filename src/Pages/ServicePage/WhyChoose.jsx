import React from 'react';
import { BsMegaphone } from 'react-icons/bs';
import { FaBriefcase, FaLayerGroup, FaUserSecret } from 'react-icons/fa';
import { GiLightBulb } from 'react-icons/gi';
// import logo from '../../assets/bjp/bjplogo.png';
// import pattern from '../../assets/pattern/pattern9.jpg';

const WhyChoose = () => {
    return (
        <section className="relative bg-gray-100 z-10">
            <section className="py-10 max-w-7xl mx-auto">
                <div className="flex items-center  space-x-2 mx-auto justify-center">
                    <FaBriefcase className=" text-2xl text-main" />
                    <h2 className="text-3xl font-bold  text-center">
                        Why Choose UCS Cab
                    </h2>
                </div>

                <ul className="max-w-3xl mx-auto mt-16 space-y-12">
                    <li className="relative flex items-start">
                        <div className="-ml-0.5 absolute mt-0.5 top-14 left-8 w-px border-l-4 border-dotted border-gray-300 h-full" aria-hidden="true"></div>
                        <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-white rounded-full shadow">
                            <FaUserSecret className="w-10 h-10 text-main" />
                        </div>
                        <div className="ml-6">
                            <h3 className="text-lg font-semibold text-black">Safe and Reliable Rides</h3>
                            <p className="mt-4 text-base text-gray-600">
                                UCS Cab ensures the highest level of safety and reliability with well-trained drivers and well-maintained vehicles to provide a seamless travel experience.
                            </p>
                        </div>
                    </li>

                    <li className="relative flex items-start">
                        <div className="-ml-0.5 absolute mt-0.5 top-14 left-8 w-px border-l-4 border-dotted border-gray-300 h-full" aria-hidden="true"></div>
                        <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-white rounded-full shadow">
                            <FaLayerGroup className="w-10 h-10 text-main" />
                        </div>
                        <div className="ml-6">
                            <h3 className="text-lg font-semibold text-black">Affordable and Transparent Pricing</h3>
                            <p className="mt-4 text-base text-gray-600">
                                We offer competitive pricing with no hidden charges, ensuring that you get the best value for your money with UCS Cab.
                            </p>
                        </div>
                    </li>

                    <li className="relative flex items-start">
                        <div className="-ml-0.5 absolute mt-0.5 top-14 left-8 w-px border-l-4 border-dotted border-gray-300 h-full" aria-hidden="true"></div>
                        <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-white rounded-full shadow">
                            <BsMegaphone className="w-10 h-10 text-main" />
                        </div>
                        <div className="ml-6">
                            <h3 className="text-lg font-semibold text-black">24/7 Customer Support</h3>
                            <p className="mt-4 text-base text-gray-600">
                                Our dedicated customer support team is available round the clock to assist you with any issues or queries during your journey.
                            </p>
                        </div>
                    </li>

                    <li className="relative flex items-start">
                        <div className="relative flex items-center justify-center flex-shrink-0 w-16 h-16 bg-white rounded-full shadow">
                            <GiLightBulb className="w-10 h-10 text-main" />
                        </div>
                        <div className="ml-6">
                            <h3 className="text-lg font-semibold text-black">Eco-Friendly and Modern Fleet</h3>
                            <p className="mt-4 text-base text-gray-600">
                                UCS Cab is committed to sustainability by incorporating eco-friendly and fuel-efficient vehicles in our fleet to reduce carbon emissions and promote a greener environment.
                            </p>
                        </div>
                    </li>
                </ul>
            </section>
        </section>
    );
};

export default WhyChoose;
