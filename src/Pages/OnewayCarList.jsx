import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import car1 from '../assets/car1.jpg'
import { MdAirlineSeatReclineExtra, MdArrowLeft, MdArrowRight, MdArrowRightAlt, MdKeyboardArrowRight, MdLocalParking, MdLuggage } from 'react-icons/md';
import { TbAirConditioning } from 'react-icons/tb';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getTCDetails } from '../Redux/Slices/localTripSlice';
import { GiGasPump, GiTakeMyMoney } from 'react-icons/gi';
import { SiToll } from 'react-icons/si';
import { IoDocumentText } from 'react-icons/io5';
import { FaArrowRightToCity, FaLocationDot, FaXmark } from 'react-icons/fa6';
import { getDistance } from '../Redux/Slices/airportSlice';
import { getOnewayCabData } from '../Redux/Slices/outstationSlice';
import MainForm from '../Components/MainForm';
import { FaArrowRight } from 'react-icons/fa';

const OnewayCarList = () => {
    const [modifyActive, setModifyActive] = useState(false)
    const dispatch = useDispatch()
    const [detailsActive, setDetailsActive] = useState()
    const navigate = useNavigate()
    const location = useLocation()
    const [filteredData, setFilteredData] = useState()
    const { pickupDate, tripType, pickupTime, pickup, drop } = location.state

    console.log(location.state)

    const tcData = useSelector((state) => state?.localTrip?.tcData)
    console.log(tcData)
    const tc = tcData?.tC?.map(data => data?.text)

    const fetchDistance = async () => {
        const cityData = {
            fromCity: pickup,
            toCity: drop
        }

        const res = await dispatch(getOnewayCabData(cityData))
        setFilteredData(res?.payload?.data)
    }

    useEffect(() => {

        fetchDistance()

        const data = {
            tripType: "oneway"
        }
        dispatch(getTCDetails(data))
        setModifyActive(false)
    }, [location.state])

    const handleBook = (data) => {

        console.log(data)

        if (!pickupDate) {
            return toast.error("Pickup date is required")
        }

        if (!pickupTime) {
            return toast.error("Pickup time is required")
        }

        navigate('/book-oneway-trip-cab', {
            state: {
                cabData: data,
                pickupCity: pickup,
                dropCity: drop,
                pickupDate: pickupDate,
                pickupTime: pickupTime,
                tripType: tripType,
                tcData: tc,
                totalPrice: data?.rate
            }
        })
    }


    const formatPickupDate = (dateString) => {
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


    return (
        <div className=' min-h-[90vh] bg-lightSky'>

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
                                <h2 className='font-semibold tracking-wide'>{pickup.split(',')[0]}</h2>
                            </div>
                            <MdKeyboardArrowRight className='hidden text-[1.3rem] md:block' />
                            <div className='items-center justify-center gap-1 md:flex'>

                                <FaLocationDot className='ml-[0.05rem] text-[0.85rem] text-light hidden md:block' />

                                <h2 className='font-semibold tracking-wide'> {drop.split(',')[0]}
                                </h2>
                            </div>
                        </div>


                    </div>
                    <p className='text-[0.78rem] md:mt-[0.15rem] sm:text-[0.9rem] font-[500]'>
                        ({tripType})
                    </p>
                </div>
                <div className='flex flex-col items-center justify-center gap-2 md:flex-row'>
                    <p className='text-[0.85rem]  sm:text-[1rem]'>{formatPickupDate(pickupDate)}
                        <span> {pickupTime}</span>
                    </p>
                    <button className='text-white bg-main p-[0.2rem] text-[0.9rem] font-semibold px-4 rounded' onClick={() => setModifyActive(true)}>Modify</button>
                </div>
            </div>
            {modifyActive &&
                <div className='fixed top-0 left-0 z-10 flex flex-col items-center justify-center w-full h-screen bg-dark bg-opacity-70'>

                    <div className='w-fit h-fit'>
                        <MainForm mainActive={1} inner={1.1} mainDate={pickupDate} mainTime={pickupTime} pickupData={pickup} dropData={drop} />
                        <button className='bg-white relative bottom-10 text-main rounded-md font-semibold text-[0.95rem] pl-2 px-4 p-[0.25rem] mx-4 flex items-center justify-center' onClick={() => setModifyActive(false)}>
                            <MdArrowLeft className='text-[1.5rem] tracking-wide' />
                            Back
                        </button>
                    </div>
                </div>}
            <div className='flex flex-col py-10  px-[5vw] sm:px-[7vw] md:px-[9vw] lg:px-[11vw] items-center justify-center gap-4'>
                {
                    !filteredData ? "Loading" :
                        filteredData && filteredData?.length === 0 ?
                            <p>No Cabs available to this city right now</p> :
                            filteredData?.map((data, index) => {
                                return <div key={index} className='border rounded-md  border-main min-w-[19.5rem] text-black max-w-[22rem] cursor-pointer transition-all duration-500 sm:max-w-[45rem] md:max-w-[50rem] lg:max-w-[52rem] w-[90vw] border-b md:border-r-[6px] hover:shadow-none shadow-[0px_5px_16px_-6px_#808080] overflow-hidden lg:hover:border-r-[0.5px]'>
                                    <div
                                        className='bg-white flex flex-col   sm:flex-row    [#f8fafc] '
                                    >
                                        <div className='flex'>
                                            <img key={index} src={data?.category?.photo?.secure_url || car1} alt={`car ${index + 1}`} className='max-w-[8rem] min-w-[8rem] max-h-[5rem] object-cover sm:max-h-[7.5rem] sm:min-w-[11rem] sm:max-w-[10.9rem]' />

                                            <div className='px-2 sm:hidden '>
                                                <div className='flex items-center justify-between mt-1'>
                                                    <h2 className='text-[1.2rem] lg:text-[1.45rem] font-semibold'>{data?.category?.name}</h2>
                                                </div>
                                                <div className='flex flex-wrap '>
                                                    <div className='flex items-center mr-4 justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                                        <MdLuggage className='' />
                                                        {data?.category?.numberOfBags} luggage
                                                    </div>

                                                    <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                                        <MdAirlineSeatReclineExtra className='' />
                                                        <p> {data?.category?.numberOfSeats} seats</p>
                                                    </div>
                                                    <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                                        <TbAirConditioning className='' />
                                                        <p>{data?.category?.acAvailable ? "AC" : "NON AC"}</p>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <div className='relative hidden w-full sm:block'>
                                                <div className='flex items-center justify-between mt-1 sm:pl-4'>
                                                    <h2 className='text-[1.2rem] lg:text-[1.45rem] font-semibold'>{data?.category?.name}</h2>

                                                </div>


                                                <div className='flex flex-wrap sm:pl-4'>
                                                    <div className='flex items-center mr-4 justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                                        <MdLuggage className='' />
                                                        {data?.numberOfBags} luggage
                                                    </div>

                                                    <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                                        <MdAirlineSeatReclineExtra className='' />
                                                        <p> {data?.numberOfSeats} seats</p>
                                                    </div>
                                                    <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                                        <TbAirConditioning className='' />
                                                        <p>{data?.acAvailable ? "AC" : "NON AC"}</p>
                                                    </div>


                                                </div>
                                                <div className='absolute bottom-0 items-center justify-between hidden w-full p-1 px-1 sm:px-2 md:px-8 mt-3 border gap-3 bg-opacity-65 sm:flex bg-sky-100 text-[#5f5f5f]'>
                                                    <button
                                                        onClick={() => setDetailsActive(`1.${index}`)}
                                                        className='list-none text-[0.8rem] font-semibold flex items-center justify-center gap-1'
                                                    >
                                                        {detailsActive === `1.${index}` ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                        Inclusive
                                                    </button>

                                                    <button
                                                        onClick={() => setDetailsActive(`2.${index}`)}
                                                        className='list-none text-[0.8rem] font-semibold flex items-center justify-center gap-1'
                                                    >
                                                        {detailsActive === `2.${index}` ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                        Exclusive
                                                    </button>

                                                    <button
                                                        onClick={() => setDetailsActive(`3.${index}`)}
                                                        className='list-none text-[0.8rem] font-semibold flex items-center justify-center gap-1'
                                                    >
                                                        {detailsActive === `3.${index}` ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                        T&C
                                                    </button>

                                                </div>
                                            </div>

                                            <div className='flex flex-col items-center justify-center w-full  border-t border-[#d7d7d7]  sm:border-t-0 sm:border-l sm:w-[11rem]'>

                                                <div className='flex sm:flex-col items-center justify-center w-[95%] mx-auto sm:w-fit bg-white'>
                                                    <p className='text-[0.8rem] items-center top-2 mr-4 sm:mr-0 flex flex-col font-semibold text-[#505050] relative'>&#8377;15000
                                                        <p className='h-[1.15px] w-[2.7rem] rotate-[-8deg] absolute top-[0.65rem] bg-red-600'></p>

                                                    </p>
                                                    <div className='flex flex-col items-center'>
                                                        <span className='text-[1.2rem] relative sm:top-0 sm:my-2 top-[0.35rem] font-semibold text-[#19B56F]'>&#8377; {data?.rate}</span>

                                                    </div>

                                                    <button onClick={() => handleBook(data)} className='text-[1rem] mt-3 bg-main text-white p-[0.35rem] px-4 rounded font-semibold ml-10 sm:m-0'>Book now</button>
                                                </div>
                                                <div className='flex items-center justify-between w-full p-1 px-6 mt-3 bg-opacity-80 bg-sky-100 sm:hidden text-[#525252]'>
                                                    <button onClick={() => setDetailsActive(`1.${index}`)} className='flex items-center gap-1 text-[0.8rem] font-semibold '>
                                                        {detailsActive === `1.${index}` ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                        Inclusive
                                                    </button>
                                                    <button onClick={() => setDetailsActive(`2.${index}`)} className='flex items-center gap-1 text-[0.8rem] font-semibold '>
                                                        {detailsActive === `2.${index}` ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                        Exclusive
                                                    </button>
                                                    <button onClick={() => setDetailsActive(`3.${index}`)} className='flex items-center gap-1 text-[0.8rem] font-semibold '>
                                                        {detailsActive === `3.${index}` ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                        T&C
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                        <div className='block sm:hidden text-[#0f0f0f] '>
                                            {detailsActive === `3.${index}` &&
                                                <div className='text-[0.8rem] p-2 py-4 relative'>
                                                    <div className='absolute text-main right-3 top-3' onClick={() => setDetailsActive(0)}><FaXmark /></div>
                                                    <h3 className='text-[0.9rem] font-semibold '>Terms and Conditions</h3>
                                                    {tc.map((t, i) => (
                                                        <li key={i} className='pl-2 mt-1 list-disc'>{t}</li>
                                                    ))}
                                                </div>
                                            }
                                            {detailsActive === `2.${index}` &&
                                                <div className='text-[0.8rem] p-2 py-4 flex items-start justify-start w-full flex-wrap gap-4
                                            relative'>
                                                    <div className='absolute text-main right-3 top-3' onClick={() => setDetailsActive(0)}><FaXmark /></div>

                                                    {/* <div className='flex items-center gap-2'>
                                                        <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                            <GiTakeMyMoney className='text-[1.1rem]' />
                                                        </div>
                                                        <p>Pay &#8377; {data?.category?.extraKm}/km after { } km</p>
                                                    </div> */}
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
                                    <div className='sm:block hidden text-[#0f0f0f] border-t border-main'>
                                        {detailsActive === `3.${index}` &&
                                            <div className='text-[0.8rem] p-2 py-4 relative'>
                                                <div className='absolute text-main right-3 top-3' onClick={() => setDetailsActive(0)}><FaXmark /></div>
                                                <h3 className='text-[0.9rem] font-semibold '>Terms and Conditions</h3>
                                                {tc.map((t, i) => (
                                                    <li key={i} className='pl-2 mt-1 list-disc'>{t}</li>
                                                ))}
                                            </div>
                                        }
                                        {detailsActive === `2.${index}` &&
                                            <div className='text-[0.8rem] p-2 py-4 flex items-center justify-center w-full flex-wrap gap-4
                                            relative'>
                                                <div className='absolute text-main right-3 top-3' onClick={() => setDetailsActive(0)}><FaXmark /></div>

                                                {/* <div className='flex items-center gap-2'>
                                                    <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                        <GiTakeMyMoney className='text-[1.1rem]' />
                                                    </div>
                                                    <p>Pay &#8377; {data?.extraKm}/km after {totalFare()} km</p>

                                                </div> */}
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

export default OnewayCarList
