import React from 'react'
import MainSlider from '../Components/MainSlider'
import HomeSection1 from '../Components/HomeSection1'
import HomeSection2 from '../Components/HomeSection2'
import BlogSection from '../Components/BlogSection'
import Testimonial from '../Components/Testimonial'
import WhyChoose from '../Components/WhyChoose'

const Home = () => {
    return (
        <div>
            <MainSlider />
            <HomeSection1 />
            <HomeSection2 />
            <WhyChoose />
            <Testimonial />

            <BlogSection />

        </div>
    )
}

export default Home
