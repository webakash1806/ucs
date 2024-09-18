import React from 'react';
import { motion } from 'framer-motion';
import car1 from '../../assets/car1.jpg'; // Import car1 image
import { useNavigate } from 'react-router-dom';

const faqItems = [
    {
        question: 'What are the payment options for round-trip car rentals?',
        answer: 'UCS Cabs offers various payment options for round-trip car rentals, including credit/debit cards, net banking, and digital wallets.',
    },
    {
        question: 'Is there a minimum rental period for UCS Cabs round-trip services?',
        answer: 'Yes, UCS Cabs typically has a minimum rental period for round-trip services, which may vary based on the type of service and location.',
    },
    {
        question: 'Can I use UCS Cabs for long-distance round trips?',
        answer: 'Absolutely! UCS Cabs specializes in long-distance round trips and offers services to ensure a comfortable and reliable journey.',
    },
    {
        question: 'What is UCS Cabs\' cancellation policy for round trips?',
        answer: 'Cancellations made 24 hours prior to the trip are free of charge. For more details, refer to our terms and conditions.',
    },
    {
        question: 'Are the prices inclusive of fuel costs for round trips?',
        answer: 'Yes, UCS Cabs rental prices typically include fuel costs, but it’s best to confirm during booking for round-trip services.',
    },
    {
        question: 'What safety measures does UCS Cabs implement for long-distance round trips?',
        answer: 'UCS Cabs ensures all vehicles are sanitized before and after each trip, and follows COVID-19 safety guidelines for long-distance travel.',
    },
    {
        question: 'How can I book a UCS Cab for a corporate round-trip?',
        answer: 'Corporate round-trip bookings can be easily made online or through our dedicated support team. UCS Cabs offers special rates and packages for businesses.',
    },
    {
        question: 'Are UCS Cabs available for round-trip airport transfers?',
        answer: 'Yes, UCS Cabs offers convenient and timely round-trip airport transfers to and from major airports in your city.',
    },
];

const RoundTripService = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section className="relative bg-center bg-cover h-96" style={{ backgroundImage: `url(${car1})` }}>
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                    <motion.h1
                        className="text-4xl font-bold"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Round Trip Service by UCS Cabs
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        Comfortable, Reliable, and Flexible
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        onClick={() => navigate('/')}
                        className='p-2 px-4 mt-4 border border-white rounded hover:shadow-[0px_0px_16px] bg-main font-semibold hover:shadow-main'
                    >
                        Book now
                    </motion.button>
                </div>
            </section>

            {/* Round Trip Service Overview Section */}
            <section className="py-12 px-[5vw] md:px-[10vw] bg-white">
                <div className="container px-4 mx-auto">
                    <motion.h2
                        className="mb-8 text-3xl font-bold text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Round Trip Car Rentals
                    </motion.h2>
                    <motion.div
                        className="space-y-6 text-lg text-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <p>
                            At UCS Cabs, we offer convenient round-trip car rentals that allow you to travel to your destination and return with ease. Whether you're planning a day trip or a longer journey, our round-trip service ensures a comfortable and hassle-free experience.
                        </p>
                        <p>
                            With our round-trip service, you can book your journey to your desired location and choose the option to include a return trip. Enjoy flexibility in scheduling, and let us handle the driving while you focus on your travel plans.
                        </p>
                        <p>
                            Key benefits of our round-trip service include:
                        </p>
                        <ul className="pl-5 list-disc text-[0.95rem] flex flex-col gap-1">
                            <li className="font-semibold">
                                Flexible Scheduling: Choose your pick-up and drop-off times to fit your itinerary.
                            </li>
                            <li className="font-semibold">
                                Comfort and Convenience: Enjoy a relaxing journey without the stress of driving.
                            </li>
                            <li className="font-semibold">
                                Professional Drivers: Our experienced drivers ensure a smooth and safe trip.
                            </li>

                            <li className="font-semibold">
                                24/7 Customer Support: Our team is available around the clock to assist with your round-trip needs.
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose UCS Cabs for Round Trips Section */}
            <section className="py-12 px-[5vw] md:px-[10vw] bg-white">
                <div className="container px-4 mx-auto">
                    <motion.h2
                        className="mb-8 text-3xl font-bold text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Why Choose UCS Cabs for Your Round Trip?
                    </motion.h2>
                    <motion.div
                        className="space-y-6 text-lg text-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <p>
                            UCS Cabs offers exceptional round-trip services that stand out from the rest. Here’s why you should choose us:
                        </p>
                        <ul className="pl-5 list-disc text-[0.95rem] flex flex-col gap-1">
                            <li className="font-semibold">
                                Reliable Service: We ensure timely pick-ups and drop-offs, adhering to your schedule.
                            </li>
                            <li className="font-semibold">
                                Comfort and Safety: Our vehicles are well-maintained, clean, and equipped for your comfort.
                            </li>
                            <li className="font-semibold">
                                Experienced Drivers: Our professional drivers are trained to provide a safe and pleasant experience.
                            </li>
                            <li className="font-semibold">
                                Transparent Pricing: No hidden fees—what you see is what you pay for the round trip.
                            </li>
                            <li className="font-semibold">
                                Flexible Options: Choose the duration and route that best fits your travel needs.
                            </li>
                            <li className="font-semibold">
                                Excellent Customer Support: Our support team is available to assist you throughout your journey.
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 bg-gray-50">
                <div className="container px-4 mx-auto">
                    <motion.h2
                        className="mb-8 text-3xl font-bold text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <div className="space-y-6 px-[3vw] md:px-[10vw]">
                        {faqItems.map((faq, index) => (
                            <motion.div
                                key={index}
                                className="text-lg text-gray-700"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 * index }}
                            >
                                <h3 className="text-xl font-semibold">{faq.question}</h3>
                                <p className="mt-2">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RoundTripService;