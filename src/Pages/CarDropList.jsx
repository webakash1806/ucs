import React, { useEffect, useState } from 'react'
import { GiGasPump, GiTakeMyMoney } from 'react-icons/gi'
import { IoDocumentText } from 'react-icons/io5'
import { MdAirlineSeatReclineExtra, MdLocalParking, MdLuggage } from 'react-icons/md'
import { SiToll } from 'react-icons/si'
import { TbAirConditioning } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import car1 from '../assets/car1.jpg'
import { toast } from 'react-toastify'
import { getTCDetails } from '../Redux/Slices/localTripSlice'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { FaXmark } from 'react-icons/fa6'
import { getDistance } from '../Redux/Slices/airportSlice'

const CarDropList = () => {



    const [active, setActive] = useState(1);
    const dispatch = useDispatch()
    const [detailsActive, setDetailsActive] = useState()
    const navigate = useNavigate()
    const location = useLocation()
    const [distance, setDistance] = useState(0)
    const [filteredData, setFilteredData] = useState([])
    const data = location.state

    const { cabData, drop, pickup, pickupDate, pickupTime, tripType } = data

    console.log(data)

    const { tcData } = useSelector((state) => state?.localTrip)
    const { tC } = tcData
    const tc = tC?.map(data => data?.text)
    console.log(cabData)
    console.log(filteredData)
    useEffect(() => {
        if (cabData) {
            const newFilteredData = cabData.map((car) => {
                const filteredRates = car.rates.filter((rate) => {
                    if (distance <= 30) {
                        return rate.kilometer === '30';
                    } else if (distance > 30 && distance <= 45) {
                        return rate.kilometer === '45';
                    } else if (distance > 45) {
                        return false; // No data found for distances beyond 45 km
                    } else {
                        return false;
                    }
                });
                return { ...car, rates: filteredRates };
            });

            // Handle case where no data is found for distances beyond 45 km
            const noDataFound = distance > 45;
            console.log(distance)
            if (noDataFound) {
                console.log(true)
                setFilteredData([]); // Or handle it based on your requirements
            } else {
                setFilteredData(newFilteredData);
            }
        }
    }, [distance, cabData]); // Ensure this runs when `distance` or `cabData` changes


    console.log(filteredData)


    const fetchDistance = async () => {
        const distanceData = {
            fromLocation: data?.pickup,
            toLocation: data?.drop
        }

        const res = await dispatch(getDistance(distanceData))
        setDistance(res?.payload?.distance)

    }

    useEffect(() => {

        fetchDistance()

        if (tripType === "Drop airport") {
            const data = {
                tripType: "airpot"
            }
            dispatch(getTCDetails(data))
        }
    }, [])

    const handleBook = (data) => {

        console.log(data)

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



    console.log(data)
    return (
        <div className='px-2 py-2 bg-lightSky'>

            <div className='flex flex-col py-10  px-[5vw] sm:px-[7vw] md:px-[9vw] lg:px-[11vw] items-center justify-center gap-4'>
                {
                    distance === 0 ? "Loading..." :
                        filteredData && filteredData?.length === 0 ?
                            <p>No Cabs available to this city right now</p> :
                            filteredData?.map((data, index) => {
                                return <div key={index} className='border rounded-md border-main min-w-[19.5rem] text-black max-w-[22rem] cursor-pointer transition-all duration-500 sm:max-w-[45rem] md:max-w-[50rem] lg:max-w-[52rem] w-[90vw] border-b md:border-r-[6px] hover:shadow-none shadow-[0px_5px_16px_-6px_#808080] overflow-hidden lg:hover:border-r-[0.5px]'>
                                    <div
                                        className='bg-white flex flex-col   sm:flex-row    [#f8fafc] '
                                    >
                                        <div className='flex'>
                                            <img key={index} src={data?.photo?.secure_url || car1} alt={`car ${index + 1}`} className='max-w-[8rem] min-w-[8rem] max-h-[5rem] object-cover sm:max-h-[7.5rem] sm:min-w-[11rem] sm:max-w-[10.9rem]' />
                                            <div className='px-2 sm:hidden '>
                                                <div className='flex items-center justify-between mt-1'>
                                                    <h2 className='text-[1.2rem] lg:text-[1.45rem] font-semibold'>{data?.name}</h2>
                                                </div>
                                                <div className='flex flex-wrap gap-1'>
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
                                                    <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                                        <GiTakeMyMoney className='' />
                                                        <p>{data?.rates[0]?.rate} for {data?.rates[0]?.kilometer} km</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <div className='relative hidden w-full sm:block'>
                                                <div className='flex items-center justify-between mt-1 sm:pl-4'>
                                                    <h2 className='text-[1.2rem] lg:text-[1.45rem] font-semibold'>{data?.name}</h2>

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
                                                    <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                                        <GiTakeMyMoney className='' />
                                                        <p>{data?.rates[0]?.rate} for {data?.rates[0]?.kilometer} km</p>
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
                                                        <span className='text-[1.2rem] relative top-2 font-semibold text-[#19B56F]'>&#8377; {data?.rates[0]?.rate}</span>
                                                        <p className='text-[0.75rem] font-semibold pt-1'>Inclusive of GST</p>
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
                                    <div className='sm:block hidden text-[#0f0f0f] '>
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
