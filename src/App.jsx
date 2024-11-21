import { useEffect, lazy, Suspense, useState } from 'react';
import { Link, matchPath, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffectOnce } from './Hooks/useEffectOnce'; // Custom hook for useEffect once
import Loading from './Components/Loading';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';
import routeTitles from './Hooks/routeTitles'
import seoMetaDescriptions from './Hooks/seoMetaDescriptions';
import seoKeywords from './Hooks/seoKeywords';
import { FaWhatsapp } from 'react-icons/fa';
import HolidayPage from './Pages/Holiday/HolidayPage';
import HolidayDetail from './Pages/Holiday/HolidayDetail';
// Lazy loading the pages
const Home = lazy(() => import('./Pages/Home'));
const Contact = lazy(() => import('./Pages/Contact'));
const About = lazy(() => import('./Pages/About'));
const RegisterPage = lazy(() => import('./Pages/Auth/RegisterPage'));
const LoginPage = lazy(() => import('./Pages/Auth/Login'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./Pages/TermsAndConditions'));
const FAQPage = lazy(() => import('./Pages/FAQPage'));
const CarList = lazy(() => import('./Pages/CarList/CarList'));
const BookCab = lazy(() => import('./Pages/BookingPage/BookCab'));
const CarDropList = lazy(() => import('./Pages/CarList/CarDropList'));
const BookAirportCab = lazy(() => import('./Pages/BookingPage/BookAirportCab'));
const RoundCarList = lazy(() => import('./Pages/CarList/RoundCarList'));
const LocalCarRentals = lazy(() => import('./Pages/ServicePage/LocalCarRentals'));
const RoundTripBook = lazy(() => import('./Pages/BookingPage/RoundTripBook'));
const OnewayCarList = lazy(() => import('./Pages/CarList/OnewayCarList'));
const BookOnewayCab = lazy(() => import('./Pages/BookingPage/BookOnewayCab'));
const PastBooking = lazy(() => import('./Pages/Auth/PastBooking'));
const Profile = lazy(() => import('./Pages/Auth/Profile'));
const RequireAuth = lazy(() => import('./Components/Auth/RequireAuth'));
const RoundTripService = lazy(() => import('./Pages/ServicePage/RoundTripService'));
const AirportCabService = lazy(() => import('./Pages/ServicePage/AirportCabService'));
const OneWayService = lazy(() => import('./Pages/ServicePage/OneWayService'));
const ForgotPassword = lazy(() => import('./Pages/Auth/ForgotPassword'));
import 'primereact/resources/themes/saga-blue/theme.css';  // or any other available theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';




import SocialMediaIcons from './Components/SocailMedia';
import BlogDetail from './Pages/Blog/BlogDetail';


const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init();
  }, []);


  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };


  // Handle scroll to show/hide button
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleScroll = debounce(() => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 100); // Adjust the delay time as needed

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  useEffectOnce(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  });

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getMetaData = (currentPath) => {
    const matchedRoute = routeTitles.find(route => matchPath(route.path, currentPath));
    return matchedRoute ? matchedRoute.title : 'Page';
  };

  const currentPath = location.pathname;
  const routeTitle = getMetaData(currentPath);

  const getDescription = (currentPath) => {
    const matchedRoute = seoMetaDescriptions.find(route => matchPath(route.path, currentPath));
    return matchedRoute ? matchedRoute.description : 'Page';
  };

  const routeDesc = getDescription(currentPath);

  const getKeywords = (currentPath) => {
    const matchedRoute = seoKeywords.find(route => matchPath(route.path, currentPath));
    return matchedRoute ? matchedRoute.description : 'Page';
  };

  const routeKeywords = getKeywords(currentPath);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          {/* Primary Meta Tags */}
          <title>{`UCS Cabs | ${routeTitle}`}</title>
          <meta name="author" content="Akash Kumar Singh | Ayush Mishra" />
          <meta name="description" content={routeDesc} />
          <meta name="keywords" content={routeKeywords} />

          {/* Open Graph / Facebook Meta Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={routeTitle} />
          <meta property="og:description" content={routeDesc} />
          <meta property="og:image" content={"routeImage"} />
          <meta property="og:url" content={"routeUrl"} />
          <meta property="og:site_name" content="UCS Cabs" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={routeTitle} />
          <meta name="twitter:description" content={routeDesc} />
          <meta name="twitter:image" content={"routeImage"} />
          <meta name="twitter:site" content="@yourTwitterHandle" />
          <meta name="twitter:creator" content="@yourTwitterHandle" />

          {/* Mobile Viewport Meta Tag */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* Canonical Link */}
          <link rel="canonical" href={"http://localhost:5173/"} />

          {/* Robots Meta Tags */}
          <meta name="robots" content="index, follow" /> {/* Ensures search engines can index and follow links */}

          {/* Favicons */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />

          {/* Additional Meta Tags for SEO */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="theme-color" content="#FFFFFF" /> {/* Defines the theme color for mobile browsers */}
          <meta name="rating" content="General" /> {/* Indicates the content rating of your page */}

          {/* Other Open Graph Tags */}
          <meta property="og:locale" content="en_US" /> {/* Locale settings */}
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </Helmet>
      </HelmetProvider>
      <Header />
      <Suspense fallback={<div className="flex items-center justify-center h-screen"><Loading /></div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
          <Route path='/cars/:cityName' element={<CarList />} />
          <Route path='/cars/from/:pickupName' element={<CarDropList />} />
          <Route path='/cars/round/:pickupName' element={<RoundCarList />} />
          <Route path='/cars/oneway/:pickupName' element={<OnewayCarList />} />
          <Route path='/book-cab' element={<BookCab />} />
          <Route path='/book-airport-cab' element={<BookAirportCab />} />
          <Route path='/book-round-trip-cab' element={<RoundTripBook />} />
          <Route path='/book-oneway-trip-cab' element={<BookOnewayCab />} />
          <Route path='/FAQ' element={<FAQPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/services/local-car-rentals' element={<LocalCarRentals />} />
          <Route path='/services/round-trip' element={<RoundTripService />} />
          <Route path='/services/airport-cabs' element={<AirportCabService />} />
          <Route path='/services/one-way-cabs' element={<OneWayService />} />
          <Route path='/holiday/package' element={<HolidayPage/>} />
          <Route path='/holiday/package/detail' element={<HolidayDetail/>} />
          <Route path='/blog/details' element={<BlogDetail/>} />

          {/* Auth */}
          <Route element={<RequireAuth />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/booking/:id' element={<PastBooking />} />
          </Route>
        </Routes>
      </Suspense>
      <Footer />
   
      <div className='fixed z-20 bottom-4 right-4'>
        <Link
          target='_blank'
          to={"https://api.whatsapp.com/send/?phone=919520801801"}
          className=" flex items-center justify-center mb-2 p-[0.6rem] rounded-full bg-[#0BC144] text-white shadow-lg"
          aria-label="Scroll to top"
        >
          <FaWhatsapp className='text-[1.7rem]' />
        </Link>
        {isVisible && (
          <button
            onClick={scrollToTop}
            className=" flex items-center justify-center  p-[0.6rem] rounded-full bg-main text-white shadow-lg"
            aria-label="Scroll to top"
          >
            <MdKeyboardDoubleArrowUp className='text-[1.7rem]' />
          </button>
        )}
      </div>
    </>
  );
};

export default App;
