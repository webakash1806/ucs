import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Header from './Components/Header'
import Footer from './Components/Footer'
import AOS from 'aos';
import 'aos/dist/aos.css';
const App = () => {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
