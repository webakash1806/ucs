import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCarRental } from '../../Redux/Slices/dynamicSlice'
import MainForm from '../../Components/MainForm'
import AoChale from './AooChale'
import { motion } from 'framer-motion';


const faqItems = [
    { question: 'What types of cars are available for rent?', answer: 'UCS Cabs offers a variety of rental cars, including hatchbacks, sedans, SUVs, and luxury vehicles.' },
    { question: 'Do I need to provide a security deposit for car rentals?', answer: 'Yes, a refundable security deposit may be required based on the car type and rental duration.' },
    { question: 'Is there a mileage limit on rented cars?', answer: 'Yes, UCS Cabs provides a fixed mileage limit. Additional charges may apply if you exceed the limit.' },
    { question: 'Can I rent a car for a one-way trip?', answer: 'Yes, UCS Cabs allows one-way rentals between cities with applicable drop-off charges.' },
    { question: 'Are UCS Cabs rental prices inclusive of fuel costs?', answer: 'Some rental plans include fuel, while others require you to refuel the car before returning it. Please confirm during booking.' },
    { question: 'Can I extend my rental period after booking?', answer: 'Yes, you can extend your rental period by contacting UCS Cabs customer support, subject to availability.' },
    { question: 'Is insurance included in the rental cost?', answer: 'Yes, UCS Cabs provides basic insurance coverage. Additional coverage can be purchased if needed.' },
    { question: 'What happens if the rental car breaks down?', answer: 'UCS Cabs offers 24/7 roadside assistance and may provide a replacement vehicle if required.' },
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