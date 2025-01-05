import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../Redux/Slices/dynamicSlice'
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

const BlogList = () => {
    const dispatch = useDispatch()

    const { blog, loading, error } = useSelector((state) => state.dynamic)
    const [slidesPerView, setSlidesPerView] = useState(1);

    const fetchData = async () => {
        const response = await dispatch(getBlogs())
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log("all blog is", blog);

    const stripHTMLTags = (str) => {
        return str.replace(/<\/?[^>]+(>|$)/g, "");
    };

    if (loading) {
        return <p>Loading....</p>
    }

    if (!blog || blog.length === 0) {
        return <p>No Data Found...</p>
    }

    return (
        <div className='flex flex-col items-center justify-center p-6 bg-white xl:p-10 bg-gradient-to-br'>
            {/* Header */}
            <div className='mb-10 text-center'>
                <h1 className='mt-4 text-2xl font-bold xl:text-3xl text-main'>{"Latest News and Blog"}</h1>
            </div>

            {/* Card Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[82rem] mx-auto">
                {blog.map((data, index) => (
                    <div key={index} className='relative overflow-hidden  text-white rounded-lg flex flex-col items-center justify-between bg-dark shadow-xl cursor-pointer'>
                        <img src={data?.photo?.secure_url} alt={`data${index + 1}`} className='w-full h-[10rem] object-cover transition-transform duration-300 hover:opacity-80' />
                        <div className='p-4 pt-2'>
                            <Link to={"/blog/details"} state={{ ...data }}>
                                <h2 className='text-[1.1rem] line-clamp-2 font-semibold mb-1 hover:text-red-500 transition-all'>
                                    {data?.title}
                                </h2>
                            </Link>
                            <p>
                                {data?.description
                                    ? `${stripHTMLTags(data?.description)
                                        .split(" ")
                                        .slice(0, 20)
                                        .join(" ")}...`
                                    : "Description Not Available"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default BlogList
