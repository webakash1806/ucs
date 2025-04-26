import React from 'react'

const  LoadingSpinner=()=> {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="flex flex-col items-center">
          <div className="relative">
            {/* Outer spinner */}
            <div className="w-16 h-16 md:w-24 md:h-24 border-4 border-blue-200 rounded-full animate-spin"></div>
            
            {/* Inner spinner */}
            <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          </div>
          
          <p className="mt-4 text-lg md:text-xl text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

export default LoadingSpinner