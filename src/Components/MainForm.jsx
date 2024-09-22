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
import { toast } from 'sonner';
import { getAirportCityData } from '../Redux/Slices/airportSlice';
import { getOnewayCityData, getRoundCityData, getRoundTripData } from '../Redux/Slices/outstationSlice';

const MainForm = ({ mainActive, inner, pickupData, dropData, mainDate, mainTime, returnMainDate }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [active, setActive] = useState(1);
    const [outstationActive, setOutstationActive] = useState(1.1);
    const [airportActive, setAirportActive] = useState(3.1);
    const [startDate, setStartDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [minSelectableDate, setMinSelectableDate] = useState(new Date());
    const [startTime, setStartTime] = useState(() => {
        const now = new Date();
        now.setHours(now.getHours() + 3);
        return now;
    });

    useEffect(() => {
        // Load Google Maps script if not already loaded
        if (!window.google || !window.google.maps || !window.google.maps.places) {
            const script = document.createElement('script');
            script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places";
            script.async = true;
            document.head.appendChild(script);
        }

        const parseTimeString = (timeString) => {
            if (!timeString) return null;

            const [time, modifier] = timeString.split(' ');
            let [hours, minutes] = time.split(':').map(Number);

            if (modifier === 'PM' && hours < 12) {
                hours += 12;
            } else if (modifier === 'AM' && hours === 12) {
                hours = 0; // Midnight edge case
            }

            const date = new Date();
            date.setHours(hours, minutes, 0, 0); // Set the parsed hours and minutes
            return date;
        };

        // Example usage
        const finalTime = parseTimeString(mainTime);
        const finalDate = new Date(mainDate)
        const finalReturnDate = new Date(returnMainDate)


        if (mainActive === 1) {
            setActive(1)
        }

        if (mainActive === 2) {
            setActive(2)
            setSearchInput(pickupData)
            setStartDate(finalDate)
            setStartTime(finalTime)
        }

        if (mainActive === 3) {
            setActive(3)
        }

        if (inner === 1.1) {
            setOutstationActive(1.1)
            setOnewayPickupValue(pickupData)
            setOnewayDropValue(dropData)
            setStartDate(finalDate)
            setStartTime(finalTime)
        }

        if (mainActive === 1 && inner === 1.2) {
            setOutstationActive(1.2)
            setRoundDropValue(dropData)
            setRoundPickupValue(pickupData)
            setStartDate(finalDate)
            setStartTime(finalTime)

            setReturnDate(finalReturnDate)
        }

        if (inner === 3.1) {
            setAirportActive(3.1)
            // setAirportDropValue(dropData)
            setInputValue(pickupData)
            setStartDate(finalDate)
            setStartTime(finalTime)
        }

        if (inner === 3.2) {
            setAirportActive(3.2)
            // setAirportDropValue(pickupData)
            setInputValue(dropData)
            setStartDate(finalDate)
            setStartTime(finalTime)
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
                componentRestrictions: { country: 'IN' },
                language: 'en'
            }, (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {


                    const transformedSuggestions = predictions.map(prediction => ({
                        airportName: prediction.description,
                        placeId: prediction.place_id
                    }));

                    setValidAirportSuggestions(transformedSuggestions); // Update valid suggestions

                    if (value === dropData) {
                        setIsAirportDropVisible(false);
                    }

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

                    if (pickupData === value) {
                        setShowSuggestions(false);
                    }

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
        if (mainActive === 3) {
            // handleAirportDropChange({ target: { value: dropData } })
            handleInputChange({ target: { value: pickupData } })
        }
    }, [dropData, pickupData])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSuggestions(false); // Hide suggestions if click is outside
                setIsAirportDropVisible(false); // Hide suggestions if input is empty
                setShowRoundPickup(false)
                setShowRoundDrop(false);
                setShowOnewayPickup(false)
                setShowOnewayDrop(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    // ---------airport end

    // ---------outstation round

    const [showRoundPickup, setShowRoundPickup] = useState(false)
    const [roundPickupValue, setRoundPickupValue] = useState("");
    const [roundPickupSuggestions, setRoundPickupSuggestions] = useState([]);
    const [roundPickupError, setRoundPickupError] = useState('')
    const roundPickupCity = useSelector((state) => state?.outstation?.roundCityData)
    // const roundTripData = useSelector((state) => state?.outstation?.roundTripData)
    console.log(roundPickupCity)

    const allRoundPickupCityNames = roundPickupCity && roundPickupCity?.map((data) => data?.cityName);

    // console.log(allRoundPickupCityNames)

    const fetchRoundTripData = async () => {
        // await dispatch(getRoundTripData())
        await dispatch(getRoundCityData())
        await dispatch(getOnewayCityData())
    }

    useEffect(() => {
        if (outstationActive === 1.2 && roundPickupValue && roundPickupCity?.length > 0) {
            const filtered = roundPickupCity
                ?.filter((data) => data.cityName?.toLowerCase().startsWith(roundPickupValue?.toLowerCase()))
                .map((data) => data.cityName);
            setRoundPickupSuggestions(filtered); // Use roundPickupSuggestions instead of filteredCities
        }
    }, [roundPickupValue, roundPickupCity, outstationActive]);


    const handleRoundPickupInputChange = (e) => {
        setRoundPickupError('')

        setShowRoundPickup(true);

        setRoundPickupValue(e.target.value); // Update input value
        // setFocus(true); // Show suggestions
    };

    const handleRoundPickupCity = (city) => {
        setRoundPickupValue(city); // Set selected city
        // setFocus(false); // Hide suggestions
        setShowRoundPickup(false);
        setRoundPickupError('')
        setRoundPickupSuggestions([]); // Clear suggestions
    };

    useEffect(() => {
        fetchRoundTripData()
    }, [])

    // ---------outstation round end

    // ---------outstation round drop start

    const [showRoundDrop, setShowRoundDrop] = useState(false)
    const [roundDropValue, setRoundDropValue] = useState("");
    const [roundDropSuggestions, setRoundDropSuggestions] = useState([]);
    const [roundDropError, setRoundDropError] = useState('')
    const [validRoundDropSuggestions, setValidRoundDropSuggestions] = useState([]);

    const handleRoundDropInputChange = async (event) => {
        setRoundDropError('')
        const value = event.target.value;
        setRoundDropValue(value);
        setShowRoundDrop(true);

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
                    setValidRoundDropSuggestions(transformedSuggestions); // Update valid suggestions
                    if (value === dropData) {
                        setShowRoundDrop(false)
                    }

                    setRoundDropSuggestions(transformedSuggestions);
                } else {
                    console.error('Error fetching suggestions:', status);
                    setRoundDropSuggestions([]);
                }
            });
        } else {
            setRoundDropSuggestions([]);
            setShowRoundDrop(false);
        }
    };

    const handleRoundDropSuggestionClick = (suggestion) => {
        setRoundDropValue(suggestion.placeName);
        setShowRoundDrop(false);
        setRoundDropError(''); // Clear error when a valid suggestion is selected
    };


    useEffect(() => {
        if (inner === 1.2) {
            handleRoundDropInputChange({ target: { value: dropData } })

        }
    }, [dropData])

    // ---------outstation round drop end

    // ------------outstation one way start

    const [showOnewayPickup, setShowOnewayPickup] = useState(false)
    const [onewayPickupValue, setOnewayPickupValue] = useState("");
    const [onewayPickupSuggestions, setOnewayPickupSuggestions] = useState([]);
    const [onewayPickupError, setOnewayPickupError] = useState('')

    const onewayCityData = useSelector((state) => state?.outstation?.onewayCityData)
    const oneWayPickup = onewayCityData?.fromCities

    useEffect(() => {
        if (active === 1 && outstationActive === 1.1 && onewayPickupValue && oneWayPickup?.length > 0) {

            const filtered = oneWayPickup
                ?.filter((data) => data.toLowerCase().startsWith(onewayPickupValue.toLowerCase()))
                .map((data) => data);
            setOnewayPickupSuggestions(filtered); // Use roundPickupSuggestions instead of filteredCities
        }
    }, [onewayPickupValue, onewayCityData, outstationActive]);


    const handleOnewayPickupInputChange = (e) => {
        setOnewayPickupError('')

        setShowOnewayPickup(true);

        setOnewayPickupValue(e.target.value); // Update input value
        // setFocus(true); // Show suggestions
    };

    const handleOnewayPickupCity = (city) => {
        setOnewayPickupValue(city); // Set selected city
        // setFocus(false); // Hide suggestions
        setShowOnewayPickup(false);
        setOnewayPickupError('')
        setOnewayPickupSuggestions([]); // Clear suggestions
    };


    // --------------drop one way



    const [showOnewayDrop, setShowOnewayDrop] = useState(false)
    const [onewayDropValue, setOnewayDropValue] = useState("");
    const [onewayDropSuggestions, setOnewayDropSuggestions] = useState([]);
    const [onewayDropError, setOnewayDropError] = useState('')

    const oneWayDrop = onewayCityData?.toCities

    useEffect(() => {
        if (active === 1 && outstationActive === 1.1 && onewayDropValue && oneWayDrop?.length > 0) {

            const filtered = oneWayDrop
                ?.filter((data) => data.toLowerCase().startsWith(onewayDropValue.toLowerCase()))
                ?.map((data) => data);
            setOnewayDropSuggestions(filtered); // Use roundDropSuggestions instead of filteredCities
        }
    }, [onewayDropValue, onewayCityData, outstationActive]);


    const handleOnewayDropInputChange = (e) => {
        setOnewayDropError('')

        setShowOnewayDrop(true);

        setOnewayDropValue(e.target.value); // Update input value
        // setFocus(true); // Show suggestions
    };

    const handleOnewayDropCity = (city) => {
        setOnewayDropValue(city); // Set selected city
        // setFocus(false); // Hide suggestions
        setShowOnewayDrop(false);
        setOnewayDropError('')
        setOnewayDropSuggestions([]); // Clear suggestions
    };



    // -----------outstation one way end


    const [searchInput, setSearchInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [tripCityError, setTripCityError] = useState('');
    const [focus, setFocus] = useState(false);
    const [tripType, setTripType] = useState('One-Way Trip')

    const localCityData = useSelector((state) => state?.localTrip?.cityData);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);


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
        const currentTime = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(24, 0, 0, 0); // End of today's date

        const hoursUntilTomorrow = (endOfDay - currentTime) / (1000 * 60 * 60); // Calculate remaining hours

        if (hoursUntilTomorrow < 3) {
            // If less than 3 hours are left until tomorrow, set minimum selectable date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setMinSelectableDate(tomorrow);
            setStartDate(tomorrow);
            setReturnDate(tomorrow);
        }
    }, []);


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

        if (active === 3 && airportActive === 3.1) {
            if (!validSuggestions.some(suggestion => suggestion.placeName === inputValue)) {
                return setInputError('Select a valid location from the suggestions');
            } else {
                setInputError('');
            }


            if (!validAirportSuggestions.some(suggestion => suggestion.airportName === airportDropValue)) {
                return setAirportError('Select a valid airport from the suggestions');
            } else {
                setAirportError('');
            }
        }

        if (active === 3 && airportActive === 3.2) {
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
            return toast.error("Select pickup time")
        }



        if (active === 1 && outstationActive === 1.2) {

            const dateObj = new Date(date);

            const retDate = formatDateToISO(returnDate);
            const retDateObj = new Date(retDate);


            if (!roundPickupValue) {
                return setRoundPickupError('Select a valid city name');
            }

            if (allRoundPickupCityNames.includes(roundPickupValue)) {
                setRoundPickupError('');
            } else {
                return setRoundPickupError('Select a valid city name');
            }

            if (!validRoundDropSuggestions.some(suggestion => suggestion.placeName === roundDropValue)) {
                return setRoundDropError('Select a valid location from the suggestions');
            } else {
                setRoundDropError('');
            }

            if (!returnDate) {
                return toast.error("Select return date")
            }


            if (dateObj > retDateObj) {
                return toast.error("Return date must be after pickup date")
            }
        }

        if (active === 1 && outstationActive === 1.1) {
            if (!onewayPickupValue) {
                return setOnewayPickupError('Select a valid city name');
            }

            if (oneWayPickup.includes(onewayPickupValue)) {
                setOnewayPickupError('');
            } else {
                return setOnewayPickupError('Select a valid city name');
            }

            if (!onewayDropValue) {
                return setOnewayDropError('Select a valid city name');
            }

            if (oneWayDrop.includes(onewayDropValue)) {
                setOnewayDropError('');
            } else {
                return setOnewayDropError('Select a valid city name');
            }




        }

        const time = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        if (!time) {
            return toast.error("Select pickup time")
        }

        if (active === 1 && outstationActive === 1.1) {
            navigate(`/cars/oneway/${onewayPickupValue}`, { state: { tripType: "One-Way Trip", pickupTime: time, pickupDate: date, pickup: onewayPickupValue, drop: onewayDropValue } })
        }

        if (active === 1 && outstationActive === 1.2) {
            const retDate = formatDateToISO(returnDate);

            navigate(`/cars/round/${roundPickupValue}`, {
                state: {
                    tripType: "Round",
                    pickupTime: time,
                    pickupDate: date,
                    returnDate: retDate,
                    pickup: roundPickupValue,
                    drop: roundDropValue
                }
            })
        }
        if (active === 2) {
            navigate(`/cars/${searchInput}`, { state: { tripType: tripType, pickupTime: time, pickupDate: date, city: searchInput, cabData: localCityData } })
        }
        if (active === 3) {
            navigate(`/cars/from/${airportDropValue}`, { state: { tripType: airportActive === 3.1 ? 1 : 2, pickupTime: time, pickupDate: date, pickup: airportActive === 3.1 ? inputValue : airportDropValue, drop: airportActive === 3.1 ? airportDropValue : inputValue } })
        }
    };


    return (
        <div className=" min-w-[19.5rem] w-full mb-8 max-w-[29rem] p-4 h-fit">

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
                    <>
                        <div className='w-full cursor-pointer flex items-center justify-center text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] tracking-wide'>
                            <div
                                onClick={() => setOutstationActive(1.1)}
                                className={`py-[0.15rem] font-semibold px-4 border-[0.3px] rounded-l-full border-gray-400 transform scale-105 transition-all duration-500 ease-in-out
${outstationActive === 1.1 ? 'bg-main text-white' : 'bg-white text-light hover:bg-[#f0f4f8]'}`}
                            >
                                One way
                            </div>
                            <div
                                onClick={() => setOutstationActive(1.2)}
                                className={`py-[0.15rem] font-semibold px-4 border-[0.3px] rounded-r-full border-gray-400 transform scale-105 transition-all duration-500 ease-in-out
${outstationActive === 1.2 ? 'bg-main text-white' : 'bg-white text-light hover:bg-[#f0f4f8]'}`}
                            >
                                Round Trip
                            </div>
                        </div>

                        {outstationActive === 1.1 &&
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

                                    className='relative w-full'>
                                    <label className='w-full text-light py-1 text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]'>Pick-up Location</label>
                                    <input

                                        type="text"
                                        value={onewayPickupValue}
                                        onChange={handleOnewayPickupInputChange}
                                        placeholder="Enter Pickup Location"
                                        className="w-full pt-0 pb-3 md:text-[1.2rem] sm:text-[1.1rem] font-semibold text-black bg-transparent outline-none  "
                                    />
                                    {onewayPickupError && <p className="absolute bottom-0 text-xs text-red-500">{onewayPickupError}</p>}

                                    {showOnewayPickup && (
                                        <ul className="absolute z-10 w-[88%] overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md max-h-60">
                                            {onewayPickupSuggestions.length > 0 ? (
                                                onewayPickupSuggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleOnewayPickupCity(suggestion)}
                                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                                    >
                                                        {suggestion}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-4 py-2 text-gray-500">No suggestions available</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                                {/* Arrow Icon */}
                                <div className='relative w-full border-t border-gray-300'>
                                    <div className='absolute top-[-14px] border-main w-fit bg-white right-4 border p-[0.35rem] text-[0.95rem] rounded-full'>
                                        <GoArrowSwitch className=" top-10 rotate-[90deg]   text-main" />
                                    </div>
                                </div>
                                <div className='w-full h-[0.5px] bg-[#80808051]'></div>
                                <div

                                    className='relative w-full mt-[0.52rem]'>
                                    <label className='w-full  text-light py-3 pb-2  text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]'>Drop Location</label>
                                    <input


                                        type="text"
                                        value={onewayDropValue}
                                        onChange={handleOnewayDropInputChange}
                                        placeholder="Enter Drop Location"
                                        className="w-full pb-3 md:text-[1.2rem] sm:text-[1.1rem] pt-0 mt-[0.2rem] font-semibold text-black outline-none "
                                    />
                                    {onewayDropError && <p className="absolute bottom-0 text-xs text-red-500">{onewayDropError}</p>}
                                    {showOnewayDrop && (
                                        <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md max-h-60">
                                            {onewayDropSuggestions.length > 0 ? (
                                                onewayDropSuggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleOnewayDropCity(suggestion)}
                                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                                    >
                                                        {suggestion}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-4 py-2 text-gray-500">No city available</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        }

                        {outstationActive === 1.2 &&
                            <div
                                ref={containerRef}

                                className="relative border p-1 rounded-md pr-2 border-main bg-[#F7FBFF] pl-7 flex flex-col items-center">

                                <div className='absolute top-[0.75rem]  text-light left-[0.4rem] text-[0.85rem] flex items-center justify-center flex-col'>
                                    <div className='rotate-[180deg] mr-[0.01px]  size-[0.75rem] border-light border-[0.2rem] rounded-full' ></div>
                                    <div className='h-[4.2rem] border-dashed border-r-[1.3px] mr-[0.155rem] border-light w-1'>
                                    </div>
                                    <FaLocationDot />
                                </div>
                                <div

                                    className='relative w-full'>
                                    <label className='w-full text-light py-1 text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]'>Pick-up Location</label>
                                    <input

                                        type="text"
                                        value={roundPickupValue}
                                        onChange={handleRoundPickupInputChange}
                                        placeholder="Enter Pickup Location"
                                        className="w-full pt-0 pb-4 md:text-[1.2rem] sm:text-[1.1rem] font-semibold text-black bg-transparent outline-none  "
                                    />
                                    {roundPickupError && <p className="absolute bottom-0 text-xs text-red-500">{roundPickupError}</p>}

                                    {showRoundPickup && (
                                        <ul className="absolute z-10 w-[88%] overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md max-h-60">
                                            {roundPickupSuggestions.length > 0 ? (
                                                roundPickupSuggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleRoundPickupCity(suggestion)}
                                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                                    >
                                                        {suggestion}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-4 py-2 text-gray-500">No suggestions available</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                                {/* Arrow Icon */}
                                <div className='relative w-full border-t border-gray-300'>
                                    <div className='absolute top-[-15px] border-main w-fit bg-white right-4 border p-[0.35rem] text-[0.95rem] rounded-full'>
                                        <GoArrowSwitch className=" top-10 rotate-[90deg]   text-main" />
                                    </div>
                                </div>
                                <div

                                    className='relative w-full mt-[0.52rem]'>
                                    <label className='w-full  text-light py-3 pb-2  text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]'>Drop Location</label>
                                    <input


                                        type="text"
                                        value={roundDropValue}
                                        onChange={handleRoundDropInputChange}
                                        placeholder="Enter Drop Location"
                                        className="w-full pb-3 md:text-[1.2rem] sm:text-[1.1rem] pt-0 mt-[0.2rem] font-semibold text-black outline-none "
                                    />
                                    {roundDropError && <p className="absolute bottom-0 text-xs text-red-500">{roundDropError}</p>}
                                    {showRoundDrop && (
                                        <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md max-h-60">
                                            {roundDropSuggestions.length > 0 ? (
                                                roundDropSuggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleRoundDropSuggestionClick(suggestion)}
                                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                                    >
                                                        {suggestion.placeName}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="px-4 py-2 text-gray-500">No city available</li>
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        }

                    </>

                }


                {active === 3 &&
                    <>
                        <div className='w-full flex cursor-pointer  items-center justify-center text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] tracking-wide'>
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
                                    <div className='h-[4.2rem] border-dashed border-r-[1.3px] mr-[0.155rem] border-light w-1'>
                                    </div>
                                    <FaLocationDot />
                                </div>
                                <div

                                    className='relative w-full' >
                                    <label className='w-full text-light text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]'>Pick-up Location</label>
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        placeholder="Enter Pickup Location"
                                        className="w-full pb-4 md:text-[1.2rem] sm:text-[1.1rem] pt-0 mt-[0.2rem] font-semibold text-black bg-transparent outline-none "
                                    />
                                    {inputError && <p className="absolute bottom-0 text-xs text-red-500">{inputError}</p>}
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
                                <div className='relative w-full border-t border-gray-300'>
                                    <div className='absolute top-[-14px] border-main w-fit bg-white right-4 border p-[0.35rem] text-[0.95rem] rounded-full'>
                                        <GoArrowSwitch className=" top-10 rotate-[90deg]   text-main" />
                                    </div>
                                </div>
                                <div className='w-full h-[0.5px] bg-[#80808051]'></div>
                                <div

                                    className='relative w-full mt-[0.52rem]'>
                                    <label className='w-full  text-light py-3 pb-2  text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]'>Drop to airport</label>
                                    <input


                                        type="text"
                                        value={airportDropValue}
                                        onChange={handleAirportDropChange}
                                        placeholder="Enter airport"
                                        className="w-full pb-3 md:text-[1.2rem] sm:text-[1.1rem] pt-0 mt-[0.2rem] font-semibold text-black outline-none "
                                    />
                                    {airportError && <p className="absolute bottom-0 text-xs text-red-500 ">{airportError}</p>}
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
                                    <div className='h-[4.2rem] border-dashed border-r-[1.3px] mr-[0.155rem] border-light w-1'>
                                    </div>
                                    <FaLocationDot />
                                </div>
                                <div
                                    className='relative w-full' >
                                    <label className='w-full text-light text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]'>Pick-up from airport</label>
                                    <input
                                        type="text"
                                        value={airportDropValue}
                                        onChange={handleAirportDropChange}
                                        placeholder="Enter airport..."
                                        className="w-full pb-4 md:text-[1.2rem] sm:text-[1.1rem] pt-0 mt-[0.2rem] font-semibold text-black bg-transparent outline-none "
                                    />

                                    {airportError && <p className="absolute bottom-0 text-xs text-red-500 ">{airportError}</p>}
                                    {isAirportDropVisible && (
                                        <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md max-h-60">
                                            {airportDropSuggestions?.length > 0 ? (
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
                                <div className='relative w-full border-t border-gray-300'>
                                    <div className='absolute top-[-14px] border-main w-fit bg-white right-4 border p-[0.35rem] text-[0.95rem] rounded-full'>
                                        <GoArrowSwitch className=" top-10 rotate-[90deg]   text-main" />
                                    </div>
                                </div>
                                <div className='w-full h-[0.5px] bg-[#80808051]'></div>
                                <div

                                    className='relative w-full mt-[0.52rem]'>
                                    <label className='w-full  text-light py-3 pb-2  text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]'>Drop Location</label>
                                    <input


                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        placeholder="Enter Drop off Location"
                                        className="w-full pb-3 md:text-[1.2rem] sm:text-[1.1rem] pt-0 mt-[0.2rem] font-semibold text-black outline-none "
                                    />
                                    {inputError && <p className="absolute bottom-0 text-xs text-red-500 ">{inputError}</p>}
                                    {showSuggestions && (
                                        <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-200 rounded-md shadow-md max-h-60">
                                            {suggestions?.length > 0 ? (
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

                {active === 2 &&
                    <div className="relative border p-1 rounded-md pr-2 border-main bg-[#F7FBFF] pl-7 flex flex-col items-center">

                        <div className='absolute top-[0.75rem]  text-light left-[0.4rem] text-[0.85rem] flex items-center justify-center flex-col'>
                            {/* <div className='rotate-[180deg] mr-[0.01px]  size-[0.75rem] border-light border-[0.2rem] rounded-full' ></div>
                            <div className='h-[3.7rem] border-dashed border-r-[1.3px] mr-[0.155rem] border-light w-1'>
                            </div> */}
                            <FaLocationDot />
                        </div>
                        <label className='w-full text-light py-1 text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]'>Pick-up Location</label>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                            onFocus={() => setFocus(true)}
                            ref={inputRef}
                            placeholder="Enter Pickup Location"
                            className="w-full pb-1 font-semibold md:text-[1.2rem] sm:text-[1.1rem] text-black bg-transparent outline-none  "
                        />
                        <p className='text-red-500 text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] text-left w-full'>{tripCityError}</p>
                        {/* Suggestions */}
                        {focus && searchInput && filteredCities?.length > 0 && (
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
                        <FaRegCalendarAlt className='text-light left-2 absolute md:top-[1.92rem] sm:top-[1.76rem] top-[1.67rem] md:text-[1.2rem] sm:text-[1.1rem]' />
                        <label className='w-full  text-light   text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]'>Pick-up Date</label>

                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            minDate={minSelectableDate}
                            dateFormat="yyyy-MM-dd"
                            className="w-full pl-7 md:text-[1.2rem] sm:text-[1.1rem] font-semibold tracking-wide bg-transparent outline-none caret-transparent"
                            placeholderText="Select Date..."
                        />
                    </div>
                    {active === 1 && outstationActive === 1.2 &&
                        <div className="relative border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                            <label className='w-full  text-light   text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]'>Return Date</label>

                            <FaRegCalendarAlt className='text-light left-2 absolute md:top-[1.92rem] sm:top-[1.76rem] top-[1.67rem] md:text-[1.2rem] sm:text-[1.1rem]' />

                            <DatePicker
                                selected={returnDate}
                                onChange={(date) => setReturnDate(date)}
                                minDate={minSelectableDate}
                                dateFormat="yyyy-MM-dd"
                                className="w-full pl-7 md:text-[1.2rem] sm:text-[1.1rem] font-semibold tracking-wide bg-transparent outline-none caret-transparent"

                                placeholderText="Select Date..."
                            />
                        </div>}
                    {(active === 2 || active === 3 || outstationActive === 1.1) &&
                        <div className="relative border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                            <MdOutlineAccessTime className='text-light left-2 absolute top-[1.73rem] md:top-[1.95rem] sm:top-[1.78rem] md:text-[1.2rem] sm:text-[1.1rem]' />

                            <label className='w-full  text-light text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]'>Pick-up Time</label>
                            <DatePicker
                                selected={startTime}
                                onChange={(date) => setStartTime(date)}
                                dateFormat="hh:mm aa"

                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                className="w-full pl-7 md:text-[1.2rem] sm:text-[1.1rem] font-semibold bg-transparent outline-none caret-transparent"

                                placeholderText="Select Time"
                                minTime={startDate && isToday(startDate)
                                    ? (() => {
                                        const now = new Date();
                                        now.setHours(now.getHours() + 3); // 30 minutes from now

                                        // Set the date to today's date
                                        const todayMinTime = new Date(startDate);
                                        todayMinTime.setHours(now.getHours(), now.getMinutes(), 0, 0);
                                        return todayMinTime;
                                    })()
                                    : new Date(startDate.setHours(0, 0, 0, 0))} // Min time for future dates (midnight)
                                maxTime={new Date(startDate.setHours(23, 45, 0, 0))} />
                        </div>
                    }

                </div>
                {active === 1 && outstationActive === 1.2 &&
                    <div className="relative border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex items-center">
                        <label className=' pr-6  text-light text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem]'>Pick-up Time</label>

                        <MdOutlineAccessTime className='text-light  md:text-[1.2rem] sm:text-[1.1rem]' />
                        <DatePicker
                            selected={startTime}
                            onChange={(date) => setStartTime(date)}
                            dateFormat="hh:mm aa"

                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            className="w-full pl-7 md:text-[1.2rem] sm:text-[1.1rem] font-semibold bg-transparent outline-none caret-transparent"

                            placeholderText="Select Time"
                            minTime={startDate && isToday(startDate)
                                ? (() => {
                                    const now = new Date();
                                    now.setHours(now.getHours() + 3); // 30 minutes from now

                                    // Set the date to today's date
                                    const todayMinTime = new Date(startDate);
                                    todayMinTime.setHours(now.getHours(), now.getMinutes(), 0, 0);
                                    return todayMinTime;
                                })()
                                : new Date(startDate.setHours(0, 0, 0, 0))} // Min time for future dates (midnight)
                            maxTime={new Date(startDate.setHours(23, 45, 0, 0))} />

                    </div>}
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
