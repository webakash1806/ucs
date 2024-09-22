import about1 from '../assets/car1.avif';
import transparency from '../assets/icons/transparency.avif'
import trust from '../assets/icons/trust.avif'
import support from '../assets/icons/support.avif'

const HomeSection1 = () => {

    return (
        <div className='px-[5vw] py-20 flex flex-col items-center justify-center md:px-[6vw] lg:px-[8rem] bg-[#F5F6F7]'>
            <h1 className="text-3xl font-[600] mb-6 text-gray-800 md:text-4xl">
                Welcome to UCS
            </h1>
            <div className='flex flex-col items-center justify-center gap-8 pb-10 sm:block'>
                <img src={about1} className='w-full sm:w-[16rem] border h-full drop-shadow-[-3px_4px_4px_#808080] sm:mr-3 md:w-[19rem] lg:w-[25rem] float-left relative z-[10]' alt="Main visual" />
                <h2 className='mb-1 text-xl font-semibold md:text-2xl text-main'>
                    Embark on a Journey with UCS Cab Services
                </h2>
                <p className='text-base  text-[#535760] mb-4'>
                    Embark on a Journey with UCS Cab Services
                    When it comes to seamless and dependable transportation, UCS Cab Services stands out as a leader in the industry. We are committed to offering top-tier transportation solutions that cater to a wide range of customer needs. Whether you&apos;re traveling for work, attending a special event, or simply exploring the city, UCS Cab ensures that your journey is smooth, safe, and comfortable.
                </p>
                <p className='text-base  text-[#535760] mb-4'>
                    <strong>Our services are available 24/7</strong>, meaning you can rely on us any time, day or night. With a team of highly professional and courteous drivers, we prioritize your safety and comfort above all else. Our drivers are well-trained, experienced, and dedicated to providing a hassle-free ride, ensuring that you reach your destination on time and in style. Whether you’re hurrying to a business meeting or taking a leisurely trip, UCS Cab guarantees an enjoyable ride from the moment you step in until you reach your destination.
                </p>
                <h2 className='mb-1 text-xl font-semibold md:text-2xl text-main'>
                    India&apos;s Premier Cab Service
                </h2>
                <p className='text-base  text-[#535760] mb-4'>At
                    <strong> UCS Cab</strong>,  we take pride in being recognized as one of the best cab services in India. We have built our reputation on a foundation of punctuality, safety, and an unwavering commitment to customer satisfaction. With our extensive network spanning major cities across the country, we offer unmatched convenience and reliability for all your transportation needs.


                </p>


            </div>

            <div className='flex flex-wrap items-center justify-center flex-grow gap-5'>
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
    );
}

export default HomeSection1;