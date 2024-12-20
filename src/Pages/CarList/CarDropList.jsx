import { useEffect, useState } from 'react'
import { GiGasPump, GiTakeMyMoney } from 'react-icons/gi'
import { IoDocumentText } from 'react-icons/io5'
import { MdArrowLeft, MdKeyboardArrowRight, MdLocalParking } from 'react-icons/md'
import { SiToll } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import car1 from '../../assets/car1.avif'
import { toast } from 'sonner'
import { getTCDetails } from '../../Redux/Slices/localTripSlice'
import { FaLocationDot, FaXmark } from 'react-icons/fa6'
import { getAirportCityData, getDistance } from '../../Redux/Slices/airportSlice'
import MainForm from '../../Components/MainForm'
import { UserGroupIcon, BoltIcon } from '@heroicons/react/24/outline'; // Importing Heroicons
import { LuLuggage } from 'react-icons/lu'
import { MdCarRental, MdContactSupport } from 'react-icons/md'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { FaSignOutAlt } from 'react-icons/fa'
import Loading from '../../Components/Loading'

const CarDropList = () => {


    const [modifyActive, setModifyActive] = useState(false)

    const [noCab, setNoCab] = useState(true);
    const dispatch = useDispatch()
    const [detailsActive, setDetailsActive] = useState()
    const navigate = useNavigate()
    const location = useLocation()
    const [cabData, setCabData] = useState([])
    const [distance, setDistance] = useState(0)
    const [filteredData, setFilteredData] = useState()

    useEffect(() => {
        if (!location.state) {
            navigate('/')
        }
    }, [])

    const data = location.state

    const drop = data?.drop
    const pickup = data?.pickup
    const pickupDate = data?.pickupDate
    const pickupTime = data?.pickupTime
    const tripType = data?.tripType



    const loadData = async () => {
        const res = await dispatch(getAirportCityData({ cityName: tripType === 1 ? drop.replace(/,/g, "") : pickup.replace(/,/g, "") }))
        setCabData(res?.payload?.data)
    }



    useEffect(() => {
        loadData()
    }, [drop, pickup, tripType])

    const tcData = useSelector((state) => state?.localTrip?.tcData)

    const tc = tcData?.tC?.map(data => data?.text)

    let newFilteredData

    // filter function
    useEffect(() => {
        if (cabData) {
            console.log("cab data is",cabData);
            
         newFilteredData = cabData?.rates?.map((car) => {
                const filteredRates = car?.rates?.filter((rate) => {
                    if (distance <= 30) {
                        return rate.kilometer === '30';
                    } else if (distance > 30 && distance <= 45) {
                        return rate.kilometer === '45';
                    } else if (distance > 45 && distance <= 55) {
                        return rate.kilometer === '55';
                    } else if (distance > 55 && distance <= 70) {
                        return rate.kilometer === '70';
                    } else if (distance > 70) {
                        return false; // No data found for distances beyond 45 km
                    } else {
                        return false;
                    }
                });
                return { ...car, rates: filteredRates };
            });

            console.log(newFilteredData);

          
            

            // Handle case where no data is found for distances beyond 45 km
            const noDataFound = distance > 70;

            if (noDataFound) {
                setFilteredData([]); // Or handle it based on your requirements
            } else {
                setFilteredData(newFilteredData);
            }
        }
    }, [distance, cabData, location.state]); // Ensure this runs when `distance` or `cabData` chang

   
    //  kya hua bro

    console.log(filteredData);
    


   // Sorting logic (ensure newFilteredData is valid)
   const sortedCars = (filteredData || []).filter(car => car.rates?.length > 0) // Only include cars with valid rates
   .sort((a, b) => {
       // Ensure both cars have a rate and then compare
       if (a.rates?.[0]?.rate && b.rates?.[0]?.rate) {
           return a.rates[0].rate - b.rates[0].rate; // Sort based on rate
       }
       return 0; // If rates are not available, don't change the order
   });

console.log("Sorted cars:", sortedCars);



    const fetchDistance = async () => {
        setDistance(0)
        const distanceData = {
            fromLocation: data?.pickup,
            toLocation: data?.drop
        }

        const res = await dispatch(getDistance(distanceData))
        setDistance(res?.payload?.distance)

    }


    useEffect(() => {

        fetchDistance()

        const data = {
            tripType: "airpot"
        }
        dispatch(getTCDetails(data))

    }, [pickup, drop, location.state])

    useEffect(() => {
        setModifyActive(false)

    }, [location.state])

    const handleBook = (data) => {



        if (!pickupDate) {
            return toast.error("Pickup date is required")
        }

        if (!pickupTime) {
            return toast.error("Pickup time is required")
        }

        navigate('/book-airport-cab', {
            state: {
                cabData: data,
                pickup: pickup,
                drop: drop,
                pickupDate: pickupDate,
                pickupTime: pickupTime,
                tripType: "Airport Trip",
                tcData: tc,
                airpotValue: tripType
            }
        })

    }

    const formatPickupDate = (dateString) => {

        if (!dateString) return

        // Create a new Date object directly from the "yyyy-mm-dd" string
        const dateObject = new Date(dateString);

        // Use Intl.DateTimeFormat to get the weekday
        const weekday = new Intl.DateTimeFormat('en-GB', {
            weekday: 'short',
        }).format(dateObject);

        // Use Intl.DateTimeFormat to get the rest of the date (day, month, year)
        const dateWithoutWeekday = new Intl.DateTimeFormat('en-GB', {
            month: 'short',
            day: 'numeric',
        }).format(dateObject);

        // Extract the year directly from the dateObject
        const year = dateObject.getFullYear();

        // Combine the weekday, the formatted date, and the year with commas
        return `${weekday}, ${dateWithoutWeekday}, ${year}`;
    };

    useEffect(() => {
        if (!filteredData || filteredData?.length === 0) {
            setNoCab(true)
        } else {
            setNoCab(false)
        }
    }, [filteredData, cabData])



    console.log(filteredData);
    

    return (
        <div className=' bg-lightSky min-h-[90vh]'>
            <div className='flex flex-row items-center bg-[#dfdfdf] py-4 justify-between px-[0.4rem] pl-6 sm:flex-row sm:px-10 gap-4'>
                <div className='flex flex-col items-center justify-center md:flex-row md:gap-8'>

                    <div className='flex flex-col relative items-start text-[1rem]'>
                        <div className='absolute top-[0.45rem] md:hidden text-light left-[-1.3rem] text-[0.85rem] flex items-center justify-center flex-col'>
                            <div className='rotate-[180deg] mr-[0.01px]  size-[0.7rem] border-light border-[0.2rem] rounded-full' ></div>
                            <div className='h-[0.75rem] border-dashed border-r-[1.3px] mr-[0.17rem] border-light w-1'>
                            </div>
                            <FaLocationDot className='ml-[0.05rem]' />
                        </div>
                        <div className='items-center justify-center gap-4 md:flex'>

                            <div className='items-center justify-center gap-1 md:flex'>
                                <div className='rotate-[180deg] mr-[0.01px]  size-[0.7rem] border-light border-[0.2rem] hidden md:block rounded-full' ></div>
                                <h2 className='font-semibold tracking-wide'>{pickup?.split(',')[0]}</h2>
                            </div>
                            <MdKeyboardArrowRight className='hidden text-[1.3rem] md:block' />
                            <div className='items-center justify-center gap-1 md:flex'>

                                <FaLocationDot className='ml-[0.05rem] text-[0.85rem] text-light hidden md:block' />

                                <h2 className='font-semibold tracking-wide'> {drop?.split(',')[0]}
                                </h2>
                            </div>
                        </div>


                    </div>
                    <p className='text-[0.78rem] md:mt-[0.15rem] sm:text-[0.9rem] font-[500]'>
                        ({tripType === 1 ? "Drop to Airport" : "Pickup from Airport"})
                    </p>
                </div>
                <div className='flex flex-col items-center justify-center gap-2 md:flex-row'>
                    <p className='text-[0.85rem]  sm:text-[1rem]'>{formatPickupDate(pickupDate)}
                        <span> {pickupTime}</span>
                    </p>
                    <button className='text-white bg-main p-[0.2rem] text-[0.9rem] font-semibold px-4 rounded' onClick={() => {
                        setModifyActive(true)
                        setFilteredData()
                    }}>Modify</button>
                </div>
            </div>
            {modifyActive &&
                <div className='fixed left-0 z-10 flex flex-col items-center justify-center w-full h-screen top-10 bg-dark bg-opacity-70'>

                    <div className='w-fit h-fit'>
                        <MainForm mainActive={3} inner={tripType === 1 ? 3.1 : 3.2} mainDate={pickupDate} mainTime={pickupTime} pickupData={tripType === 1 ? pickup : drop} dropData={tripType === 1 ? drop : pickup} />
                        <button className='bg-white relative bottom-10 text-main rounded-md font-semibold text-[0.95rem] pl-2 px-4 p-[0.25rem] mx-4 flex items-center justify-center' onClick={() => setModifyActive(false)}>
                            <MdArrowLeft className='text-[1.5rem] tracking-wide' />
                            Back
                        </button>
                    </div>
                </div>}
            <div className='flex flex-col py-10  px-[5vw] sm:px-[7vw] md:px-[9vw] lg:px-[11vw] items-center justify-center gap-4'>
                {
                    (distance === 0) ? <Loading /> :
                        noCab ?
                            <p>No Cabs available to this city right now</p> :
                            sortedCars?.map((data, index) => {
                                return <div key={index} className="flex  flex-col max-w-[27rem] sm:max-w-[55rem] w-full overflow-hidden border-main border rounded-lg shadow-lg hover:shadow-none transition-all duration-300">
                                    <div className='flex flex-col items-center justify-between w-full mx-auto bg-white border-b sm:flex-row'>
                                        {/* Left section */}
                                        <div className="flex items-start justify-between w-full pr-3 border-b sm:w-fit">


                                            {/* Car image and details */}

                                            <img src={data?.photo?.secure_url || car1} alt={`car ${index + 1}`}
                                                className='max-w-[7.8rem] min-w-[7.8rem] min-h-[5.3rem] max-h-[5.3rem] object-cover sm:max-h-[6rem] sm:min-h-[6rem] sm:min-w-[9.9rem] sm:max-w-[9.8rem]'

                                            />


                                            <div className="w-full ml-2 sm:hidden">
                                                <div className="block sm:text-left">
                                                    <h2 className="mb-1 sm:text-[1.4rem] text-[1.15rem] font-semibold ">{data?.name}</h2>

                                                </div>
                                                <div className="flex justify-between sm:flex-col sm:w-[13rem] max-w-[14.5rem] items-center gap-3">
                                                    <div className='flex flex-col items-center'>
                                                        <div className="flex items-center mr-2 text-[1.1rem] font-bold text-gray-800">
                                                            <FaIndianRupeeSign className="w-4 h-4 text-gray-800 " /> {data?.rates[0]?.rate?.toFixed(2)}
                                                        </div>
                                                        <p className='text-[0.78rem] font-semibold'>Upto {data?.rates[0]?.kilometer} km</p>
                                                    </div>
                                                    <button onClick={() => handleBook(data)} className="px-2 text-[0.9rem] font-semibold py-[0.35rem] mt-1 text-white transition rounded-md shadow bg-main">
                                                        Book Now
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Right section */}
                                        <div className='w-full sm:max-w-[70%] pl-2'>
                                            <div className="hidden text-center sm:block sm:text-left">
                                                <h2 className="mb-2 text-2xl font-semibold">{data?.name}</h2>

                                            </div>

                                            <div className="flex flex-wrap items-center mt-4 sm:flex-row text-[0.9rem] sm:mt-0 font-semibold font-sans mb-2">
                                                {/* Info */}
                                                <div className="flex items-center gap-1 mb-1 mr-4 sm:mr-6">
                                                    <MdCarRental className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons TruckIcon */}
                                                    <span>{data?.acAvailable ? "AC" : "NON AC"}</span>
                                                </div>
                                                <div className="flex items-center gap-1 mb-1 mr-4 sm:mr-6">
                                                    <UserGroupIcon className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons UserGroupIcon */}
                                                    <span>{data?.numberOfSeats} seats</span>
                                                </div>
                                                <div className="flex items-center gap-1 mb-1 mr-4 sm:mr-6">
                                                    <LuLuggage className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons BriefcaseIcon */}
                                                    <span>{data?.numberOfBags} luggage</span>
                                                </div>
                                                <div className="flex items-center gap-1 mr-4 sm:mr-6">
                                                    <BoltIcon className="w-4 h-4 mb-[0.12rem]" /> {/* Heroicons LightningBoltIcon */}
                                                    <span>Pay &#8377; {data?.rates[0]?.extra}/km after {data?.rates[0]?.kilometer} km</span>
                                                </div>


                                            </div>
                                        </div>
                                        {/* Price and button */}
                                        <div className="hidden sm:flex sm:flex-col  min-w-[9rem] max-w-[9rem]  items-center ">
                                            <div>
                                                <div className="flex items-center text-2xl font-bold text-gray-800">
                                                    <FaIndianRupeeSign className="w-4 h-4 mt-1 text-gray-800 " /> {data?.rates[0]?.rate?.toFixed(2)}
                                                </div>
                                                <p className='text-[0.8rem] font-semibold'>Upto {data?.rates[0]?.kilometer} km</p>
                                            </div>
                                            <button onClick={() => handleBook(data)} className="px-4 py-[0.35rem] mt-1 text-white transition rounded-md shadow bg-main">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-between gap-2 p-3 pl-1 sm:pl-4 text-[0.85rem] sm:text-[0.95rem] font-semibold text-main'>
                                        {/* Safety icon */}
                                        <div className='flex gap-2'>
                                            <div onClick={() => setDetailsActive(`2.${index}`)} className="flex cursor-pointer items-center p-[0.15rem] pr-1 sm:px-3 sm:pl-2 bg-blue-100 border border-blue-500 rounded">
                                                <div className="p-1 rounded-full">
                                                    <FaSignOutAlt className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span className="text-blue-700 ">Exclusions</span>
                                            </div>
                                            <div onClick={() => setDetailsActive(`3.${index}`)} className="flex cursor-pointer items-center p-[0.15rem] px-[0.4rem] pl-[0.1rem] bg-green-100 border border-green-500 rounded">
                                                <div className="p-1 rounded-full">
                                                    <IoIosInformationCircleOutline className="w-4 h-4 text-green-600" />
                                                </div>
                                                <span className="text-gray-700">T&C</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-[0.15rem] pr-2 sm:px-3 sm:pl-2 cursor-pointer bg-blue-50 border border-main rounded">
                                            <div className="p-1 rounded-full">
                                                <MdContactSupport className="w-4 h-4 text-main" />
                                            </div>
                                            <span className="text-gray-700">24/7 support</span>
                                        </div>

                                    </div>
                                    <div className='block text-[#0f0f0f] '>
                                        {detailsActive === `3.${index}` &&
                                            <div className='text-[0.8rem] p-2 py-4 relative'>
                                                <div className='absolute text-main right-3 top-3' onClick={() => setDetailsActive(0)}><FaXmark /></div>
                                                <h3 className='text-[0.9rem] font-semibold '>Terms and Conditions</h3>
                                                {tc?.map((t, i) => (
                                                    <li key={i} className='pl-2 mt-1 list-disc'>{t}</li>
                                                ))}
                                            </div>
                                        }
                                        {detailsActive === `2.${index}` &&
                                            <div className='text-[0.8rem] p-2 py-4 flex items-start justify-start w-full flex-wrap gap-4
                                         relative'>
                                                <div className='absolute text-main right-3 top-3' onClick={() => setDetailsActive(0)}><FaXmark /></div>

                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <GiTakeMyMoney className='text-[1.1rem]' />
                                                    </div>
                                                    <p>Pay &#8377; {data?.rates[0]?.extra}/km after {data?.rates[0]?.kilometer} km</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[5.5px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <MdLocalParking className='text-[1.15rem]' />

                                                    </div>
                                                    <p>Parking</p>
                                                </div>

                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[3px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <SiToll className='text-[1.4rem]' />

                                                    </div>

                                                    <p>Toll/State tax</p>
                                                </div>

                                            </div>}
                                        {detailsActive === `1.${index}` &&
                                            <div className='text-[0.8rem] p-2 py-4 flex flex-wrap items-center justify-center gap-6 relative'>
                                                <div className='absolute text-main right-3 top-3' onClick={() => setDetailsActive(0)}><FaXmark /></div>

                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <IoDocumentText className='text-[1.1rem]' />
                                                    </div>
                                                    <p>GST charges (5%)</p>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <GiGasPump className='text-[1.1rem]' />

                                                    </div>

                                                    <p>Base Fare</p>
                                                </div>
                                                {/* <div className='flex items-center gap-2'>
                                                <div className='p-[3px] border-[0.1px] border-black rounded-full size-fit'>
                                                    <SiToll className='text-[1.4rem]' />

                                                </div>

                                                <p>Toll/State tax</p>
                                            </div> */}

                                            </div>}
                                    </div>
                                </div>

                            })
                }
            </div>
        </div>
    )
}

export default CarDropList
