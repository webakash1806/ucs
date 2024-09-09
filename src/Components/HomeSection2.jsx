import React from 'react';
import car1 from '../assets/car1.jpg';
import car2 from '../assets/car2.jpg';

const HomeSection2 = () => {

    const headings = [
        {
            title: "Hit the Journey with UCS Cab Services",
            description: "Experience seamless and reliable cab services with UCS Cab, where we offer top-tier transportation solutions tailored to your needs. Our service is available around the clock, providing 24/7 support with professional drivers dedicated to ensuring your safety and comfort. Whether you're heading to an important meeting, a special event, or simply need a reliable ride, UCS Cab guarantees a smooth and pleasant journey from start to finish."
        },
        {
            title: "Best Cab Service in India",
            description: "Providing best-in-class cab services across India, UCS Cab focuses on punctuality, safety, and exceptional customer satisfaction. We are your ideal travel partner, covering major cities and offering a variety of ride options tailored to your specific needs. From daily commutes to long-distance travel, our modern fleet and experienced drivers ensure that every ride is comfortable, timely, and meets the highest standards of service excellence."
        },
        {
            title: "Explore India's Wonders with UCS Cab",
            description: "Discover the incredible beauty and diversity of India with UCS Cab’s affordable and convenient ride services. Our fleet is designed to make travel through iconic destinations effortless and enjoyable. Whether you are exploring vibrant urban landscapes or venturing into serene and hidden gems, UCS Cab is your trusted travel companion. Enjoy the comfort and ease of our rides as you explore India's rich cultural heritage and breathtaking landscapes with confidence."
        },
        {
            title: "UCS Cab: Revolutionizing Transportation in India",
            description: "At UCS Cab, we are revolutionizing the way you travel by ensuring you reach your destination with the utmost comfort and care. Our modern fleet of vehicles, combined with highly skilled drivers, offers a premium transportation experience at competitive rates. Whether for business trips, leisure travel, or any other transportation needs, UCS Cab delivers unparalleled service and reliability, making every journey an exceptional experience."
        },
        {
            title: "Travel Smart with UCS Cab",
            description: "Say goodbye to the hassle of traditional transportation methods with UCS Cab’s smart and convenient ride booking options. Enjoy the freedom of managing your travel from the palm of your hand with our easy-to-use mobile app. We offer flexible pricing models and instant booking capabilities, ensuring that your journey is always straightforward and stress-free. With UCS Cab, experience a new level of convenience and efficiency in your daily travels and special trips alike."
        }
    ];



    return (
        <div className='w-full px-[4vw] lg:px-[6vw] flex flex-col items-center justify-center bg-[#F5F6F7]  py-20 pt-6'>
            <h1 className='text-3xl md:text-4xl font-semibold pb-10  text-dark '>
                UCS Cabs : Aao Chalein
            </h1>
            <div className='w-fit flex flex-col sm:block p-4 bg-[#cedfe427] rounded-lg shadow-md '>
                <img src={car1} className='float-left w-full sm:w-[40vw] md:w-[30vw] lg:w-[25vw] sm:mr-3' alt="Main visual" />

                <h2 className='text-xl md:text-2xl font-semibold text-main mb-1'>
                    {headings[0].title}
                </h2>
                <p className='text-base  text-[#535760] mb-4'>
                    {headings[0].description}
                </p>
                <h2 className='text-xl md:text-2xl font-semibold text-main mb-1'>
                    {headings[1].title}
                </h2>
                <p className='text-base  text-[#535760] mb-4'>
                    {headings[1].description}
                </p>
                <h2 className='text-xl md:text-2xl font-semibold text-main mb-1'>
                    {headings[2].title}
                </h2>
                <p className='text-base  text-[#535760] mb-4'>
                    {headings[2].description}
                </p>
                <img src={car2} className='float-right w-full sm:w-[40vw] md:w-[30vw] lg:w-[25vw] sm:ml-3' alt="Main visual" />

                <h2 className='text-xl md:text-2xl font-semibold text-main mb-1'>
                    {headings[3].title}
                </h2>
                <p className='text-base  text-[#535760] mb-4'>
                    {headings[3].description}
                </p>

                <h2 className='text-xl md:text-2xl font-semibold text-main mb-1'>
                    {headings[4].title}
                </h2>
                <p className='text-base  text-[#535760] mb-4'>
                    {headings[4].description}
                </p>


            </div>
        </div>
    );
};

export default HomeSection2;
