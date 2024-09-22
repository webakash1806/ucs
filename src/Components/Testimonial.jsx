import ReviewCard from './ReviewCard'
import cardBgImg from '../assets/car1.avif'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useReviewData from '../Hooks/useReviewData';

const Testimonial = () => {
    const settings = {
        infinite: true,
        speed: 1000,  // Adjust the speed for the fade effect
        // fade: true,   // Enable fade transition
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        cssEase: 'linear'  // Use linear easing for smooth transitions
    };

    return (
        <div className='relative flex flex-col items-center justify-between pb-[5rem] bg-black' >
            <img src={cardBgImg} alt="icon" className='absolute top-0 left-0 w-full object-cover h-full' />
            <div className='w-full h-full bg-black absolute opacity-70'></div>
            <div className='absolute top-6 z-10 text-center'>
                <h1 className='text-white text-3xl font-semibold'>What our family says?</h1>
                <p className='text-white mt-1'>Listen by them</p>
            </div>
            <Slider {...settings} className='mt-[8rem] xl:mt-[10rem] flex h-fit z-[60] w-full'>
                {
                    useReviewData.map((data, ind) => <ReviewCard key={ind + 1} data={data} />)
                }
            </Slider>
        </div >
    )
}

export default Testimonial;
