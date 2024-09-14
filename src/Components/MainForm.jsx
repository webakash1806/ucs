import React, { useEffect, useState, useRef } from 'react';
import { GoArrowSwitch } from 'react-icons/go';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineAccessTime } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLocalCityData } from '../Redux/Slices/localTripSlice';
import { toast } from 'react-toastify';
import { getAirportCityData } from '../Redux/Slices/airportSlice';
import axios from 'axios';

const MainForm = () => {

    useEffect(() => {
        // Load Google Maps script if not already loaded
        if (!window.google || !window.google.maps || !window.google.maps.places) {
            const script = document.createElement('script');
            script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places";
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);

    // -----airport drop

    // Renamed state variables
    const [airportDropValue, setAirportDropValue] = useState('');
    const [airportDropSuggestions, setAirportDropSuggestions] = useState([]);
    const [isAirportDropVisible, setIsAirportDropVisible] = useState(false);
    const [validAirportSuggestions, setValidAirportSuggestions] = useState([]);
    const [airportError, setAirportError] = useState('');



    const handleAirportDropChange = async (event) => {
        const value = event.target.value;
        setAirportDropValue(value);
        setIsAirportDropVisible(true);

        if (value) {
            const autocompleteService = new window.google.maps.places.AutocompleteService();
            autocompleteService.getPlacePredictions({
                input: value,
                types: ['airport'],
                componentRestrictions: { country: 'IN' }
            }, (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    const transformedSuggestions = predictions.map(prediction => ({
                        airportName: prediction.description,
                        placeId: prediction.place_id
                    }));
                    setValidAirportSuggestions(transformedSuggestions); // Update valid suggestions
                    setAirportDropSuggestions(transformedSuggestions);
                } else {
                    console.error('Error fetching suggestions:', status);
                    setAirportDropSuggestions([]);
                }
            });
        } else {
            setAirportDropSuggestions([]);
            setIsAirportDropVisible(false);
        }
    };

    const handleAirportDropSelect = (suggestion) => {
        setAirportDropValue(suggestion.airportName);
        setIsAirportDropVisible(false);
        setAirportError(''); // Clear error when a valid suggestion is selected
    };
    // -----airport drop end



    // ------------airport pickup start
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [validSuggestions, setValidSuggestions] = useState([]);
    const [inputError, setInputError] = useState('');
    const containerRef = useRef(null);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setInputValue(value);
        setShowSuggestions(true);

        if (value) {
            const autocompleteService = new window.google.maps.places.AutocompleteService();
            autocompleteService.getPlacePredictions({
                input: value,
                componentRestrictions: { country: 'IN' } // Restrict to India
            }, (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    const transformedSuggestions = predictions.map(prediction => ({
                        placeName: prediction.description,
                        placeId: prediction.place_id
                    }));
                    setValidSuggestions(transformedSuggestions); // Update valid suggestions
                    setSuggestions(transformedSuggestions);
                } else {
                    console.error('Error fetching suggestions:', status);
                    setSuggestions([]);
                }
            });
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.placeName);
        setShowSuggestions(false);
        setInputError(''); // Clear error when a valid suggestion is selected
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSuggestions(false); // Hide suggestions if click is outside
                setIsAirportDropVisible(false); // Hide suggestions if input is empty

            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    console.log(suggestions)

    // ---------airport end


    const [active, setActive] = useState(1);
    const [outstationActive, setOutstationActive] = useState(1.1);
    const [airportActive, setAirportActive] = useState(3.1);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 30);
        return now;
    });
    const [searchInput, setSearchInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [tripCityError, setTripCityError] = useState('');
    const [focus, setFocus] = useState(false);
    const [tripType, setTripType] = useState('One-Way Trip')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const localCityData = useSelector((state) => state?.localTrip?.cityData);
    const airportCityData = useSelector((state) => state?.airportTrip?.airportData);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);


    console.log(airportCityData)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (inputRef.current && !inputRef.current.contains(event.target)) &&
                (dropdownRef.current && !dropdownRef.current.contains(event.target))
            ) {
                setFocus(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchLocalCityData = async () => {
        await dispatch(getLocalCityData());
        await dispatch(getAirportCityData())
    };

    useEffect(() => {
        fetchLocalCityData();
    }, [dispatch]);

    useEffect(() => {
        if (active === 2 && localCityData?.allCityRate) {
            const filtered = localCityData.allCityRate
                .filter((data) => data.cityName.toLowerCase().startsWith(searchInput.toLowerCase()))
                .map((data) => data.cityName);
            setFilteredCities(filtered);
            setTripType('Local')
        }
    }, [searchInput, active, localCityData]);

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleCitySelect = (city) => {
        setSearchInput(city);
        setFocus(false);
        setFilteredCities([]);
    };

    const formatDateToISO = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    useEffect(() => {
        const date = startDate
        isToday(date)
    }, [startDate])


    const allLocalCityNames = localCityData?.allCityRate?.map((data) => data?.cityName);

    const handleLocalTripSubmit = (e) => {
        e.preventDefault();

        if (active === 3, airportActive === 3.1) {
            setTripType("Drop Airport")
        }

        const date = formatDateToISO(startDate);
        console.log(date)

        if (airportActive === 3.1) {
            if (!validSuggestions.some(suggestion => suggestion.placeName === inputValue)) {
                return setInputError('Select a valid location from the suggestions');
            } else {
                setInputError('');
                // Handle form submission logic here
            }

            if (!validAirportSuggestions.some(suggestion => suggestion.airportName === airportDropValue)) {
                return setAirportError('Select a valid airport from the suggestions');
            } else {
                setAirportError('');
                // Handle form submission logic here
            }


        }



        if (airportActive === 3.2) {
            if (!validAirportSuggestions.some(suggestion => suggestion.airportName === airportDropValue)) {
                return setAirportError('Select a valid airport from the suggestions');
            } else {
                setAirportError('');
                // Handle form submission logic here
            }

            if (!validSuggestions.some(suggestion => suggestion.placeName === inputValue)) {
                return setInputError('Select a valid location from the suggestions');
            } else {
                setInputError('');
                // Handle form submission logic here
            }



        }



        if (active === 2) {
            if (!searchInput) {
                return setTripCityError('Select a valid city name');
            }

            if (allLocalCityNames.includes(searchInput)) {
                setTripCityError('');
            } else {
                return setTripCityError('Select a valid city name');
            }
        }

        if (!startDate) {
            return toast.error("Select pickup date")
        }

        if (!startTime) {
            return toast.error("Select pickup date")
        }

        const time = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });


        if (!time) {
            return toast.error("Select pickup time")
        }

        if (active === 2) {
            navigate(`/cars/${searchInput}`, { state: { tripType: tripType, pickupTime: time, pickupDate: date, city: searchInput, cabData: localCityData } })
        }

        if (active === 3) {
            navigate(`/cars/from/${airportDropValue}`, { state: { tripType: airportActive === 3.1 ? 1 : 2, pickupTime: time, pickupDate: date, pickup: airportActive === 3.1 ? inputValue : airportDropValue, drop: airportActive === 3.1 ? airportDropValue : inputValue, cabData: airportCityData } })
        }

    };
    return (
        <div className=" min-w-[19.5rem] sm:min-w-[23rem] w-full md:w-fit md:min-w-[19.5rem] lg:min-w-[24rem] mb-8 max-w-[25rem] p-4 h-fit">

            <div className="grid rounded-md overflow-hidden backdrop-blur-sm bg-[#00000033] text-[0.9rem] grid-cols-3 font-semibold">
                <button
                    onClick={() => setActive(1)}
                    className={`py-[0.3rem] px-2 border-[0.3px] border-gray-400 rounded-l-md border-r-none transition-all duration-300 ease-in-out transform ${active === 1 ? 'bg-main text-white shadow-lg' : 'bg-transparent text-white hover:bg-[#f0f4f8] hover:text-main scale-100'
                        }`}
                >
                    Outstation
                </button>

                <button
                    onClick={() => setActive(2)}
                    className={`py-[0.3rem] px-2 border-[0.3px] border-gray-400 transition-all duration-300 ease-in-out transform ${active === 2 ? 'bg-main text-white shadow-lg' : 'bg-transparent text-white hover:bg-[#f0f4f8] scale-100 hover:text-main'
                        }`}
                >
                    Local Trip
                </button>

                <button
                    onClick={() => setActive(3)}
                    className={`py-[0.3rem] px-2 border-[0.3px] rounded-r-md border-gray-400 transition-all duration-300 ease-in-out transform ${active === 3 ? 'bg-main text-white shadow-lg' : 'bg-transparent text-white hover:bg-[#f0f4f8] scale-100 hover:text-main'
                        }`}
                >
                    Airport Trip
                </button>
            </div>



            <form onSubmit={handleLocalTripSubmit} className="relative flex flex-col gap-4 p-5 px-3 mt-2 bg-white rounded-lg ">



                {active === 1 &&
                    <div className='w-full flex items-center justify-center text-[0.8rem] tracking-wide'>
                        <button
                            onClick={() => setOutstationActive(1.1)}
                            className={`py-[0.15rem] font-semibold px-4 border-[0.3px] rounded-l-full border-gray-400 transform scale-105 transition-all duration-500 ease-in-out
${outstationActive === 1.1 ? 'bg-main text-white' : 'bg-white text-light hover:bg-[#f0f4f8]'}`}
                        >
                            One way
                        </button>
                        <button
                            onClick={() => setOutstationActive(1.2)}
                            className={`py-[0.15rem] font-semibold px-4 border-[0.3px] rounded-r-full border-gray-400 transform scale-105 transition-all duration-500 ease-in-out
${outstationActive === 1.2 ? 'bg-main text-white' : 'bg-white text-light hover:bg-[#f0f4f8]'}`}
                        >
                            Round Trip
                        </button>
                    </div>}


                {active === 3 &&
                    <>
                        <div className='w-full flex  items-center justify-center text-[0.8rem] tracking-wide'>
                            <div
                                onClick={() => setAirportActive(3.1)}
                                className={`py-[0.15rem] font-semibold px-4 border-[0.3px] rounded-l-full border-gray-400 transform scale-105 transition-all duration-500 ease-in-out
${airportActive === 3.1 ? 'bg-main text-white' : 'bg-white text-main hover:bg-[#f0f4f8]'}`}
                            >
                                Drop
                            </div>
                            <div
                                onClick={() => setAirportActive(3.2)}
                                className={`py-[0.15rem] font-semibold px-4 border-[0.3px] rounded-r-full border-gray-400 transform scale-105 transition-all duration-500 ease-in-out
${airportActive === 3.2 ? 'bg-main text-white' : 'bg-white text-main hover:bg-[#f0f4f8]'}`}
                            >
                                Pickup
                            </div>
                        </div>
                        {airportActive === 3.1 &&
                            <div
                                ref={containerRef}

                                className="relative border p-1 rounded-md pr-2 border-main bg-[#F7FBFF] pl-7 flex flex-col items-center">

                                <div className='absolute top-[0.75rem]  text-light left-[0.4rem] text-[0.85rem] flex items-center justify-center flex-col'>
                                    <div className='rotate-[180deg] mr-[0.01px]  size-[0.75rem] border-light border-[0.2rem] rounded-full' ></div>
                                    <div className='h-[3.7rem] border-dashed border-r-[1.3px] mr-[0.155rem] border-light w-1'>
                                    </div>
                                    <FaLocationDot />
                                </div>
                                <div

                                    className='relative w-full' >
                                    <label className='w-full text-light text-[0.8rem]'>Pick-up Location</label>
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        placeholder="Enter Pickup Location"
                                        className="w-full pb-3 mt-[0.2rem] font-semibold text-black bg-transparent outline-none placeholder:text-black"
                                    />
                                    {inputError && <p className="text-xs text-red-500 ">{inputError}</p>}
                                    {showSuggestions && (
                                        <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md max-h-60">
                                            {suggestions.length > 0 ? (
                                                suggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                                    >
                                                        {suggestion.placeName}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-4 py-2 text-gray-500">No suggestions available</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                                {/* Arrow Icon */}
                                <div className='absolute top-[3.35rem] border-main bg-white right-4 border p-[0.35rem] text-[0.95rem] rounded-full'>
                                    <GoArrowSwitch className=" top-10 rotate-[90deg]   text-main" />
                                </div>
                                <div className='w-full h-[0.5px] bg-[#80808051]'></div>
                                <div

                                    className='relative w-full mt-[0.52rem]'>
                                    <label className='w-full  text-light py-3 pb-2  text-[0.8rem]'>Drop Location</label>
                                    <input


                                        type="text"
                                        value={airportDropValue}
                                        onChange={handleAirportDropChange}
                                        placeholder="Enter Drop Location"
                                        className="w-full pb-1 mt-[0.2rem] font-semibold text-black outline-none placeholder:text-black"
                                    />
                                    {airportError && <p className="text-xs text-red-500 ">{airportError}</p>}
                                    {isAirportDropVisible && (
                                        <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md max-h-60">
                                            {airportDropSuggestions.length > 0 ? (
                                                airportDropSuggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleAirportDropSelect(suggestion)}
                                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                                    >
                                                        {suggestion.airportName}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-4 py-2 text-gray-500">No suggestions available</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>}

                        {airportActive === 3.2 &&
                            <div
                                ref={containerRef}

                                className="relative border p-1 rounded-md pr-2 border-main bg-[#F7FBFF] pl-7 flex flex-col items-center">

                                <div className='absolute top-[0.75rem]  text-light left-[0.4rem] text-[0.85rem] flex items-center justify-center flex-col'>
                                    <div className='rotate-[180deg] mr-[0.01px]  size-[0.75rem] border-light border-[0.2rem] rounded-full' ></div>
                                    <div className='h-[3.7rem] border-dashed border-r-[1.3px] mr-[0.155rem] border-light w-1'>
                                    </div>
                                    <FaLocationDot />
                                </div>
                                <div

                                    className='relative w-full' >
                                    <label className='w-full text-light text-[0.8rem]'>Pick-up Location</label>
                                    <input
                                        type="text"
                                        value={airportDropValue}
                                        onChange={handleAirportDropChange}
                                        placeholder="Enter Pickup Location"
                                        className="w-full pb-3 mt-[0.2rem] font-semibold text-black bg-transparent outline-none placeholder:text-black"
                                    />

                                    {airportError && <p className="text-xs text-red-500 ">{airportError}</p>}
                                    {isAirportDropVisible && (
                                        <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md max-h-60">
                                            {airportDropSuggestions.length > 0 ? (
                                                airportDropSuggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleAirportDropSelect(suggestion)}
                                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                                    >
                                                        {suggestion.airportName}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-4 py-2 text-gray-500">No suggestions available</li>
                                            )}
                                        </ul>
                                    )}


                                </div>
                                {/* Arrow Icon */}
                                <div className='absolute top-[3.35rem] border-main bg-white right-4 border p-[0.35rem] text-[0.95rem] rounded-full'>
                                    <GoArrowSwitch className=" top-10 rotate-[90deg]   text-main" />
                                </div>
                                <div className='w-full h-[0.5px] bg-[#80808051]'></div>
                                <div

                                    className='relative w-full mt-[0.52rem]'>
                                    <label className='w-full  text-light py-3 pb-2  text-[0.8rem]'>Drop Location</label>
                                    <input


                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        placeholder="Enter Drop Location"
                                        className="w-full pb-1 mt-[0.2rem] font-semibold text-black outline-none placeholder:text-black"
                                    />
                                    {inputError && <p className="text-xs text-red-500 ">{inputError}</p>}
                                    {showSuggestions && (
                                        <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md max-h-60">
                                            {suggestions.length > 0 ? (
                                                suggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                                    >
                                                        {suggestion.placeName}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-4 py-2 text-gray-500">No suggestions available</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>}
                    </>
                }

                {active === 1 &&
                    <div className="relative border p-1 rounded-md pr-2 border-main bg-[#F7FBFF] pl-7 flex flex-col items-center">

                        <div className='absolute top-[0.75rem]  text-light left-[0.4rem] text-[0.85rem] flex items-center justify-center flex-col'>
                            <div className='rotate-[180deg] mr-[0.01px]  size-[0.75rem] border-light border-[0.2rem] rounded-full' ></div>
                            <div className='h-[3.7rem] border-dashed border-r-[1.3px] mr-[0.155rem] border-light w-1'>
                            </div>
                            <FaLocationDot />
                        </div>
                        <label className='w-full text-light py-1 text-[0.8rem]'>Pick-up Location</label>
                        <input
                            type="text"
                            placeholder="Enter Pickup Location"
                            className="w-full pb-3 font-semibold text-black bg-transparent outline-none placeholder:text-black "
                        />
                        {/* Arrow Icon */}
                        <div className='absolute top-[3.35rem] border-main bg-white right-4 border p-[0.35rem] text-[0.95rem] rounded-full'>
                            <GoArrowSwitch className=" top-10 rotate-[90deg]   text-main" />
                        </div>
                        <label className='w-full  text-light py-3 pb-1 border-t border-t-[#80808051] text-[0.8rem]'>Drop Location</label>
                        <input
                            type="text"
                            placeholder="Enter Drop Location"
                            className="w-full pb-1 font-semibold text-black outline-none placeholder:text-black"
                        />
                    </div>
                }

                {active === 2 &&
                    <div className="relative border p-1 rounded-md pr-2 border-main bg-[#F7FBFF] pl-7 flex flex-col items-center">

                        <div className='absolute top-[0.75rem]  text-light left-[0.4rem] text-[0.85rem] flex items-center justify-center flex-col'>
                            {/* <div className='rotate-[180deg] mr-[0.01px]  size-[0.75rem] border-light border-[0.2rem] rounded-full' ></div>
                            <div className='h-[3.7rem] border-dashed border-r-[1.3px] mr-[0.155rem] border-light w-1'>
                            </div> */}
                            <FaLocationDot />
                        </div>
                        <label className='w-full text-light py-1 text-[0.8rem]'>Pick-up Location</label>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                            onFocus={() => setFocus(true)}
                            ref={inputRef}
                            placeholder="Enter Pickup Location"
                            className="w-full pb-1 font-semibold text-black bg-transparent outline-none placeholder:text-black "
                        />
                        <p className='text-red-500 text-[0.8rem] text-left w-full'>{tripCityError}</p>
                        {/* Suggestions */}
                        {focus && searchInput && filteredCities.length > 0 && (
                            <div
                                ref={dropdownRef}
                                className="absolute left-0 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg top-full"
                            >
                                {filteredCities.map((city, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleCitySelect(city)}
                                    >
                                        {city}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                }

                <div className="flex w-full gap-3">
                    <div className="relative border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                        <FaRegCalendarAlt className='text-light left-2 absolute top-[1.67rem]' />
                        <label className='w-full  text-light   text-[0.8rem]'>Pick-up Date</label>

                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            minDate={new Date()}
                            dateFormat="yyyy-MM-dd"
                            className="w-full pl-5 font-semibold tracking-wide bg-transparent outline-none caret-transparent"
                            placeholderText="Select Date..."
                        />
                    </div>
                    <div className="relative border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                        <MdOutlineAccessTime className='text-light left-2 absolute top-[1.68rem]' />

                        <label className='w-full  text-light text-[0.8rem]'>Pick-up Time</label>
                        <DatePicker
                            selected={startTime}
                            onChange={(date) => setStartTime(date)}

                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="hh:mm aa"
                            className="w-full pl-5 font-semibold bg-transparent outline-none caret-transparent"

                            placeholderText="Select Time"
                            minTime={startDate && isToday(startDate)
                                ? (() => {
                                    const now = new Date();
                                    now.setMinutes(now.getMinutes() + 30); // 30 minutes from now

                                    // Set the date to today's date
                                    const todayMinTime = new Date(startDate);
                                    todayMinTime.setHours(now.getHours(), now.getMinutes(), 0, 0);
                                    return todayMinTime;
                                })()
                                : new Date(startDate.setHours(0, 0, 0, 0))} // Min time for future dates (midnight)
                            maxTime={new Date(startDate.setHours(23, 45, 0, 0))} />
                    </div>
                </div>
                <button
                    type="submit"
                    className="py-2 px-4 bg-main text-white font-semibold tracking-wide rounded-md hover:bg-[#1780a4] transition duration-300 ease-in-out shadow-lg"
                >
                    Explore Cab
                </button>
            </form>
        </div>
    )
}

export default MainForm
