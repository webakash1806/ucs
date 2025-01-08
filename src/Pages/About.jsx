// Replace with the actual path of the image
import transparency from '../assets/icons/transparency.avif'
import trust from '../assets/icons/trust.avif'
import support from '../assets/icons/support.avif'
import mission from '../assets/icons/mission.avif'
import vision from '../assets/icons/vision.avif'
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAbout } from "../Redux/Slices/dynamicSlice";

const About = () => {


    const dispatch = useDispatch()
    const [data, setData] = useState("")
    const fetchData = async () => {
        const res = await dispatch(getAbout())
        setData(res?.payload?.sections)
    }

    console.log(data)
    useEffect(() => {
        fetchData()
    }, [dispatch])

    return (
        <div className="py-10 bg-gray-100">
            <div className="p-4 mx-auto max-w-7xl md:px-8 ">
                {/* Hero Section */}
                <h1 className="mb-4 text-4xl font-[600] text-center text-main">{data[0]?.title}</h1>
                <section className="flex flex-col items-center sm:block">
                    <img src={data[0]?.photo?.secure_url} alt="Cab service" className="float-right object-cover w-full md:w-[22rem] lg:w-[25rem] sm:w-[18rem] ml-2 h-full rounded-md shadow-lg md:ml-16" />
                    <div
                        dangerouslySetInnerHTML={{ __html: data[0]?.description }}
                    />

                </section>

                {/* Mission and Vision */}
                <section id="mission" className="py-10">
                    <h2 className="mb-6 text-3xl font-[600] text-center text-main">Our Mission & Vision</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="mb-3 text-xl font-semibold text-center text-main">{data[3]?.title}</h3>
                            <img src={mission} className=" w-[4.5rem] sm:w-[5rem] mr-4 float-left" alt="icon" />
                            <div
                                dangerouslySetInnerHTML={{ __html: data[1]?.description }}
                            />
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg">
                            <h3 className="mb-3 text-xl font-semibold text-center text-main">{data[4]?.title}</h3>
                            <img src={vision} className=" w-[4.3rem] sm:w-[4.7rem] mr-4 float-left" alt="icon" />

                            <div
                                dangerouslySetInnerHTML={{ __html: data[2]?.description }}
                            />
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
