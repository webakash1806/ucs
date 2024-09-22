import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import contactIcon from '../assets/icons/contact.avif'
const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
    };

    return (
        <div className="py-10 bg-gray-100">
            <div className="container px-4 mx-auto max-w-7xl">
                {/* Heading */}
                <div className="mb-6 text-center">
                    <h1 className="mb-4 text-4xl font-semibold text-main">Contact Us</h1>
                    <p className="text-[1.05rem] text-gray-600">We would love to hear from you! Get in touch with us using the details below or drop a message.</p>
                </div>
                {/* Flex container for form and contact details */}
                <div className="flex flex-col items-center justify-center pb-16 gap-7 md:flex-row-reverse">
                    {/* Contact Form */}
                    <form
                        noValidate
                        onSubmit={handleSubmit}
                        className="contact-form w-full max-w-[28rem] lg:max-w-md pt-0 p-3 pb-4 bg-white rounded-xl border-main border border-opacity-55 shadow-md"
                    >
                        <img src={contactIcon} className="w-[5rem] my-4 mt-3 mx-auto" alt="Contact Icon" />

                        {/* Full Name */}
                        <div className="relative mb-3 border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                            <label className="w-full text-light text-[0.8rem]">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter full name..."
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-[0.1rem] tracking-wide bg-transparent outline-none placeholder:text-[#808080]"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="relative mb-3 border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                            <label className="w-full text-light text-[0.8rem]">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email..."
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-[0.1rem] tracking-wide bg-transparent outline-none placeholder:text-[#5b5b5b]"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="relative mb-3 border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                            <label className="w-full text-light text-[0.8rem]">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Enter phone number..."
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full p-[0.1rem] tracking-wide bg-transparent outline-none placeholder:text-[#808080]"
                                required
                            />
                        </div>

                        {/* Message */}
                        <div className="relative mb-3 border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                            <label className="w-full text-light text-[0.8rem]">Message</label>
                            <textarea
                                name="message"
                                rows="3"
                                placeholder="Write your message..."
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-[0.1rem] tracking-wide bg-transparent outline-none placeholder:text-[#808080]"
                                required
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full p-2 mt-1 font-semibold text-white transition-colors duration-300 rounded bg-main hover:bg-secondary"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Details */}
                    <div className="flex flex-col flex-grow gap-5 max-w-[28rem]">
                        {/* Phone */}
                        <div className="flex items-center p-6 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
                            <FaPhoneAlt className="mr-4 text-4xl text-main" />
                            <div>
                                <h2 className="text-xl font-semibold text-main">Phone</h2>
                                <p className="text-gray-600">+91 98765 43210</p>
                            </div>
                        </div>

                        {/* WhatsApp */}
                        <div className="flex items-center p-6 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
                            <FaWhatsapp className="mr-4 text-4xl text-green-500" />
                            <div>
                                <h2 className="text-xl font-semibold text-main">WhatsApp</h2>
                                <p className="text-gray-600">+91 98765 43210</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center p-6 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
                            <FaEnvelope className="mr-4 text-4xl text-main" />
                            <div>
                                <h2 className="text-xl font-semibold text-main">Email</h2>
                                <p className="text-gray-600">contact@ucs.com</p>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center p-6 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
                            <FaMapMarkerAlt className="mr-4 text-4xl text-main" />
                            <div>
                                <h2 className="text-xl font-semibold text-main">Location</h2>
                                <p className="text-gray-600">Ground floor, Plot no 29, F-33, Milan Colony, Mumbai</p>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Google Maps Iframe */}
                <div className="mt-10 bg-white rounded-lg shadow-md">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.872156197157!2d72.92381737448714!3d19.066799746678923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c02f9bc7bce7%3A0x58a06dcda2cbff0!2sGovandi!5e0!3m2!1sen!2sin!4v1693891709390!5m2!1sen!2sin"
                        width="100%"
                        height="400"
                        allowFullScreen=""
                        loading="lazy"
                        title="Our Location"
                        className="rounded-lg"
                    ></iframe>
                </div>


            </div>
        </div>
    );
};

export default Contact;
