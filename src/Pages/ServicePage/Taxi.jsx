import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAirportCabData, getTaxiData } from '../../Redux/Slices/dynamicSlice';
import MainForm from '../../Components/MainForm';
import WhyWe from './Why';
import AoChale from './AooChale';
import HowWeWork from './HowWeWork';


const faqItems = [
    { question: 'What are the payment options for hourly car rentals?', answer: 'UCS Cabs offers various payment options for hourly car rentals, including credit/debit cards, net banking, and digital wallets.' },
    { question: 'Is there a minimum rental period for UCS Cabs?', answer: 'Yes, UCS Cabs typically has a minimum rental period, which may vary based on the type of service and location.' },
    { question: 'Can I rent a car for inter-city travel?', answer: 'Absolutely! UCS Cabs specializes in inter-city travel with our outstation rental services.' },
    { question: 'What is UCS Cabs\' cancellation policy?', answer: 'Cancellations made 24 hours prior to the trip are free of charge. For details, refer to our terms and conditions.' },
    { question: 'Are the prices inclusive of fuel costs?', answer: 'Yes, UCS Cabs rental prices typically include fuel costs, but it’s best to confirm during booking.' },
    { question: 'What safety measures does UCS Cabs implement?', answer: 'UCS Cabs ensures all vehicles are sanitized before and after each trip, and follows COVID-19 safety guidelines.' },
    { question: 'How can I book a UCS Cab for corporate travel?', answer: 'Corporate travel bookings can be easily made online or through our dedicated support team. UCS Cabs offers special rates and packages for businesses.' },
    { question: 'Are UCS Cabs available for airport transfers?', answer: 'Yes, UCS Cabs offers convenient and timely airport transfers to and from major airports in your city.' },
];


const Taxi = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState("")
    const fetchData = async () => {
        const res = await dispatch(getTaxiData())
        console.log(res);
        
        setData(res?.payload?.sections[0])
    }

    console.log(data)
    useEffect(() => {
        fetchData()
    }, [dispatch])
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section className="relative bg-center bg-cover h-96 py-[17rem]" style={{ backgroundImage: `url(${data?.photo?.secure_url})` }}>

                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-black">
                    <MainForm />
                </div>
            </section>

            <AoChale />

            {/* Round Trip Service Overview Section */}
            <section className="py-12 px-[5vw] md:px-[10vw] bg-white">
                <div className="container px-4 mx-auto">

                    <motion.div
                        className="space-y-6 text-lg text-black"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className='p1'
                            dangerouslySetInnerHTML={{ __html: data?.description }}
                        />
                    </motion.div>
                </div>
            </section>

            <HowWeWork />

            <WhyWe />

            <section className="py-12 px-6 md:px-20 bg-white">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <motion.div key={index} className="p-4 border rounded-lg shadow-md" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <h3 className="font-semibold text-lg">{item.question}</h3>
                            <p className="text-gray-600 text-sm">{item.answer}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Taxi;
