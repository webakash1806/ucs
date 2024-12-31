import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../Redux/Slices/dynamicSlice'
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';

const BlogList = () => {
   
    const dispatch=useDispatch()

    const {blog,loading,error}=useSelector((state)=>state.dynamic)
        const [slidesPerView, setSlidesPerView] = useState(1);

    const fetchData=async()=>{
         const response=await dispatch(getBlogs())
    }

    useEffect(()=>{
         fetchData()
    },[])


    console.log("all blog is",blog);

    const stripHTMLTags = (str) => {
        return str.replace(/<\/?[^>]+(>|$)/g, "");
      };

    if(loading){
        return <p>Loading....</p>
    }

    if(!blog || blog.length===0){
        return <p>No Data Found...</p>
    }
    


  return (
    <div className='flex flex-col items-center justify-center p-6 bg-white xl:p-10 bg-gradient-to-br'>
    {/* Header */}
    <div className='mb-10 text-center'>
        {/* <button className='px-10 py-3 font-semibold text-white transition-all rounded-full shadow-lg bg-main hover:bg-blue-700'>
            News & Blogs
        </button> */}
        <h1 className='mt-4 text-2xl font-bold xl:text-3xl text-main'>{"Latest News and Blog"}</h1>
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
            {blog.map((data, index) => (
                <SwiperSlide key={index} className='relative overflow-hidden text-white rounded-lg mx-auto w-[18rem] flex flex-col items-center justify-between bg-dark shadow-xl  cursor-pointer'>
                    <img src={data?.photo?.secure_url} alt={`data${index + 1}`} className='w-full h-[10rem] object-cover transition-transform duration-300 hover:opacity-80' />
                    <div className='p-4 pt-2 '>
                        <Link to={"/blog/details" } state={{ ...data
         }} >
                        <h2 className='text-[1.1rem] line-clamp-2 font-semibold mb-1 hover:text-red-500 transition-all'>
                            {data?.title}
                        </h2>
                        </Link>
            
                      <p>
{data?.description
? `${stripHTMLTags(data?.description
)
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
  )
}

export default BlogList