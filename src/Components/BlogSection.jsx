import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blog1 from '../assets/car1.jpg';
import blog2 from '../assets/car2.jpg';
import blog3 from '../assets/car3.jpg';
import blog4 from '../assets/img1.jpg';
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';

const BlogSection = () => {
    const blogs = [
        {
            img: blog1,
            title: 'It is a long established fact that a reader will be Standard Part',
            date: '20 OCT',
            author: 'Mirnsdo Jons',
            description: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence...'
        },
        {
            img: blog2,
            title: 'Discover the wonders of Blog 2',
            date: '21 OCT',
            author: 'John Doe',
            description: 'Discover the fascinating insights and updates in Blog 2, where we delve into the latest trends and phenomena that are reshaping our world...'
        },
        {
            img: blog3,
            title: 'Explore the latest trends in Blog 3',
            date: '22 OCT',
            author: 'Jane Smith',
            description: 'Join us as we explore the cutting-edge trends and innovations that are making waves in Blog 3. From technology to lifestyle, stay ahead of the curve...'
        },
        {
            img: blog4,
            title: 'Insights and updates in Blog 4',
            date: '23 OCT',
            author: 'Emily Davis',
            description: 'Blog 4 offers an in-depth look at the latest insights and updates from various fields. Learn about new developments and how they impact you...'
        },
    ];

    const [slidesPerView, setSlidesPerView] = useState(1);

    useEffect(() => {
        const updateSlidesPerView = () => {
            const viewportWidth = window.innerWidth;
            const cardWidth = 20 * 16; // 20rem in pixels (1rem = 16px, adjust as needed)
            const numSlides = Math.floor(viewportWidth / cardWidth);
            setSlidesPerView(numSlides || 1); // Ensure at least 1 slide is visible
        };

        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);

        return () => {
            window.removeEventListener('resize', updateSlidesPerView);
        };
    }, []);

    return (
        <div className='flex flex-col items-center justify-center xl:p-10 p-6 bg-gradient-to-br bg-white'>
            {/* Header */}
            <div className='text-center mb-10'>
                <button className='py-3 px-10 bg-main text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-all'>
                    News & Blogs
                </button>
                <h1 className='text-2xl xl:text-3xl font-bold mt-4'>Latest News & Blogs</h1>
            </div>

            <div className="relative w-full max-w-[82rem] mx-auto flex items-center justify-center">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    speed={1500}
                    className="w-full mx-auto flex items-center justify-center gap-6"
                    slidesPerView={slidesPerView}
                    spaceBetween={10} // Reduce the gap between slides
                >
                    {blogs.concat(blogs).map((blog, index) => (
                        <SwiperSlide key={index} className='relative overflow-hidden text-white rounded-lg mx-auto w-[18rem] flex flex-col items-center justify-between bg-dark shadow-xl min-h-[25rem] max-h-[25rem] cursor-pointer'>
                            <img src={blog.img} alt={`blog${index + 1}`} className='w-full h-[10rem] object-cover transition-transform duration-300 hover:opacity-80' />
                            <div className='p-4 pt-2 '>
                                <h2 className='text-[1.1rem] line-clamp-2 font-semibold mb-1 hover:text-blue-400 transition-all'>
                                    {blog.title}
                                </h2>
                                <p className='text-gray-400 mb-4 text-[0.9rem] line-clamp-3'>
                                    {blog.description}
                                </p>
                                <div className='flex flex-col gap-2 items-center justify-between'>
                                    <div className='flex items-center gap-4'>
                                        <img src={''} alt="user" className='w-10 h-10 rounded-full bg-gray-500' />
                                        <p>By: {blog.author}</p>
                                    </div>
                                    <div className='flex gap-3 justify-between'>
                                        <Link className='p-2 bg-gray-800 rounded-full hover:bg-blue-500 transition'><CiFacebook className='text-xl text-gray-400 hover:text-white' /></Link>
                                        <Link className='p-2 bg-gray-800 rounded-full hover:bg-red-500 transition'><FaYoutube className='text-xl text-gray-400 hover:text-white' /></Link>
                                        <Link className='p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition'><CiInstagram className='text-xl text-gray-400 hover:text-white' /></Link>
                                        <Link className='p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition'><CiTwitter className='text-xl text-gray-400 hover:text-white' /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className='absolute top-5 left-5 bg-blue-500 text-white font-semibold text-center rounded-lg px-4 py-2 shadow-lg'>
                                <p className='leading-tight'>{blog.date}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


        </div>
    );
};

export default BlogSection;
