import React, { useState, useEffect } from "react";
import img1 from '../../assets/holiday/holiday1.png';
import img2 from '../../assets/holiday/holiday2.png';
import HolidayDetailScroll from "./HolidayDetailScroll";
import { TbPointFilled } from "react-icons/tb";
import { SiTicktick } from "react-icons/si";
import BreadCrumbs from "../../Components/BreadCums";
import DayWiseSection from "./DayWise";
import { useDispatch, useSelector } from "react-redux";
import { addPackageQuery, getPackage, getPackageInclude } from "../../Redux/Slices/packageSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './StyleHoliday.css'
import HolidayForm from "./HolidayForm";
import RouteMap from "./RouteMap";

import p1 from '../../assets/icon.avif'
import routemap from '../../assets/route.jpg'
import wrong from '../../assets/wrong.avif'
import time from '../../assets/time.avif'
import RouteDesign from "./RouteMap";



const BlogItems = ({ data }) => {
  return (
    <div className="mt-12 border border-gray-200 rounded-lg p-6 shadow-lg bg-white">
      <h4 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-300 pb-3">
        Similar Packages
      </h4>

      {/* Scrollable container for the packages in a column */}
      <div className="space-y-6">
        {data.map((val, i) => (
          <div
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition duration-300"
            key={i}
          >
            {/* Image Section with smaller image */}
            <img
              src={val?.mainPhoto?.secure_url || "default-image-url"}
              alt={val?.packageName}
              className="w-20 h-20 object-cover rounded-lg shadow-md"
            />

            {/* Package Details */}
            <div>
              <Link
                to={`/holiday/${val.id}`}
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
              >
                {val?.packageName}
              </Link>
              <p className="text-sm text-gray-600 mt-1">
                {val?.rate ? `₹${val.rate}/person` : "Price not available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};







const HolidayDetail = () => {
  const [showDetails, setShowDetails] = useState(null);
  const [similarPackages, setSimilarPackages] = useState([]);
  const [openTerms, setOpenTerms] = useState(false);
  const [openBookingPolicy, setOpenBookingPolicy] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [activeTab, setActiveTab] = useState('terms');
  const dispatch=useDispatch()
  const [isFormOpen,setIsOpenFrom]=useState(false)
  const navigate=useNavigate()
  const [isIncludeModalOpen, setIsIncludeModalOpen] = useState(false);
  const [isIncludeEdit, setIsIncludeEdit] = useState(null);
  const {data,loading,error,includeData}=useSelector((state)=>state?.packages)
  const {state}=useLocation()
  const [formData, setFormData] = useState({
    destination: "",
    name: "",
    mobile: "",
    email: "",
    adults: 1,
    children: 0,
    infants: 0,
    query: "",
  });

  const [spinLoading,setSpinLoading]=useState(false)

  // Function to handle input changes and update state


  console.log(state);
  



  const termsPoints = [
    'Users must be 18 years or older to make a booking.',
    'Bookings are subject to availability and confirmation.',
    'Payment must be made in full before the booking is confirmed.',
    'Cancellations may incur fees as per our cancellation policy.',
  ];

  const bookingPolicyPoints = [
    'Cancellations made within 24 hours are eligible for a full refund.',
    'Changes to bookings may result in additional charges.',
    'Late arrivals may be treated as a no-show and may forfeit the booking.',
    'Customers are responsible for providing accurate details during booking.',
  ];

  const images = [img1, img2];

  const fetchData=async()=>{
    const response=await dispatch(getPackage())
    console.log(response);
    
  }

  const fetchPackageData=async()=>{
      const response=await dispatch(getPackage())
      console.log(response);
      
  }

  const fetchIncludeData=async()=>{
    const response=await dispatch(getPackageInclude())
    console.log("include package is", response); 
  }



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  useEffect(()=>{
      fetchData()
  },[])

  useEffect(()=>{
    fetchIncludeData()
},[])

  useEffect(()=>{
      fetchPackageData()
  },[])

  const toggleDetails = (day) => {
    setShowDetails(showDetails === day ? null : day);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Package' },
    { label: 'PackageDetail' },
  ];

  const formattedInclusive = state?.inclusive
  ? state.inclusive.replace(
      /{tick}/g, // Replace a placeholder `{tick}` with the icon
      `<i class="text-green-500"><svg xmlns="http://www.w3.org/2000/svg" class="text-green-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.293 9.293a1 1 0 0 1 1.414 0L10 11.586l4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0L6.293 10.707a1 1 0 0 1 0-1.414z"/></svg></i>`
    )
  : '';


  const enhanceList = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const ul = doc.querySelector('ul');
    if (ul) {
      ul.querySelectorAll('li').forEach((li) => {
        // Create an icon element
        const icon = document.createElement('i');
        icon.textContent = '✔️'; // Change to any desired icon
        icon.style.marginRight = '8px';
        icon.style.color = 'green';
        li.prepend(icon); // Add the icon before the text
      });
      return ul.outerHTML;
    }
    return htmlString; // Return original string if no <ul>
  };

  const enhancedHTML = enhanceList(formattedInclusive);


    // Function to parse and enhance list items with cross icons
    const enhanceExclusiveList = (htmlString) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const ul = doc.querySelector('ul');
      if (ul) {
        ul.querySelectorAll('li').forEach((li) => {
          // Create a cross icon element
          const icon = document.createElement('i');
          
          icon.textContent = '❌'; // Change to any desired cross icon
          icon.style.marginRight = '8px';
          icon.style.color = 'red';
          li.prepend(icon); // Add the icon before the text
        });
        return ul.outerHTML;
      }
      return htmlString; // Return original string if no <ul>
    };
  
    const enhanced1HTML = enhanceExclusiveList(state?.exclusive);


    const handleQuery=()=>{
      console.log("calling");
      
        setIsOpenFrom(true)
        navigate('/holiday/form', { state: { ...state } })
    }

    const toggleIncludeModal = () => {
      setIsIncludeModalOpen(!isIncludeModalOpen);
      if (isIncludeModalOpen) setIncludeName(''); // Reset name when closing
    };
  
    const handleEditInclude = (item) => {
      setIncludeName(item.testName);
      setIsIncludeEdit(item); // Set the item to be edited
      toggleIncludeModal();
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value, // Dynamically update the state field based on input name
      });
    };

    const handleSubmit=async(data)=>{
         console.log("subdmit is",data);
         setSpinLoading(true)
         const response=await dispatch(addPackageQuery(data))
         setSpinLoading(false)
         setIsIncludeModalOpen(false)
         
    }

    useEffect(() => {
      if (data) {
        findSimilarPackages();
      }
    }, [data]);

    const findSimilarPackages = () => {
  
      if (!state || !state.categoriesDetails || state.categoriesDetails.length === 0) {
        // If no category, pick the first 5 packages as a fallback
        setSimilarPackages(data.slice(0, 5));
        return;
      }
  
      // Filter packages with matching categories
      const matchedPackages = data.filter((pkg) =>
        pkg.categoriesDetails?.some((cat) => state.categoriesDetails.includes(cat))
      );
  
      // Fallback if no matching packages found
      if (matchedPackages.length === 0) {
        setSimilarPackages(data.slice(0, 5));
      } else {
        setSimilarPackages(matchedPackages);
      }
    };    

    console.log("similar package is",similarPackages);

    console.log("package include is",includeData);
    
    
  

  return (
    <div className="bg-gray-50 font-sans text-gray-800 ">
      <BreadCrumbs headText={state?.packageName}  image={state?.mainPhoto?.secure_url} />
      
      <div className="container mx-auto p-4 lg:p-6 flex flex-col lg:flex-row lg:max-w-7xl gap-6">
        
        {/* Left Section */}
        <div className="flex-1">

     
          <HolidayDetailScroll data={state?.photos} />
          {/* <RouteMap/> */}
          <RouteDesign/>
          <div className="bg-gray-50 border border-gray-100 mt-4 ">
            <DayWiseSection  data={state?.dayWise} />
          </div>
          
     
          <div className="flex flex-col lg:flex-row gap-4 pt-4">
         {/* Inclusive Section */}
         <div className="lg:w-1/2 w-full rounded-lg p-4 shadow-sm bg-[#EAFAEA] ">
      <div className="flex items-center mb-2">
        <i className="text-blue-600 mr-2">🌟</i> {/* Icon */}
        <h2 className="text-lg font-semibold text-blue-700">Inclusive</h2>
      </div>
      <div

        dangerouslySetInnerHTML={{ __html: enhancedHTML }}
      />
    </div>

         

  {/* Exclusive Section */}
  <div className="lg:w-1/2 w-full border border-gray-200 rounded-lg p-4 shadow-sm bg-[#FBEBEB]">
    <div className="flex items-center mb-2">
      <i className="text-red-600 mr-2">🚫</i> {/* Icon */}
      <h2 className="text-lg font-semibold text-red-700">Exclusive</h2>
    </div>
    {/* Scrollable Content */}
    <div className="h-fit overflow-y-scroll space-y-2 pr-2">
      <div >
    <div
             className=""
             dangerouslySetInnerHTML={{ __html: enhanced1HTML }}
         />
      </div>

    </div>
  </div>

  


          </div>
          {/* Terms and Booking Policy Section */}
          <div className="p-4 mt-4 bg-white shadow-lg rounded-lg">
            <div className="flex justify-start mb-4 border-b-2">
              <button
                onClick={() => setActiveTab('terms')}
                className={`px-4 py-2 font-semibold ${activeTab === 'terms' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
              >
                Terms & Conditions
              </button>
              <button
                onClick={() => setActiveTab('booking')}
                className={`px-4 py-2 font-semibold ${activeTab === 'booking' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
              >
                Booking Policy
              </button>
            </div>

            <div className="mt-4">
              {activeTab === 'terms' && (
                // <ul className="list-disc list-inside space-y-2 text-gray-700">
                //   {termsPoints.map((point, index) => (
                //     <li key={index}>{point}</li>
                //   ))}
                // </ul>
                <div className="holiday">
                <div
             
             dangerouslySetInnerHTML={{ __html: state?.termsAndCondition
              
               }}
         />
         </div>
              )}
              {activeTab === 'booking' && (
                // <ul className="list-disc list-inside space-y-2 text-gray-700">
                //   {bookingPolicyPoints.map((point, index) => (
                //     <li key={index}>{point}</li>
                //   ))}
                // </ul>
                <div className="holiday">
                <div
             
                dangerouslySetInnerHTML={{ __html: state?.bookingPolicy

                  }}
            />
            </div>
              )}
            </div>
          </div>
             {/* Similar Packages Section */}
   <div className="mt-6">
    {/* <BlogItems data={similarPackages}/> */}
        {/* <h2 className="text-2xl font-semibold mb-4">Similar Packages</h2> */}
  {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {similarPackages.length > 0 ? (
      similarPackages.map((pkg, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex items-center"
        >
          <img
            src={pkg?.mainPhoto?.secure_url || 'default-image-url'}
            alt={pkg.packageName}
            className="w-10 h-10 object-cover rounded-full"
          />
          <div className="flex flex-col mt-3 flex-grow">
            <h3 className="text-lg font-bold text-gray-800">{pkg.packageName}</h3>
            <p className="text-gray-600 text-sm mt-1">
              {pkg.rate ? `Starting from ₹${pkg.rate}` : "Price not available"}
            </p>
          </div>
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate(`/holiday/${pkg.id}`, { state: pkg })}
          >
            View Details
          </button>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-center col-span-full">
        No similar packages available at the moment.
      </p>
    )}
  </div> */}
</div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/3">
  <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-300">
    {/* Price Section */}
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 p-4 rounded-lg mb-2">
      <div className="flex items-center justify-between w-full mb-2">
        <p className="text-sm font-semibold text-gray-800">Starting from</p>
      </div>
      <div className="text-4xl font-bold text-black">
        ₹{state?.rate}
        <span className="text-lg font-medium text-gray-600 ml-2">/ Person</span>
      </div>
    </div>

    {/* What We Included */}
    {/* What We Included */}
<div className="bg-gradient-to-r from-green-50 via-green-100 to-green-50 px-4 py-6 rounded-lg mb-2">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Package Included</h2>
  {state?.includedDetails && state.includedDetails.length > 0 ? (
    <ul className="flex flex-row items-center gap-2 flex-wrap ">
  {state.includedDetails.map((val, index) => {
    const matchingInclude = Array.isArray(includeData)
      ? includeData.find((data) => data.includeName === val)
      : null;

    return (
      <li key={index} className="flex items-center space-x-2 text-gray-700">
        {/* Show image if match found */}
        {matchingInclude &&  (
          <img src={matchingInclude?.includePhoto
            ?.secure_url} alt={val} className="w-10 h-10 object-cover" />
        ) }
        {/* Text */}
        <span className="text-sm font-medium">{val}</span>
      </li>
    );
  })}
</ul>


  ) : (
    <p className="text-gray-500">No details available.</p>
  )}
</div>


    {/* Duration Section */}
    <div className="bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 px-4 py-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Duration</h2>
      <div className="flex items-center gap-4">
        <img src={time} alt="" className="w-10 h-10 object-cover"/>
      <p className="text-2xl text-black font-bold">
        {state?.duration
          ? `${state.duration - 1} Nights/${state.duration} Days`
          : "Duration not available"}
      </p>
      </div>
     
    </div>

    {/* Submit Query Button */}
    <div className="px-4 flex flex-col gap-2 mb-4">
      <button className="bg-gradient-to-r from-orange-400 to-orange-600 w-full text-white py-2 font-semibold text-sm hover:from-orange-500 hover:to-orange-700 transition rounded-full"   onClick={toggleIncludeModal}>
        SUBMIT QUERY
      </button>
    </div>

    {/* Contact Info */}
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm text-center border border-gray-200">
      <p className="font-semibold text-gray-800 text-lg">Need Help?</p>
      <p className="text-sm text-gray-600">
        Email:{" "}
        <a
          href="mailto:ucs@gmail.com"
          className="text-blue-600 underline hover:text-blue-700"
        >
          ucs@gmail.com
        </a>
      </p>
      <p className="text-sm text-gray-600">
        Phone:{" "}
        <a
          href="tel:919876543210"
          className="text-blue-600 underline hover:text-blue-700"
        >
          +91 9876543210
        </a>
      </p>
    </div>
   
    <BlogItems data={similarPackages}/>


  </div>






{isIncludeModalOpen && (
  <div className="fixed top-0 left-0 z-[80] w-full h-full flex justify-center items-center bg-black bg-opacity-50 overflow-x-hidden overflow-y-auto" role="dialog">
    <div className="bg-white border shadow-sm rounded-xl w-full max-w-lg pointer-events-auto transition-all ease-out duration-500 mt-7 opacity-100 sm:mx-auto">
      <div className="flex justify-between items-center py-3 px-4 border-b">
        <h3 className="font-bold text-gray-800">
          {isIncludeEdit ? "Edit Form" : "Add Detail"}
        </h3>
        <button
          onClick={toggleIncludeModal}
          className="w-8 h-8 inline-flex justify-center items-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className="p-4">
        {/* Holiday Form directly in the modal */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const formValues = Object.fromEntries(formData.entries());
            handleSubmit(formValues)
          }}
          className="space-y-6"
        >
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
                placeholder="Enter Destination"
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
                <input
                  type="number"
                  name="adults"
                  defaultValue={1}
                  min={0}
                  className="w-20 border rounded-md px-2 py-1 text-center"
                />
              </div>

              {/* Children */}
              <div className="text-center">
                <label className="block font-medium text-gray-700 mb-2">
                  Children
                </label>
                <input
                  type="number"
                  name="children"
                  defaultValue={0}
                  min={0}
                  className="w-20 border rounded-md px-2 py-1 text-center"
                />
              </div>

              {/* Infants */}
              <div className="text-center">
                <label className="block font-medium text-gray-700 mb-2">
                  Infants
                </label>
                <input
                  type="number"
                  name="infants"
                  defaultValue={0}
                  min={0}
                  className="w-20 border rounded-md px-2 py-1 text-center"
                />
              </div>
            </div>
          </div>

           {/* Textarea for Query */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Submit Your Message
    </label>
    <textarea
      name="query"
      placeholder="Type your message here..."
      rows={4}
      className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
    ></textarea>
  </div>

          {/* Submit and Cancel */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={toggleIncludeModal}
              className="py-2 px-3 text-sm font-medium rounded-lg bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {spinLoading ? <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div> :"Submit"}
            </button>
          </div>
        </form>


      </div>
    </div>
  </div>
)}




</div>




      </div>
    </div>
  );
};

export default HolidayDetail;
