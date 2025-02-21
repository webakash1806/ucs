import car1 from '../../assets/car1.avif';
import car2 from '../../assets/car2.avif';
import car3 from '../../assets/car3.avif';

const AoChale = () => {
    const data = {
        title: "UCS CAB: Your Trusted Travel Partner",
        sections: [
            {
                title: "Ride with Comfort and Safety",
                description: "UCS Cab is your go-to choice for reliable, affordable, and comfortable rides. Whether you're commuting to work, heading to the airport, or exploring a new city, our well-maintained cabs and professional drivers ensure a smooth journey. We provide a seamless booking experience with multiple payment options, including digital wallets and cash. At UCS Cab, customer safety is our top priority, with trained drivers and round-the-clock customer support, making every ride stress-free and enjoyable.",
                image: car1
            }
        ]
    };

    return (
        <div className='w-full px-6 lg:px-6 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 pb-[6rem] pt-[3rem] '>
            <h1 className='text-4xl font-bold pb-8 text-main text-center uppercase tracking-wide'>
                {data.title}
            </h1>
            <div className='w-full max-w-7xl flex flex-col lg:flex-row items-center justify-around bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 border-l-4 border-main p-4 cursor-pointer'>
                <div className="flex justify-center">
                    <div className='md:max-w-[28rem] w-full aspect-w-4 aspect-h-3 relative sm:mb-5 md:mb-0 sm:mr-16 md:mr-0 lg:mr-20' data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="800">
                        <img src={car1} className='w-full h-full drop-shadow-[-3px_4px_4px_#808080] relative z-[10]' alt="Main visual" />
                        <img src={car2} alt="Supplementary image" className='w-[60%] z-[20] h-auto hidden lg:block absolute drop-shadow-[0px_5px_6px_#808080] bottom-[-100px] right-[-100px]' />
                        <img src={car3} alt="Supplementary image" className='w-[60%] z-[20] h-auto hidden lg:block absolute drop-shadow-[0px_5px_6px_#808080] bottom-[-100px] left-[0px]' />
                    </div>
                </div>
                <div className='lg:w-1/2 px-6 text-center lg:text-left '>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-3 group-hover:text-main transition-colors duration-300'>
                        {data.sections[0].title}
                    </h2>
                    <p className='text-gray-600 text-md leading-relaxed'>
                        {data.sections[0].description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AoChale;
