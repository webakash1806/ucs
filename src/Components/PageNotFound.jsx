import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    // Trigger animations after component mount
    setTimeout(() => setFadeIn(true), 300);
    
    // Trigger glitch effect periodically
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="py-10 sm:py-12 md:py-14 lg:py-16 bg-gray-100 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative elements */}
      {/* <div className="absolute top-0 left-0 w-full h-8 bg-[#E47F9F]"></div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-[#E47F9F]"></div>
      <div className="absolute top-0 left-0 w-8 h-full bg-[#E47F9F]"></div>
      <div className="absolute top-0 right-0 w-8 h-full bg-[#E47F9F]"></div> */}
      
      {/* Yellow circuit-like patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-main opacity-20 rounded-full"></div>
        <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-main opacity-10"></div>
        <div className="absolute top-8 left-8 bottom-8 right-8 border border-main opacity-10"></div>
        <div className="absolute top-0 left-1/2 h-full w-px bg-main opacity-10"></div>
        <div className="absolute left-0 top-1/2 w-full h-px bg-main opacity-10"></div>
      </div>

      <div
        className={`text-center z-10 transition-all duration-700 ${
          fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="mb-6 relative">
          <AlertTriangle size={48} className="text-main mx-auto mb-4" />
          <h1 
            className={`text-9xl font-bold tracking-tighter mb-2 ${
              glitch ? 'text-red-500' : 'text-[#E47F9F]'
            } transition-colors relative`}
            style={{
              textShadow: glitch ? 
                '2px 2px #00FFFF, -2px -2px #FF00FF' : 
                '0 0 10px rgba(250, 204, 21, 0.5)'
            }}
          >
            404
            <span className={`absolute inset-0 text-main ${glitch ? 'translate-x-1' : ''} transition-transform`}>
              404
            </span>
          </h1>
        </div>
        
        <h2 className="text-3xl font-bold mb-2 text-black">PAGE NOT FOUND</h2>
        <p className="text-black mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
          <Link 
            to="/"
            className="bg-main hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            <Home size={20} />
            Home Page
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="bg-black text-white border-2 border-maintext-mainhover:bg-[#E47F9F]/10 font-bold py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>

      {/* Technical-looking footer */}
      <div className={`absolute bottom-12 left-0 w-full text-center text-xs text-gray-600 font-mono ${
        fadeIn ? 'opacity-40' : 'opacity-0'
      } transition-opacity duration-1000 delay-500`}>
        ERROR::404 | REF:://{Math.random().toString(36).substring(2, 12)}
      </div>
    </div>
  );
};

export default NotFound;