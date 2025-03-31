import { motion } from 'framer-motion';
// Import airport image
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAirportCabData } from '../../Redux/Slices/dynamicSlice';
import MainForm from '../../Components/MainForm';
import WhyWe from './Why';
import AoChale from './AooChale';
import HowWeWork from './HowWeWork';


const faqItems = [
    { question: 'How do I book an airport taxi service?', answer: 'You can book our airport taxi service online, via WhatsApp, or by calling our support team.' },
    { question: 'Do you provide airport transfer services 24/7?', answer: 'Yes, our airport transfer service operates 24/7 for timely pickups and drops.' },
    { question: 'How much does an airport city taxi cost?', answer: 'The cost depends on the pickup location and vehicle type. Contact us for a quote.' },
    { question: 'Can I schedule an airport taxi in advance?', answer: 'Yes, you can pre-book an airport taxi to ensure on-time arrival at the airport.' },
    { question: 'Do you track flight arrivals for pickups?', answer: 'Yes, we monitor flight arrivals to adjust pickup times accordingly.' },
    { question: 'Are your airport transfer services available for multiple passengers?', answer: 'Yes, we provide various vehicle options, including sedans, SUVs, and minivans, for group travel.' },
    { question: 'Do you offer fixed-rate pricing for airport taxis?', answer: 'Yes, we have transparent and fixed-rate pricing for airport transfers with no hidden charges.' },
    { question: 'Will I be charged extra for luggage in an airport taxi?', answer: 'No, we do not charge extra for standard luggage. For oversized luggage, please inform us in advance.' },
    { question: 'Do you offer airport taxis for corporate travelers?', answer: 'Yes, we provide premium and executive airport taxi services for corporate clients.' },
    { question: 'Why should I choose your airport taxi service?', answer: 'Our airport taxi service is reliable, punctual, and available 24/7, ensuring a hassle-free airport transfer experience.' },
];



const AirportCabService = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState("")
    const fetchData = async () => {
        const res = await dispatch(getAirportCabData())
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

export default AirportCabService;
