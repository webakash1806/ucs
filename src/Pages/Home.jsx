import React from 'react'
import MainSlider from '../Components/MainSlider'
import HomeSection1 from '../Components/HomeSection1'
import HomeSection2 from '../Components/HomeSection2'
import BlogSection from '../Components/BlogSection'
import Testimonial from '../Components/Testimonial'
import WhyChoose from '../Components/WhyChoose'
import ServiceSection from '../Components/ServiceSection'
import car1 from '../assets/car1.jpg'


const Home = () => {
    return (
        <div>
            <MainSlider />
            <HomeSection1 />
            <ServiceSection />




            <HomeSection2 />
            <WhyChoose />
            <Testimonial />

            <BlogSection />

        </div>
    )
}

export default Home
