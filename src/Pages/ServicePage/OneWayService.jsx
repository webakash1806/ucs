import { motion } from 'framer-motion';
// Import car1 image
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOnewayData } from '../../Redux/Slices/dynamicSlice';
import MainForm from '../../Components/MainForm';
import WhyWe from './Why';
import AoChale from './AooChale';
import HowWeWork from './HowWeWork';

const faqItems = [
    { question: 'How can I book a one-way taxi near me?', answer: 'You can book a one-way taxi through our website, WhatsApp, or by calling our customer support.' },
    { question: 'Do you offer one-way drop taxi service to any city?', answer: 'Yes, we provide one-way taxi services to multiple cities across India at affordable rates.' },
    { question: 'What are the charges for a one-way taxi service?', answer: 'The charges depend on the distance, vehicle type, and route. Contact us for a customized fare.' },
    { question: 'Can I get a one-way taxi near me at any time?', answer: 'Yes, our one-way taxi service is available 24/7 for hassle-free travel.' },
    { question: 'Do I need to pay a round-trip fare for a one-way drop taxi service?', answer: 'No, we offer special one-way fares, so you only pay for the distance traveled.' },
    { question: 'What vehicle options are available for a one-way taxi service?', answer: 'We provide hatchbacks, sedans, SUVs, and MUVs for a comfortable journey.' },
    { question: 'Can I pre-book a one-way taxi for a specific date and time?', answer: 'Yes, you can pre-book our one-way taxi service to avoid last-minute hassles.' },
    { question: 'Is your one-way taxi service safe and reliable?', answer: 'Yes, all our taxis are GPS-tracked and driven by professional drivers for a safe journey.' },
    { question: 'Do you offer doorstep pickup and drop for one-way trips?', answer: 'Yes, we provide convenient doorstep pickup and drop-off services.' },
    { question: 'Why should I choose your one-way taxi service?', answer: 'We offer affordable pricing, professional drivers, comfortable vehicles, and 24/7 availability, making us the best one-way taxi provider.' },
];


const OneWayService = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState("")
    const fetchData = async () => {
        const res = await dispatch(getOnewayData())
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
            <section className="py-12 px-[5vw] md:px-[10vw] bg-white">
                <div className="container px-4 mx-auto">

                    <motion.div
                        className="space-y-6 text-lg"
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

            {/* FAQ Section */}
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

export default OneWayService;
