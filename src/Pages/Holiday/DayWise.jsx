import React, { useState } from 'react';

const DayWiseSection = ({data}) => {
  console.log(data);
  

  const dayData = [
    {
      day: 1,
      date: '5 Dec, Thu',
      details: [
        'Arrival at the hotel and check-in.',
        'Welcome drink and relaxation at the hotel.',
        'City tour including landmarks and local market visit.',
        'Dinner at a local restaurant with authentic cuisine.',
      ],
    },
    {
      day: 2,
      date: '6 Dec, Fri',
      details: [
        'Breakfast at the hotel.',
        'Guided tour of ancient ruins and temples.',
        'Lunch by the riverside.',
        'Leisure time for shopping or pool relaxation.',
        'Sunset cruise with live music and dinner.',
      ],
    },
    {
      day: 3,
      date: '7 Dec, Sat',
      details: [
        'Early morning hike for a mountain sunrise.',
        'Breakfast at the hotel.',
        'Cultural workshop on local crafts.',
        'Lunch at a traditional village.',
        'Campfire and BBQ dinner at the hotel.',
      ],
    },
    {
      day: 4,
      date: '8 Dec, Sun',
      details: [
        'Breakfast at the hotel.',
        'Check-out and airport transfer.',
        'Farewell from the tour guide.',
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4  border borde-red-500 pt-4">
      {dayData.length === 0 ? (
        <p className="text-center text-gray-500">No itinerary data available</p>
      ) : (
        data.map((day, index) => (
          <DayDetail key={index} day={day?.day}  details={day?.description
          } />
        ))
      )}
    </div>
  );
};

const DayDetail = ({ day, date, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative  flex items-start">
      {/* Circle with Day Label */}
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-blue-500 text-white text-sm font-medium w-12 h-12 flex items-center justify-center">
           {day}
        </div>
        {/* Dotted Line */}
        <div className="flex flex-col items-center">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="w-1 h-1 bg-gray-300 rounded-full my-1"></div>
          ))}
        </div>
      </div>

      {/* Detail Section */}
      <div className={`ml-3 bg-white shadow-sm rounded-md ${isOpen? ' mb-4 ' :'mb-0'} p-3 w-full border border-gray-200`}>
        <div className="flex justify-between items-center">
          <h3 className="text-md text-gray-800">{` ${day} `}</h3>
          {/* Toggle Button */}
          <button
            className="text-blue-500 text-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Close' : 'Details'}
          </button>
        </div>
        {isOpen && (
          // <div className="mt-2 text-sm text-gray-600 space-y-1">
          //   {details.map((detail, index) => (
          //     <p key={index}>{detail}</p>
          //   ))}
          // </div>
          <div
             
                dangerouslySetInnerHTML={{ __html:details }}
            />


        )}
      </div>
    </div>
  );
};

export default DayWiseSection;
