import { motion } from 'framer-motion';
// Import car1 image
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getRoundCabData } from '../../Redux/Slices/dynamicSlice';
import MainForm from '../../Components/MainForm';
import WhyWe from './Why';
import AoChale from './AooChale';
import HowWeWork from './HowWeWork';

const faqItems = [
    { question: 'What is a round trip taxi service?', answer: 'A round trip taxi service allows you to travel to your destination and return in the same taxi without booking separate rides.' },
    { question: 'How can I book a round trip taxi?', answer: 'You can book through our website, WhatsApp, or by calling our customer support.' },
    { question: 'Do you provide outstation round trip cabs?', answer: 'Yes, we offer round trip cabs for outstation travel across multiple cities in India.' },
    { question: 'What are the charges for a round trip taxi service?', answer: 'The fare depends on the destination, vehicle type, and total distance covered. Contact us for a quote.' },
    { question: 'Can I hire a round trip taxi for a multi-day journey?', answer: 'Yes, we provide flexible multi-day round trip taxi services for long trips.' },
    { question: 'What vehicle options are available for round trips?', answer: 'We offer hatchbacks, sedans, SUVs, and MUVs to suit different travel needs.' },
    { question: 'Is there a waiting charge if I stop for sightseeing during a round trip?', answer: 'We allow short stops at no extra cost, but extended waiting times may have additional charges.' },
    { question: 'Do you provide round trip cabs for corporate or family travel?', answer: 'Yes, we have comfortable and spacious cabs ideal for corporate and family travel.' },
    { question: 'Is your round trip taxi service available 24/7?', answer: 'Yes, our round trip taxi service operates 24/7 to provide convenience at any time.' },
    { question: 'Why should I choose your round trip taxi service?', answer: 'We provide reliable, affordable, and comfortable round trip cabs with professional drivers for a hassle-free travel experience.' },
];


const RoundTripService = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [data, setData] = useState("")
    const fetchData = async () => {
        const res = await dispatch(getRoundCabData())
        setData(res?.payload?.sections[0])
    }

   
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
            <section className="py-12 px-[5vw] md:px-[10vw] bg-white ">
                <div className="container px-4 mx-auto">
                    <motion.div
                        className="space-y-6 text-lg "
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


export default RoundTripService;
