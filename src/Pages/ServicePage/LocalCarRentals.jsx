import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getLocalCabData } from '../../Redux/Slices/dynamicSlice';
import MainForm from '../../Components/MainForm';
import { FaCar, FaMoneyBillWave, FaClock, FaMapMarkedAlt, FaCheckCircle } from 'react-icons/fa';
import HowWeWork from './HowWeWork';
import WhyChoose from './WhyChoose';
import AoChale from './AooChale';
import TaxiFareTable from './TaxiFare';
import WhyWe from './Why';

const faqItems = [
    { question: 'What is the best local taxi service available in my area?', answer: 'We provide the best local taxi service with affordable pricing, professional drivers, and well-maintained cabs for your convenience.' },
    { question: 'How can I book a local taxi cab?', answer: 'You can book a local taxi through our website, WhatsApp, or by calling our customer support team.' },
    { question: 'Do you provide 24/7 local taxi service?', answer: 'Yes, our local taxi service operates 24/7 to ensure you get a cab whenever you need it.' },
    { question: 'What are the charges for a local taxi service?', answer: 'Our fares depend on the distance, time, and vehicle type. Contact us for exact pricing.' },
    { question: 'Are your local taxis available for hourly rental?', answer: 'Yes, we offer flexible hourly rental options for city travel, shopping, and business meetings.' },
    { question: 'Can I schedule a local taxi in advance?', answer: 'Yes, you can pre-book our local taxi service for hassle-free and timely pickups.' },
    { question: 'What types of taxis are available in your fleet?', answer: 'We offer hatchbacks, sedans, SUVs, and luxury cars to cater to different travel needs.' },
    { question: 'Is your local taxi service safe and reliable?', answer: 'Yes, all our taxis have GPS tracking, and our drivers are well-trained to ensure your safety.' },
    { question: 'Do you offer shared local taxi services?', answer: 'No, we currently provide only private taxi services for a comfortable ride.' },
    { question: 'Why should I choose your local taxi cab service?', answer: 'Our taxis are affordable, well-maintained, available 24/7, and driven by professional drivers, making us the best local taxi service provider.' },
];


const LocalCarRentals = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    const fetchData = async () => {
        const res = await dispatch(getLocalCabData());
        setData(res?.payload?.sections[0]);
    };

    useEffect(() => {
        fetchData();
    }, [dispatch]);

 
    

    return (
        <div className="min-h-screen">
      
            <section className="relative bg-center bg-cover h-96 py-[17rem]" style={{ backgroundImage: `url(${data?.photo?.secure_url})` }}>

                <div className="absolute inset-0  opacity-70"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-black">
                    <MainForm />
                </div>
            </section>

            <AoChale />

            {/* Service Overview */}
            <section className="py-12  bg-gray-50  container px-10 mx-auto">
                <div className="text-lg  mx-auto container px-10 p1" dangerouslySetInnerHTML={{ __html: data?.description }} />
            </section>





            <HowWeWork />

            <WhyWe/>

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

export default LocalCarRentals;
