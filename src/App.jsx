import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RegisterPage from './Pages/Auth/RegisterPage';
import carIcon from './assets/icons/carTrip.gif'
import LoginPage from './Pages/Auth/Login';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsAndConditions from './Pages/TermsAndConditions';
import FAQPage from './Pages/FAQPage';
import CarList from './Pages/CarList';
import BookCab from './Pages/BookCab';
import CarDropList from './Pages/CarDropList';
import BookAirportCab from './Pages/BookAirportCab';
import RoundCarList from './Pages/RoundCarList';
import RoundTripBook from './Pages/RoundTripBook';
import OnewayCarList from './Pages/OnewayCarList';
import BookOnewayCab from './Pages/BookOnewayCab';
import PastBooking from './Pages/Auth/PastBooking';
import Profile from './Pages/Auth/Profile';
import RequireAuth from './Components/Auth/RequireAuth';

// Lazy loading the pages
const Home = lazy(() => import('./Pages/Home'));
const Contact = lazy(() => import('./Pages/Contact'));
const About = lazy(() => import('./Pages/About'));

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Header />
      <Suspense fallback={<div className="flex items-center justify-center h-screen"><img className='w-[6rem]' src={carIcon} /></div>}>
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
