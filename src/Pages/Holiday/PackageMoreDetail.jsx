import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPackage } from "../../Redux/Slices/packageSlice";
import BreadCrumbs from "../../Components/BreadCums";
import FilterPackage from "./FilterPackage";
import { useLocation } from "react-router-dom";

const PackageMoreDetail = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state?.packages);

  const location = useLocation();
  const { state } = location;

  // State to hold filtered data
  const [filteredData, setFilteredData] = useState([]);

  // Fetch packages
  const fetchData = async () => {
    await dispatch(getPackage());
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter data based on packageTagDetail and state?.input
  useEffect(() => {
    if (data && state?.input) {
      const filtered = data.filter((item) => {
        // Check if packageTagDetail exists and matches input
        const hasMatchingTag =
          item.packageTagDetail?.length > 0 &&
          item.packageTagDetail.some((tag) =>
            tag.toLowerCase().includes(state.input.toLowerCase())
          );
  
        // Check if categoriesDetails exists and matches input
        const hasMatchingCategory =
          item.categoriesDetails?.length > 0 &&
          item.categoriesDetails.some((category) =>
            category.toLowerCase().includes(state.input.toLowerCase())
          );
  
        // Return true if either has a match
        return hasMatchingTag || hasMatchingCategory;
      });
  
      setFilteredData(filtered);
    } else {
      // Reset to all data if no input or data
      setFilteredData(data || []);
    }
  }, [data, state?.input]);
  

  

  return (
    <div>
      {/* Breadcrumb */}
      <BreadCrumbs headText={state?.input} />

      {/* Pass the filtered data to FilterPackage */}
   

      {/* Optional: Display a message if no filtered data exists */}
      {filteredData.length === 0 && !loading && !error ? (
        <p className="text-center text-gray-600 mt-4 py-10 font-semibold">
          No packages found matching "{state?.input}".
        </p>
      ):    <FilterPackage holiday={filteredData} isLoading={loading} isError={error} />}

    </div>
  );
};

export default PackageMoreDetail;
