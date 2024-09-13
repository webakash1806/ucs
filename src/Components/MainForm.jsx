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

const MainForm = () => {
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
        const date = startDate
        isToday(date)
    }, [startDate])


    const allLocalCityNames = localCityData?.allCityRate?.map((data) => data?.cityName);

    const handleLocalTripSubmit = (e) => {
        e.preventDefault();

        const date = formatDateToISO(startDate);
        console.log(date)


        if (!searchInput) {
            return setTripCityError('Select a valid city name');
        }

        if (allLocalCityNames.includes(searchInput)) {
            setTripCityError('');
        } else {
            return setTripCityError('Select a valid city name');
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
        navigate(`/cars/${searchInput}`, { state: { tripType: tripType, pickupTime: time, pickupDate: date, city: searchInput, cabData: localCityData } })
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
                    <div className='w-full flex  items-center justify-center text-[0.8rem] tracking-wide'>
                        <button
                            onClick={() => setAirportActive(3.1)}
                            className={`py-[0.15rem] font-semibold px-4 border-[0.3px] rounded-l-full border-gray-400 transform scale-105 transition-all duration-500 ease-in-out
${airportActive === 3.1 ? 'bg-main text-white' : 'bg-white text-main hover:bg-[#f0f4f8]'}`}
                        >
                            Drop
                        </button>
                        <button
                            onClick={() => setAirportActive(3.2)}
                            className={`py-[0.15rem] font-semibold px-4 border-[0.3px] rounded-r-full border-gray-400 transform scale-105 transition-all duration-500 ease-in-out
${airportActive === 3.2 ? 'bg-main text-white' : 'bg-white text-main hover:bg-[#f0f4f8]'}`}
                        >
                            Pickup
                        </button>
                    </div>}

                {active !== 2 &&
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
