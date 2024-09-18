import React from 'react';
import { motion } from 'framer-motion';
import airportImage from '../../assets/car2.jpg'; // Import airport image
import { useNavigate } from 'react-router-dom';

const faqItems = [
    {
        question: 'What are the payment options for airport cab services?',
        answer: 'UCS Cabs offers various payment options for airport cab services, including credit/debit cards, net banking, and digital wallets.',
    },
    {
        question: 'Can I book a UCS Cab for both airport pickup and drop-off?',
        answer: 'Yes, UCS Cabs provides convenient options for both airport pickup and drop-off services. You can book one-way or round-trip airport transfers.',
    },
    {
        question: 'Is there a minimum notice period for booking airport cab services?',
        answer: 'We recommend booking your airport cab at least 24 hours in advance to ensure availability, especially during peak times.',
    },
    {
        question: 'What is UCS Cabs\' cancellation policy for airport services?',
        answer: 'Cancellations made 24 hours prior to the scheduled service are free of charge. For more details, refer to our terms and conditions.',
    },
    {
        question: 'Are UCS Cabs’ airport services available 24/7?',
        answer: 'Yes, UCS Cabs offers 24/7 airport cab services to accommodate flights at any time of day or night.',
    },
    {
        question: 'How can I track my airport cab?',
        answer: 'You can track your cab in real-time through our mobile app or by contacting our support team for updates.',
    },
    {
        question: 'Are UCS Cabs’ airport cabs equipped with amenities?',
        answer: 'Yes, our airport cabs are equipped with essential amenities for a comfortable ride, including air conditioning and clean interiors.',
    },
];

const AirportCabService = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section className="relative bg-center bg-cover h-96" style={{ backgroundImage: `url(${airportImage})` }}>
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                    <motion.h1
                        className="text-4xl font-bold"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Airport Cab Service by UCS Cabs
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        Convenient and Reliable Airport Transfers
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

            {/* Airport Cab Service Overview Section */}
            <section className="py-12 px-[5vw] md:px-[10vw] bg-white">
                <div className="container px-4 mx-auto">
                    <motion.h2
                        className="mb-8 text-3xl font-bold text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Airport Cab Services
                    </motion.h2>
                    <motion.div
                        className="space-y-6 text-lg text-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <p>
                            UCS Cabs provides top-notch airport cab services to make your travel to and from the airport smooth and hassle-free. Whether you need a pickup from the airport or a drop-off, we ensure timely and comfortable rides.
                        </p>
                        <p>
                            Our airport cab services offer flexibility and convenience, with options for both pickup and drop-off. Experience a stress-free airport journey with UCS Cabs.
                        </p>
                        <p>
                            Key benefits of our airport cab service include:
                        </p>
                        <ul className="pl-5 list-disc text-[0.95rem] flex flex-col gap-1">
                            <li className="font-semibold">
                                Timely Pickup and Drop-off: Reliable service to match your flight schedule.
                            </li>
                            <li className="font-semibold">
                                Comfortable Rides: Enjoy a clean and comfortable cab equipped with essential amenities.
                            </li>
                            <li className="font-semibold">
                                Professional Drivers: Experienced drivers ensure a smooth and safe journey.
                            </li>
                            <li className="font-semibold">
                                24/7 Availability: Our services are available around the clock to accommodate all flight times.
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose UCS Cabs for Airport Transfers Section */}
            <section className="py-12 px-[5vw] md:px-[10vw] bg-white">
                <div className="container px-4 mx-auto">
                    <motion.h2
                        className="mb-8 text-3xl font-bold text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Why Choose UCS Cabs for Your Airport Transfers?
                    </motion.h2>
                    <motion.div
                        className="space-y-6 text-lg text-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <p>
                            UCS Cabs offers exceptional airport transfer services with a focus on customer satisfaction. Here’s why you should choose us:
                        </p>
                        <ul className="pl-5 list-disc text-[0.95rem] flex flex-col gap-1">
                            <li className="font-semibold">
                                Punctual Service: We ensure timely pickups and drop-offs to align with your flight schedule.
                            </li>
                            <li className="font-semibold">
                                Clean and Comfortable Vehicles: Our cabs are maintained to provide a pleasant experience.
                            </li>
                            <li className="font-semibold">
                                Professional and Courteous Drivers: Our drivers are well-trained and provide exceptional service.
                            </li>
                            <li className="font-semibold">
                                Transparent Pricing: No hidden fees—what you see is what you pay for your airport transfer.
                            </li>
                            <li className="font-semibold">
                                Easy Booking: Convenient online and phone booking options available.
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

export default AirportCabService;
