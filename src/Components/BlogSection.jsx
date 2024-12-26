import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blog1 from '../assets/car1.avif';
import blog2 from '../assets/car2.avif';
import blog3 from '../assets/car3.avif';
import blog4 from '../assets/img1.avif';
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';

const BlogSection = ({data}) => {
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

    console.log("data is",data);

    const {children}=data

    const stripHTMLTags = (str) => {
        return str.replace(/<\/?[^>]+(>|$)/g, "");
      };
    

    return (
        <div className='flex flex-col items-center justify-center p-6 bg-white xl:p-10 bg-gradient-to-br'>
            {/* Header */}
            <div className='mb-10 text-center'>
                {/* <button className='px-10 py-3 font-semibold text-white transition-all rounded-full shadow-lg bg-main hover:bg-blue-700'>
                    News & Blogs
                </button> */}
                <h1 className='mt-4 text-2xl font-bold xl:text-3xl text-main'>{data?.title}</h1>
            </div>

            <div className="relative w-full max-w-[82rem] mx-auto flex items-center justify-center">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    speed={1500}
                    className="flex items-center justify-center w-full gap-6 mx-auto"
                    slidesPerView={slidesPerView > 4 ? 4 : slidesPerView}
                    spaceBetween={10} // Reduce the gap between slides
                >
                    {children.concat(blogs).map((blog, index) => (
                        <SwiperSlide key={index} className='relative overflow-hidden text-white rounded-lg mx-auto w-[18rem] flex flex-col items-center justify-between bg-dark shadow-xl  cursor-pointer'>
                            <img src={blog?.photo?.secure_url} alt={`blog${index + 1}`} className='w-full h-[10rem] object-cover transition-transform duration-300 hover:opacity-80' />
                            <div className='p-4 pt-2 '>
                                <Link to={"/blog/details" } state={{ ...blog
                 }} >
                                <h2 className='text-[1.1rem] line-clamp-2 font-semibold mb-1 hover:text-red-500 transition-all'>
                                    {blog?.title}
                                </h2>
                                </Link>
                                {/* <p className='text-gray-400 mb-4 text-[0.9rem] line-clamp-3'>
                                    {blog?.description}
                                </p> */}
                              <p>
  {blog?.description
    ? `${stripHTMLTags(blog?.description)
        .split(" ")
        .slice(0, 20)
        .join(" ")}...`
    : "Description Not Available"}
</p>

                            
                            </div>
                       
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


        </div>
    );
};

export default BlogSection;
