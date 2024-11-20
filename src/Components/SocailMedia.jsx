// src/SocialMediaIcons.js
import React from 'react';
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const SocialMediaIcons = () => {
    const socialLinks = [
        {
            icon: <FaFacebookF />,
            url: "https://www.facebook.com/drmanasaggarwal?mibextid=LQQJ4d&rdid=9uqGCQZ6y2xPH6el&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F5AShzHFdfS4VAe2b%2F%3Fmibextid%3DLQQJ4d",
            color: "bg-blue-600", // Facebook blue
        },
        {
            icon: <FaInstagram />,
            url: "https://www.instagram.com/drmanasaggarwal/?igsh=MWpmY2FzZWFpcGRpcQ%3D%3D&utm_source=qr",
            color: "bg-gradient-to-r from-pink-500 to-yellow-500", // Instagram gradient
        },
        {
            icon: <FaYoutube />,
            url: "https://www.youtube.com/@DrManasAggarwal",
            color: "bg-red-600", // YouTube red
        },
        {
            icon: <FaWhatsapp />,
            url: `https://wa.me/918318208837?text=${encodeURIComponent("Hello, I need help!")}`, // Replace with your WhatsApp number
            color: "bg-green-500", // WhatsApp green
        },
    ];

    return (
        <div className="fixed top-40 right-0 flex flex-col space-y-4" style={{ zIndex: 1000 }}>
            {socialLinks.map((social, index) => (
                <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`flex items-center justify-center w-12 h-12 ${social.color} rounded-full shadow-lg transition-transform transform hover:scale-105 hover:opacity-80`}
                    style={{ transition: 'transform 0.2s' }}
                >
                    <div className="text-white text-2xl">
                        {social.icon}
                    </div>
                </a>
            ))}
        </div>
    );
};

export default SocialMediaIcons;
