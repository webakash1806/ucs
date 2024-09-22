import { motion } from 'framer-motion';
import car1 from '../../assets/car1.avif'; // Import car1 image
import { useNavigate } from 'react-router-dom';
const faqItems = [
    {
        question: 'What are the payment options for hourly car rentals?',
        answer: 'UCS Cabs offers various payment options for hourly car rentals, including credit/debit cards, net banking, and digital wallets.',
    },
    {
        question: 'Is there a minimum rental period for UCS Cabs?',
        answer: 'Yes, UCS Cabs typically has a minimum rental period, which may vary based on the type of service and location.',
    },
    {
        question: 'Can I rent a car for inter-city travel?',
        answer: 'Absolutely! UCS Cabs specializes in inter-city travel with our outstation rental services.',
    },
    {
        question: 'What is UCS Cabs\' cancellation policy?',
        answer: 'Cancellations made 24 hours prior to the trip are free of charge. For details, refer to our terms and conditions.',
    },
    {
        question: 'Are the prices inclusive of fuel costs?',
        answer: 'Yes, UCS Cabs rental prices typically include fuel costs, but it’s best to confirm during booking.',
    },
    {
        question: 'What safety measures does UCS Cabs implement?',
        answer: 'UCS Cabs ensures all vehicles are sanitized before and after each trip, and follows COVID-19 safety guidelines.',
    },
    {
        question: 'How can I book a UCS Cab for corporate travel?',
        answer: 'Corporate travel bookings can be easily made online or through our dedicated support team. UCS Cabs offers special rates and packages for businesses.',
    },
    {
        question: 'Are UCS Cabs available for airport transfers?',
        answer: 'Yes, UCS Cabs offers convenient and timely airport transfers to and from major airports in your city.',
    },
];


const LocalCarRentals = () => {
    const navigate = useNavigate()

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
                        Local Cab by UCS Cabs
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        Reliable, Affordable, and Convenient
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        onClick={() => navigate('/')} className='p-2 px-4 mt-4 border border-white rounded hover:shadow-[0px_0px_16px]  bg-main font-semibold hover:shadow-main'>
                        Book now
                    </motion.button>
                </div>
            </section>

            {/* Local Trip Cab Services Section */}
            <section className="py-12 px-[5vw] md:px-[10vw] bg-white">
                <div className="container px-4 mx-auto">
                    <motion.h2
                        className="mb-8 text-3xl font-bold text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Local Trip Cab Services
                    </motion.h2>
                    <motion.div
                        className="space-y-6 text-lg text-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <p>
                            At UCS Cabs, we offer tailored local trip cab services designed to meet your various travel needs. Whether you need a short ride within the city or a longer journey, our options provide flexibility and comfort. Choose from our popular packages:
                        </p>
                        <div className="space-y-6">
                            <div className="p-6 border border-gray-200 rounded-lg">
                                <h3 className="text-2xl font-semibold">8 hr | 80 km</h3>
                                <p className="mt-2 font-semibold text-[1rem] text-gray-600">
                                    Ideal for a day’s worth of travel within the city or surrounding areas. This package covers up to 80 kilometers over 8 hours, providing you with the freedom to explore your destination comfortably without worrying about mileage or time constraints. Perfect for day trips, business meetings, or sightseeing tours.
                                </p>
                            </div>
                            <div className="p-6 border border-gray-200 rounded-lg">
                                <h3 className="text-2xl font-semibold">12 hr | 120 km</h3>
                                <p className="mt-2 font-semibold text-[1rem] text-gray-600">

                                    Designed for those who need a bit more time and distance, this package includes up to 120 kilometers over 12 hours. It’s great for extended trips, multi-stop journeys, or travel to nearby cities. Enjoy the convenience of a full day’s service with ample mileage for a hassle-free experience.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Trust UCS Cabs over Self-Drive Rentals Section */}
            <section className="py-12 px-[5vw] md:px-[10vw] bg-white">
                <div className="container px-4 mx-auto">
                    <motion.h2
                        className="mb-8 text-3xl font-bold text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Why Trust UCS Cabs Over Self-Drive Car Rentals?
                    </motion.h2>
                    <motion.div
                        className="space-y-6 text-lg text-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <p>
                            While self-drive car rentals may seem appealing to some, UCS Cabs offers a range of advantages that make it a superior choice for those seeking comfort, safety, and convenience. Here’s why you should trust UCS Cabs:
                        </p>
                        <ul className="pl-5 list-disc text-[0.95rem] flex flex-col gap-1">
                            <li className="font-semibold">
                                Professional Drivers: With UCS Cabs, you don’t have to worry about navigating unfamiliar roads or driving in heavy traffic. Our drivers are highly trained professionals who know the best routes and ensure a smooth journey.
                            </li>
                            <li className="font-semibold">
                                No Stress of Driving: Self-drive rentals require you to handle the driving, parking, and dealing with local traffic conditions, which can be stressful, especially on long journeys. With UCS Cabs, you can sit back, relax, and enjoy the ride while our experienced drivers take care of everything.
                            </li>
                            <li className="font-semibold">
                                Safety and Security: All our cars are equipped with advanced safety features, and UCS Cabs adheres to strict safety protocols, including vehicle sanitation. In contrast, self-drive rentals might not guarantee the same level of hygiene and safety.
                            </li>
                            <li className="font-semibold">
                                24/7 Customer Support: Whether it’s a question about your booking or an issue during your trip, UCS Cabs provides round-the-clock customer support. With self-drive rentals, getting assistance while on the road can be more challenging.
                            </li>
                            <li className="font-semibold">
                                No Worries About Fuel or Maintenance: When renting with UCS Cabs, there’s no need to worry about refueling, vehicle maintenance, or unexpected breakdowns. All these aspects are taken care of, allowing you to focus solely on your trip.
                            </li>
                            <li className="font-semibold">
                                Flexible Pick-Up and Drop-Off: UCS Cabs offers flexibility in terms of pick-up and drop-off locations, allowing you to plan your travel with ease. Self-drive rentals often come with restrictions or additional fees for certain locations.
                            </li>
                            <li className="font-semibold">
                                Cost Efficiency: Self-drive rentals may seem cheaper at first glance, but they often come with hidden costs such as fuel, tolls, and additional insurance. UCS Cabs provides transparent pricing that includes all necessary expenses.
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
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                            >
                                <ol className='list-disc'>
                                    <li>
                                        <strong>{faq.question}</strong> <br /> <p className='text-[0.95rem] font-semibold'>
                                            {faq.answer}
                                        </p>
                                    </li>
                                </ol>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LocalCarRentals;
