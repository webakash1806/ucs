import React, { useState } from 'react';
import faqData from '../Hooks/useFAQData';
import { Link } from 'react-router-dom';

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen px-[4vw] sm:px-[7vw] md:px-[8vw] lg:px-[9vw] w-full py-10 bg-gray-100">
            <h1 className="my-4 mb-8 text-3xl font-semibold text-center text-gray-800">Frequently Asked Questions</h1>

            <div className="space-y-4">
                {faqData.map((faq, index) => (
                    <div key={index} className={`overflow-hidden transition-all duration-500 bg-white max-w-[50rem] mx-auto border rounded-lg shadow-md ${openIndex === index ? 'border-main' : 'border-light'}`}>
                        <button
                            className="flex items-center justify-between w-full px-6 py-4 text-lg font-semibold text-left text-gray-900 transition-all bg-lightSky hover:bg-sky-50 focus:outline-none"
                            onClick={() => toggleOpen(index)}
                        >
                            <span>{faq.question}</span>
                            <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </span>
                        </button>
                        <div
                            className={` text-gray-700 border-t border-gray-200 transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-screen opacity-100 px-6 py-4' : 'max-h-0 p-0 opacity-0 overflow-hidden'}`}
                        >
                            <p>{faq.answer}</p>
                            {index === 1 && (
                                <p className="mt-4 text-sm text-blue-600">
                                    For more information, check our <Link to="/terms-and-conditions" className="underline">Terms and Conditions</Link>.
                                </p>
                            )}
                            {index === 7 && (
                                <p className="mt-4 text-sm text-blue-600">
                                    For more details, check out our <Link to="/contact" className="underline">Contact us</Link>.
                                </p>
                            )}
                            {index === 9 && (
                                <p className="mt-4 text-sm text-blue-600">
                                    If you need immediate assistance, you can email us at <Link to="mailto:support@ucs.com" className="underline">support@ucs.com</Link> or call us at [Insert Phone Number].
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQPage;
