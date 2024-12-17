import MainSlider from '../Components/MainSlider'
import HomeSection1 from '../Components/HomeSection1'
import HomeSection2 from '../Components/HomeSection2'
import BlogSection from '../Components/BlogSection'
import Testimonial from '../Components/Testimonial'
import WhyChoose from '../Components/WhyChoose'
import ServiceSection from '../Components/ServiceSection'
import { useDispatch } from 'react-redux'

import { useEffect } from 'react'
import { getAbout, getAllHome } from '../Redux/Slices/dynamicSlice'
import HolidayPackage from '../Components/HolidayPackage'



const Home = () => {

    const dispatch=useDispatch()

    const fetchData=async()=>{
        console.log("fetch datat call..");
        
        const response=await dispatch(getAllHome())
        console.log(response);
        
    }



    useEffect(()=>{
        fetchData()
    },[])


    return (
        <div>
            <MainSlider />
            <HolidayPackage/>
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
