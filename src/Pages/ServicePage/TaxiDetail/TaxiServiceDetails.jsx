import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTaxtDetail } from '../../../Redux/Slices/dynamicSlice'
import MainForm from '../../../Components/MainForm'
import image from '../../../assets/car1.avif'
import { motion } from 'framer-motion';

const TaxiServiceDetails = () => {

  const { page, category } = useParams()
  const dispatch = useDispatch()

  const { taxiCabDetail, loading, error } = useSelector((state) => state.dynamic)

  console.log(page, category);

  const fetchData = async () => {
    console.log("i m running");

    const response = await dispatch(getTaxtDetail({ page, category }))
    console.log(response);

  }

  useEffect(() => {
    fetchData()
  }, [])


  const faqItems = [
    { question: 'What are the payment options for hourly car rentals?', answer: 'UCS Cabs offers various payment options for hourly car rentals, including credit/debit cards, net banking, and digital wallets.' },
    { question: 'Is there a minimum rental period for UCS Cabs?', answer: 'Yes, UCS Cabs typically has a minimum rental period, which may vary based on the type of service and location.' },
    { question: 'Can I rent a car for inter-city travel?', answer: 'Absolutely! UCS Cabs specializes in inter-city travel with our outstation rental services.' },
    { question: 'What is UCS Cabs\' cancellation policy?', answer: 'Cancellations made 24 hours prior to the trip are free of charge. For details, refer to our terms and conditions.' },
    { question: 'Are the prices inclusive of fuel costs?', answer: 'Yes, UCS Cabs rental prices typically include fuel costs, but it’s best to confirm during booking.' },
    { question: 'What safety measures does UCS Cabs implement?', answer: 'UCS Cabs ensures all vehicles are sanitized before and after each trip, and follows COVID-19 safety guidelines.' },
    { question: 'How can I book a UCS Cab for corporate travel?', answer: 'Corporate travel bookings can be easily made online or through our dedicated support team. UCS Cabs offers special rates and packages for businesses.' },
    { question: 'Are UCS Cabs available for airport transfers?', answer: 'Yes, UCS Cabs offers convenient and timely airport transfers to and from major airports in your city.' },
];



  return (
    <section>
      {/* Hero Section */}

      <section className="relative bg-center bg-cover h-96 py-[17rem]" style={{ backgroundImage: `url(${image})` }}>

        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-black">
          <MainForm />
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-12  bg-gray-50 mx-auto container px-4">
        <div className="text-lg text-gray-700 mx-auto container px-10 p1" dangerouslySetInnerHTML={{ __html: taxiCabDetail?.description }} />
      </section>


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

    </section>
  )
}

export default TaxiServiceDetails