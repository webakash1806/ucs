import MainSlider from '../Components/MainSlider'
import HomeSection1 from '../Components/HomeSection1'
import HomeSection2 from '../Components/HomeSection2'
import BlogSection from '../Components/BlogSection'
import Testimonial from '../Components/Testimonial'
import WhyChoose from '../Components/WhyChoose'
import ServiceSection from '../Components/ServiceSection'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAbout, getAllHome } from '../Redux/Slices/dynamicSlice'
import HolidayPackage from '../Components/HolidayPackage'
import BlogList from './Blog/BlogList'
import PackageCard from '../Components/PackageCard'
import LoadingSpinner from '../Components/LoadSpinner'

const Home = () => {
    const dispatch = useDispatch()
    const { home, loading, error } = useSelector((state) => state.dynamic)

    const fetchData = async () => {
        console.log("fetch data call..")
        const response = await dispatch(getAllHome())
     
    }

    useEffect(() => {
        fetchData()
    }, [])

    // Check if data is still loading or home is empty or null
    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error loading data</div>
    }

    if (!home || home.length === 0) {
        <LoadingSpinner/>
    }



    return (
        <div>
            {/* Conditionally render based on data availability */} 
            {home[0] && <MainSlider data={home[0]} />}
             <HolidayPackage/>
            {home[1] && <HomeSection1 data={home[1]} />}
            <ServiceSection />
            {home[3] && <HomeSection2 data={home[3]} />}
            <WhyChoose />
            {home[4] && <Testimonial data={home[4]} />}
            {/* {  <BlogSection  />} */}
            <BlogList/>
        </div>
    )
}

export default Home
