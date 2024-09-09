import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RegisterPage from './Pages/Auth/RegisterPage';
import carIcon from './assets/icons/carTrip.gif'
import LoginPage from './Pages/Auth/Login';

// Lazy loading the pages
const Home = lazy(() => import('./Pages/Home'));
const Contact = lazy(() => import('./Pages/Contact'));
const About = lazy(() => import('./Pages/About'));

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Header />
      <Suspense fallback={<div className="flex items-center justify-center h-screen"><img className='w-[6rem]' src={carIcon} /></div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
