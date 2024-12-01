import React, { useState } from "react";
import BreadCrumbs from "../../Components/BreadCums";
import { useLocation } from "react-router-dom";

const HolidayForm = () => {


  const {state}=useLocation()

  console.log(state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountChange = (type, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] + type),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Placeholder for your function
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Package" },
    { label: "PackageDetail" },
  ];


  const [formData, setFormData] = useState({
    destination: state?.packageName,
    name: "",
    mobile: "",
    email: "",
    adults: 1,
    children: 0,
    infants: 0,
  });

  return (
    <div>
      <BreadCrumbs headText={"Holiday Form"} items={breadcrumbItems} />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 px-4 py-2">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg md:max-w-2xl w-full border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center text-main">
            Plan Your Dream Holiday
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Fill in the details to create a memorable experience.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination and Name in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  readOnly
                  className="w-full border rounded-md px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Mobile and Email in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile No.
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 Mobile No."
                  className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your E-Mail ID"
                  className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Passengers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passengers
              </label>
              <div className="grid grid-cols-3 gap-4">
                {/* Adults */}
                <div className="text-center">
                  <label className="block font-medium text-gray-700 mb-2">
                    Adults
                  </label>
                  <div className="flex justify-center items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCountChange(-1, "adults")}
                      className="w-8 h-8 border rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="font-semibold">{formData.adults}</span>
                    <button
                      type="button"
                      onClick={() => handleCountChange(1, "adults")}
                      className="w-8 h-8 border rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="text-center">
                  <label className="block font-medium text-gray-700 mb-2">
                    Children
                  </label>
                  <div className="flex justify-center items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCountChange(-1, "children")}
                      className="w-8 h-8 border rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="font-semibold">{formData.children}</span>
                    <button
                      type="button"
                      onClick={() => handleCountChange(1, "children")}
                      className="w-8 h-8 border rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="text-center">
                  <label className="block font-medium text-gray-700 mb-2">
                    Infants
                  </label>
                  <div className="flex justify-center items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCountChange(-1, "infants")}
                      className="w-8 h-8 border rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="font-semibold">{formData.infants}</span>
                    <button
                      type="button"
                      onClick={() => handleCountChange(1, "infants")}
                      className="w-8 h-8 border rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-main text-white py-3 rounded-md hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Submit Your Query
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HolidayForm;
