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
    { question: 'How can I find a reliable taxi service near me?', answer: 'You can book our taxi service online, via WhatsApp, or by calling us for quick and reliable transportation.' },
    { question: 'Do you provide taxi services for outstation trips?', answer: 'Yes, we offer both local and outstation taxi services to major destinations across India.' },
    { question: 'Can I book a taxi near me for airport pickup and drop?', answer: 'Absolutely! We provide airport transfers with on-time pickup and drop services.' },
    { question: 'Is your taxi service available 24/7?', answer: 'Yes, our local taxi company operates round the clock to serve you at any time of the day.' },
    { question: 'How do I calculate the taxi fare before booking?', answer: 'Our fares are transparent, and you can check estimated pricing on our website or by contacting us.' },
    { question: 'Do your taxis have GPS tracking for safety?', answer: 'Yes, all our taxis are equipped with GPS tracking for your safety and security.' },
    { question: 'Can I book a taxi nearby me for hourly rental?', answer: 'Yes, we offer hourly rental options for local travel, shopping, or sightseeing.' },
    { question: 'What types of taxis do you offer?', answer: 'We have a wide range of vehicles, including hatchbacks, sedans, SUVs, and luxury cars.' },
    { question: 'Do you offer special discounts on regular taxi bookings?', answer: 'Yes, we provide exclusive offers and discounts for our regular customers.' },
    { question: 'Why should I choose your taxi service over other local taxi companies?', answer: 'We offer affordable pricing, professional drivers, well-maintained vehicles, and 24/7 availability, making us the best local taxi company.' },
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
