import React from "react";

const routes = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
  { id: 4, name: "D" },
  { id: 5, name: "E" },
  { id: 6, name: "F" },
];

const RouteMap = () => {
  return (
    <div className="flex items-center my-4 gap-0">
      {routes.map((route, index) => (
        <div className="flex items-center" key={route.id}>
          {/* Circle */}
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            {route.name}
          </div>
          {/* Line */}
          {index < routes.length - 1 && (
            <div className="w-10 h-[2px] bg-gray-600"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RouteMap;
