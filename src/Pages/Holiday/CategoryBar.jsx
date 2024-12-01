import React from "react";

const CategoriesBar = () => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full flex items-center px-4 py-2 space-x-4">
      {/* Category Items */}
      <div className="flex items-center space-x-4">
        <Category icon="🌹" label="Honeymoon" />
        <Category icon="🙏" label="Pilgrimage" />
        <Category icon="💆" label="Ayurveda" />
        <Category icon="✨" label="Luxury" />
        <Category icon="⛰️" label="Adventure" />
        <Category icon="👨‍👩‍👧‍👦" label="Group Departure" />
      </div>
    </div>
  );
};

const Category = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-gray-200 rounded-full p-2 w-12 h-12 flex items-center justify-center">
        <span className="text-lg">{icon}</span>
      </div>
      <span className="text-sm mt-2">{label}</span>
    </div>
  );
};

export default CategoriesBar;
