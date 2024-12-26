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

const Home = () => {
    const dispatch = useDispatch()
    const { home, loading, error } = useSelector((state) => state.dynamic)

    const fetchData = async () => {
        console.log("fetch data call..")
        const response = await dispatch(getAllHome())
        console.log(response)
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
        return <div>No data available</div>
    }

    return (
        <div>
            {/* Conditionally render based on data availability */}
            {home[0] && <MainSlider data={home[0]} />}
            {home[1] && <HomeSection1 data={home[1]} />}
            <ServiceSection />
            {home[3] && <HomeSection2 data={home[3]} />}
            <WhyChoose />
            {home[4] && <Testimonial data={home[4]} />}
            {home[5] && <BlogSection data={home[5]} />}
        </div>
    )
}

export default Home
