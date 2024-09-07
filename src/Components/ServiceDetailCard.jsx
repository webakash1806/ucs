
import React from 'react';

const ServiceDetailCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="relative flex min-w-[18.5rem] max-w-[22rem]  mx-auto my-4 border border-gray-100 bg-[#ffffff] flex-col h-[15rem] overflow-hidden transition-all transform shadow-[0px_2px_10px_-8px_#808080] rounded-xl hover:scale-105 hover:shadow-lg">

            {/* Angled Decorative Element */}
            <div className="absolute inset-0 w-full h-1/3 bg-gradient-to-tr from-main to-dark transform -skew-y-6 -rotate-3 opacity-90 shadow-inner"></div>

            {/* Content Section */}
            <div className="relative z-10 flex flex-col items-center justify-between flex-1 p-8 flex-glow">
                {/* Icon */}
                <div className="p-5 transition-transform duration-300 transform bg-white rounded-full shadow-lg hover:scale-110">
                    <div className="text-4xl text-[#525FE1]">
                        {Icon}
                    </div>
                </div>

                {/* Title and Description */}
                <div className="mt-4 space-y-3 text-center">
                    <h3 className="text-xl font-extrabold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>


            </div>
        </div>
    );
};

export default ServiceDetailCard;