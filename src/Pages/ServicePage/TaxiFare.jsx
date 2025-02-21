import React from "react";

const TaxiFareTable = () => {
  const fareData = [
    { vehicle: "Indica", pickDrop: 700, rental8hr: 1500, rental12hr: 1800, roundTrip: 8.5, oneWay: 14 },
    { vehicle: "Indigo", pickDrop: 750, rental8hr: 1600, rental12hr: 1900, roundTrip: 9, oneWay: 14.75 },
    { vehicle: "Swift Dzire", pickDrop: 800, rental8hr: 1700, rental12hr: 2000, roundTrip: 9.5, oneWay: 16.25 },
    { vehicle: "Honda Amaze", pickDrop: 850, rental8hr: 1800, rental12hr: 2200, roundTrip: 10, oneWay: 17 },
    { vehicle: "Mobilio / Ertiga", pickDrop: 900, rental8hr: 2400, rental12hr: 2750, roundTrip: 14, oneWay: 20.75 },
    { vehicle: "Toyota Innova", pickDrop: 1100, rental8hr: 2650, rental12hr: 2900, roundTrip: 16, oneWay: 21.5 },
    { vehicle: "Toyota Crysta", pickDrop: 1200, rental8hr: 2850, rental12hr: 3180, roundTrip: 17, oneWay: 23 },
    { vehicle: "Honda City", pickDrop: 1500, rental8hr: 2800, rental12hr: 3600, roundTrip: 18, oneWay: 26 },
    { vehicle: "Tempo Traveller", pickDrop: 2000, rental8hr: 3400, rental12hr: 4400, roundTrip: 22, oneWay: 42 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className=" font-semibold text-center text-main  text-3xl mb-8">Taxi Fare Details in Dehradun</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-main text-white">
              <th className="p-3 border">Vehicle Type</th>
              <th className="p-3 border">Airport Pick/Drop</th>
              <th className="p-3 border">Rental (8Hr 80KM)</th>
              <th className="p-3 border">Rental (12Hr 120KM)</th>
              <th className="p-3 border">Outstation Round Trip (Per KM)</th>
              <th className="p-3 border">Outstation One Way (Per KM)</th>
            </tr>
          </thead>
          <tbody>
            {fareData.map((item, index) => (
              <tr key={index} className="text-center even:bg-gray-100 odd:bg-white">
                <td className="p-3 border">{item.vehicle}</td>
                <td className="p-3 border">₹{item.pickDrop}</td>
                <td className="p-3 border">₹{item.rental8hr}</td>
                <td className="p-3 border">₹{item.rental12hr}</td>
                <td className="p-3 border">₹{item.roundTrip}</td>
                <td className="p-3 border">₹{item.oneWay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-600 mt-4 text-center">
        <strong>Driver Charges (After 10PM):</strong> Rs.250, (Base Fare) | 
        <strong> Outstation (Roundtrip):</strong> Min. 250KM / Day
      </p>
    </div>
  );
};

export default TaxiFareTable;
