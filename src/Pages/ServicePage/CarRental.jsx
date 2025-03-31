import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCarRental } from '../../Redux/Slices/dynamicSlice'
import MainForm from '../../Components/MainForm'
import AoChale from './AooChale'
import { motion } from 'framer-motion';


const faqItems = [
    { question: 'What types of car rental services do you offer in Uttarakhand?', answer: 'We offer chauffeur-driven car rentals for local, outstation, and tourist travel across Uttarakhand.' },
    { question: 'Can I rent a car near me for one day?', answer: 'Yes, we provide flexible car rental options, including hourly, daily, weekly, and monthly rentals.' },
    { question: 'Do you offer car rental services for Char Dham Yatra?', answer: 'Yes, we provide car rental services in Uttarakhand for Char Dham Yatra, Kedarnath, Badrinath, and other religious tours.' },
    { question: 'How can I book a car rental service?', answer: 'You can book a car through our website, call us directly, or contact us via WhatsApp for quick reservations.' },
    { question: 'What are the charges for car rental in Uttarakhand?', answer: 'Our pricing depends on the vehicle type, rental duration, and travel distance. Contact us for customized quotes.' },
    { question: 'Do you provide self-drive car rental services?', answer: 'Yes, we offer cars for individuals who prefer independent travel.' },
    { question: 'Is fuel included in the car rental charges?', answer: 'For chauffeur-driven rentals, fuel costs are included, while for self-drive cars, fuel is charged separately.' },
    { question: 'Can I rent a car near me for an outstation trip?', answer: 'Yes, our car rental services cover outstation trips to major cities and tourist destinations.' },
    { question: 'Why should I choose your car rental services over others?', answer: 'We provide well-maintained vehicles, competitive pricing, 24/7 customer support, and flexible rental options, making us the best car rental service provider in Uttarakhand.' },
];


const CarRental = () => {

    const dispatch = useDispatch()
    const [data, setData] = useState(null);

    const fetchData = async () => {
        const res = await dispatch(getCarRental())
        setData(res?.payload?.sections[0]);

    }

    useEffect(() => {
        fetchData()
    }, [dispatch])

    return (
        <div className='container mx-auto px-6'>

            <section className="relative bg-center bg-cover h-96 py-[17rem]" style={{ backgroundImage: `url(${data?.photo?.secure_url})` }}>

                <div className="absolute inset-0  opacity-70"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-black">
                    <MainForm />
                </div>
            </section>

            <AoChale />


            <section className="py-12  bg-gray-50 mx-auto container px-4">
                <div className="text-lg  mx-auto container px-10 p1" dangerouslySetInnerHTML={{ __html: data?.description }} />
            </section>


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
    )
}

export default CarRental