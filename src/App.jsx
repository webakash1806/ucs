import { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffectOnce } from './hooks/useEffectOnce'; // Custom hook for useEffect once
import Loading from './Components/Loading';

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

const App = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init();
  }, []);

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

  return (
    <>
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

          {/* Auth */}
          <Route element={<RequireAuth />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/booking/:id' element={<PastBooking />} />
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
