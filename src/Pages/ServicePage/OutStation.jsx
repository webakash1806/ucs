import { motion } from 'framer-motion';
// Import car1 image
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOnewayData, getOutStation } from '../../Redux/Slices/dynamicSlice';
import MainForm from '../../Components/MainForm';
import WhyWe from './Why';
import AoChale from './AooChale';
import HowWeWork from './HowWeWork';

const faqItems = [
    { question: 'How can I find an outstation taxi near me?', answer: 'You can book an outstation taxi through our website, WhatsApp, or by calling us for a smooth travel experience.' },
    { question: 'Do you offer one-way and round-trip outstation taxi services?', answer: 'Yes, we provide both one-way and round-trip taxi services for your convenience.' },
    { question: 'What are the charges for outstation taxi service?', answer: 'The charges depend on the distance, vehicle type, and trip duration. Contact us for a quote.' },
    { question: 'Can I book an outstation taxi near me for multiple days?', answer: 'Yes, we offer flexible rental options for single-day or multi-day outstation trips.' },
    { question: 'Do your outstation cabs come with a professional driver?', answer: 'Yes, all our outstation taxis are driven by professional and experienced drivers.' },
    { question: 'Can I rent an outstation taxi for Char Dham Yatra or hill stations?', answer: 'Yes, we offer outstation taxi services for Char Dham Yatra, hill stations, and popular tourist destinations.' },
    { question: 'Is your outstation taxi service available 24/7?', answer: 'Yes, we operate round the clock to ensure you get a taxi whenever required.' },
    { question: 'Do you offer the best cab service for outstation travel with family?', answer: 'Yes, we provide spacious and comfortable cabs, including SUVs and MUVs, ideal for family travel.' },
    { question: 'How far in advance should I book an outstation taxi?', answer: 'It’s best to book at least 24 hours in advance to ensure vehicle availability.' },
    { question: 'Why should I choose your outstation taxi service?', answer: 'We offer affordable pricing, well-maintained vehicles, experienced drivers, and 24/7 customer support, making us the best cab service for outstation travel.' },
];


const OutStation = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState("")
    const fetchData = async () => {
        const res = await dispatch(getOutStation())
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

export default OutStation;
