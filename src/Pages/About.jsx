import React from "react";
import cabServiceImage from "../assets/car1.jpg";  // Replace with the actual path of the image
import transparency from '../assets/icons/transparency.gif'
import trust from '../assets/icons/trust.gif'
import support from '../assets/icons/support.gif'
import mission from '../assets/icons/mission.gif'
import vision from '../assets/icons/vision.gif'

const About = () => {
    return (
        <div className="py-10 bg-gray-100">
            <div className="p-4 mx-auto max-w-7xl md:px-8">
                {/* Hero Section */}
                <h1 className="mb-4 text-4xl font-[600] text-center text-main">About UCS</h1>
                <section className="flex flex-col items-center sm:block">
                    <img src={cabServiceImage} alt="Cab service" className="float-right object-cover w-full md:w-[22rem] lg:w-[25rem] sm:w-[18rem] ml-2 h-full rounded-md shadow-lg md:ml-16" />
                    <p className='text-base  text-[#535760] mb-4'>

                        At <strong> UCS Cab Services</strong>, we are dedicated to offering premium and reliable transportation solutions throughout India. Our mission is to revolutionize the way people travel by providing top-quality cab services with a focus on customer safety, comfort, and convenience. With a modern fleet of vehicles and a well-connected network of professional drivers, UCS ensures every journey is seamless and enjoyable, whether you're traveling within bustling urban centers or remote areas.
                    </p>
                    <p className='text-base  text-[#535760] mb-4'>

                        Our services are built on the principles of transparency, reliability, and customer satisfaction. From timely pick-ups to easy booking processes and 24/7 customer support, we prioritize your needs at every step. UCS envisions becoming India’s most trusted transportation partner, redefining travel experiences with cutting-edge technology and sustainable practices.
                    </p>
                    <p className='text-base  text-[#535760] mb-4'>

                        Whether you need a quick ride to the airport, a long-distance journey, or a corporate transport solution, UCS Cab Services is here to deliver the best-in-class experience with professionalism and care. Explore more about our mission, values, and vision, and book your next ride with us today!
                    </p>

                </section>

                {/* Mission and Vision */}
                <section id="mission" className="py-10">
                    <h2 className="mb-6 text-3xl font-[600] text-center text-main">Our Mission & Vision</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="mb-3 text-xl font-semibold text-center text-main">Our Mission</h3>
                            <img src={mission} className=" w-[4.5rem] sm:w-[5rem] mr-4 float-left" alt="" />
                            <p className="mb-4 leading-relaxed text-gray-600">
                                Our mission at UCS Cab Services is to transform the transportation landscape in India by providing reliable, safe, and highly convenient cab services that cater to the diverse needs of our customers. We are committed to not only meeting but consistently exceeding the expectations of our passengers.
                            </p>
                            <p className="mb-4 leading-relaxed text-gray-600">

                                Reliability is at the core of everything we do, ensuring that our cabs are always available when needed, regardless of the time or place. Safety is paramount, and we take every measure to guarantee that our vehicles and drivers adhere to the highest standards of security and professionalism.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="mb-3 text-xl font-semibold text-center text-main">Our Vision</h3>
                            <img src={vision} className=" w-[4.3rem] sm:w-[4.7rem] mr-4 float-left" alt="" />

                            <p className="mb-4 leading-relaxed text-gray-600">

                                At UCS Cab Services, our vision is to become India's most trusted transportation partner, offering seamless travel experiences across the country. From busy urban centers to remote areas, we aim to provide reliable and comfortable journeys that meet the unique needs of every passenger.
                            </p>
                            <p className="mb-4 leading-relaxed text-gray-600">

                                We are dedicated to leveraging cutting-edge technology and adopting sustainable practices to redefine travel in India. By enhancing service efficiency and reducing environmental impact, we strive to set new standards for the future of transportation.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <div className='flex flex-wrap items-center justify-center flex-grow gap-5 my-16'>
                    <div className='flex items-center max-w-[20rem] shadow-md py-1 gap-1 bg-lightSky border-main border rounded-md'>
                        <img src={transparency} alt="Transparency icon" className='w-[5rem] rounded-md' />
                        <div>
                            <h2 className='font-semibold text-[1.1rem] mb-1'>100% Transparency</h2>
                            <p className='text-[0.9rem] leading-5'>We ensure complete clarity in all our services and dealings.</p>
                        </div>
                    </div>

                    <div className='flex items-center max-w-[20rem] shadow-md py-1 gap-1 bg-lightSky border-main border rounded-md'>
                        <img src={support} alt="Transparency icon" className='w-[5rem] rounded-md' />
                        <div>
                            <h2 className='font-semibold  text-[1.1rem] mb-1'>24/7 Customer Support</h2>
                            <p className='text-[0.9rem] leading-5'>We maintain open communication with clients at every step.</p>
                        </div>
                    </div>

                    <div className='flex items-center max-w-[20rem] shadow-md py-1 gap-1 bg-lightSky border-main border rounded-md'>
                        <img src={trust} alt="Trust icon" className='w-[5rem] rounded-md' />
                        <div>
                            <h2 className='font-semibold text-[1.1rem] mb-1'>Trusted & Quality Service</h2>
                            <p className='text-[0.9rem] leading-5'>Providing reliable and top-notch service is our utmost priority.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
