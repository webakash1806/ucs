import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { allBookings, cancelBooking, downloadInvoice } from '../../Redux/Slices/authSlice'
import car1 from '../../assets/car1.jpg'
import { ShieldCheckIcon, UserGroupIcon, BriefcaseIcon, TruckIcon, CurrencyRupeeIcon, BoltIcon } from '@heroicons/react/24/outline'; // Importing Heroicons
import { LuLuggage } from 'react-icons/lu'
import { MdCarRental, MdContactSupport } from 'react-icons/md'
import { FaDownload, FaIndianRupeeSign, FaLocationDot, FaTriangleExclamation, FaUserCheck, FaXmark } from 'react-icons/fa6'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { AiOutlineCheck, AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineCloseCircle, AiOutlineSync } from 'react-icons/ai'
import { FaCar } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify'
const PastBooking = () => {
    const [item, setItem] = useState(null);
    const [active, setActive] = useState(false)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const { id } = useParams()
    const [bookingData, setBookingData] = useState()


    const fetchBookingDetails = async () => {
        const res = await dispatch(allBookings({ id }))
        setBookingData(res?.payload?.bookingHistory)
    }

    const cancel = async (cancelId) => {
        // Dispatch the cancelBooking action
        setActive(true)
        await dispatch(cancelBooking({ cancelId })).unwrap();

        // After successful cancellation, fetch the booking details again
        fetchBookingDetails();
        setItem(null)
        toast.success("Booking Cancelled")
    };

    useEffect(() => {
        fetchBookingDetails()
    }, [dispatch])

    const download = async (invoiceId) => {
        const res = await dispatch(downloadInvoice({ invoiceId }))
    }

    return (
        <div className='flex flex-col items-center justify-start w-full min-h-screen gap-6 p-3 pt-6'>
            <p className='text-[1.6rem] font-bold underline'>My Bookings</p>
            {!bookingData ?
                <p>Loading...</p> :
                bookingData && bookingData?.length === 0 ?
                    <p>No booking till now</p> :
                    bookingData?.reverse()?.map((item, index) => {
                        return <motion.div
                            key={index}
                            layoutId={item?._id}
                            className="flex flex-col max-w-[27rem] border border-main sm:max-w-[55rem] w-full overflow-hidden  rounded-lg shadow-md cursor-pointer"
                            onClick={() => setItem(item)} // On click, set the selected card ID
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="flex flex-col items-center justify-between w-full mx-auto bg-white border-b sm:flex-row">
                                {/* Car image and details */}
                                <div className="flex items-start justify-between w-full pr-3 border-b sm:w-fit">
                                    <img
                                        src={item?.photo?.secure_url || car1}
                                        alt={`car ${index + 1}`}
                                        className="max-w-[7.8rem] min-w-[7.8rem] min-h-[5.3rem] max-h-[5.3rem] object-cover sm:max-h-[6rem] sm:min-h-[6rem] sm:min-w-[9.9rem] sm:max-w-[9.8rem]"
                                    />
                                    <div className="w-full ml-2 sm:hidden">
                                        <div className="block pt-1 sm:text-left">
                                            <p className='text-[0.8rem] sm:text-[85rem] font-semibold tracking-wide border rounded border-main bg-sky-100 w-fit p-[0.1rem] px-2'>{item?.bookingId}</p>
                                            <h2 className=" text-[1.4rem] leading-7 mb-1 font-semibold line-clamp-1">
                                                {item?.category}
                                            </h2>
                                        </div>
                                        <div className="flex justify-between sm:flex-col sm:w-[13rem] max-w-[14.5rem] items-center gap-3">
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center mr-2 text-[1.1rem] font-bold text-gray-800">
                                                    <FaIndianRupeeSign className="w-4 h-4 text-gray-800 " />{' '}
                                                    {Math.ceil(item?.totalPrice)}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right section */}
                                <div className="w-full sm:max-w-[70%] pl-2">
                                    <div className="hidden text-center sm:block sm:text-left">
                                        <h2 className="mb-2 text-2xl font-semibold">{item?.category}</h2>
                                    </div>

                                    <div className="flex relative pl-3 flex-col items-start mt-4 text-[0.9rem] sm:mt-0 font-semibold font-sans mb-2">
                                        <div className="absolute top-[0.3rem] text-light left-[-0.3rem] text-[0.75rem] flex items-center justify-center flex-col">
                                            <div className="rotate-[180deg] mr-[0.01px] size-[0.65rem] border-light border-[0.2rem] rounded-full"></div>
                                            <div className="h-[0.7rem] border-dashed border-r-[1.3px] mr-[0.155rem] border-light w-1"></div>
                                            <FaLocationDot />
                                        </div>
                                        {item?.tripType === "Round" ?
                                            <>
                                                <p className="line-clamp-1">{item?.fromLocation}</p>
                                                <p className="line-clamp-1">{item?.toLocation}</p>
                                            </> :
                                            <>
                                                <p className="line-clamp-1">{item?.pickupAddress}</p>
                                                <p className="line-clamp-1">{item?.dropAddress}</p>
                                            </>}
                                    </div>
                                </div>

                                {/* Price and button */}
                                <div className="hidden sm:flex sm:flex-col min-w-[9rem] max-w-[9rem] items-center">
                                    <div>
                                        <div className="flex items-center text-2xl font-bold text-gray-800">
                                            <FaIndianRupeeSign className="w-4 h-4 mt-1 text-gray-800 " />{' '}
                                            {Math.ceil(item?.totalPrice)}
                                        </div>
                                    </div>
                                    <button className="px-4 py-[0.25rem] mt-1 text-white transition rounded-md shadow bg-main border">
                                        View Detail
                                    </button>
                                </div>
                            </div>

                            {/* Status and Trip Type */}
                            <div>
                                <div className='p-2 px-3 pb-0 text-[0.9rem] font-semibold flex justify-between'>
                                    <p>Pickup : {item?.pickupDate.split('T')[0]} at {item?.pickupTime}</p>
                                    {item?.tripType === "Round" &&
                                        <p>Return : {item?.returnDate?.split('T')[0]}</p>

                                    }
                                </div>
                                <div className="flex items-center justify-between gap-2 p-3  sm:pl-4 text-[0.85rem] sm:text-[0.95rem] font-semibold text-main">
                                    <div className="flex gap-2">
                                        <div
                                            className={`flex cursor-pointer items-center p-[0.15rem] pr-1 
                                ${item?.status === 'confirmed'
                                                    ? 'bg-green-100 border border-green-500'
                                                    : item?.status === 'pending'
                                                        ? 'bg-yellow-100 border border-yellow-500'
                                                        : item?.status === 'ongoing'
                                                            ? 'bg-blue-100 border border-blue-500'
                                                            : item?.status === 'cancelled'
                                                                ? 'bg-red-100 border border-red-500'
                                                                : item?.status === 'complete'
                                                                    ? 'bg-gray-100 border border-gray-500'
                                                                    : 'bg-red-100 border border-red-500'
                                                } 
                                rounded`}
                                        >
                                            <div className="p-1 rounded-full">
                                                {item?.status === 'confirmed' && (
                                                    <AiOutlineCheckCircle className="w-4 h-4 text-green-600" />
                                                )}
                                                {item?.status === 'pending' && (
                                                    <AiOutlineClockCircle className="w-4 h-4 text-yellow-600" />
                                                )}
                                                {item?.status === 'ongoing' && (
                                                    <AiOutlineSync className="w-4 h-4 text-blue-600" />
                                                )}
                                                {item?.status === 'cancelled' && (
                                                    <AiOutlineCloseCircle className="w-4 h-4 text-red-600" />
                                                )}
                                                {item?.status === 'complete' && (
                                                    <AiOutlineCheck className="w-4 h-4 text-gray-600" />
                                                )}
                                            </div>
                                            <span className="text-gray-700 capitalize">{item?.status}</span>
                                        </div>
                                    </div>
                                    <div className="sm:flex hidden items-center p-[0.15rem] pr-2 sm:px-3 sm:pl-2 cursor-pointer bg-blue-50 border border-main rounded">
                                        <div className="p-1 rounded-full">
                                            <FaCar className="w-4 h-4 text-main" />
                                        </div>
                                        <span className="text-gray-700">{item?.bookingId}</span>
                                    </div>
                                    <div className="flex items-center p-[0.15rem] pr-2 sm:px-3 sm:pl-2 cursor-pointer bg-blue-50 border border-main rounded">
                                        <div className="p-1 rounded-full">
                                            <FaCar className="w-4 h-4 text-main" />
                                        </div>
                                        <span className="text-gray-700">{item?.tripType.split(' ')[0]} trip</span>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    })}

            {/* Expanded Content */}
            <AnimatePresence>
                {item && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black"
                        />

                        {/* Modal Popup */}
                        <motion.div
                            layoutId={item?._id}
                            key="modal"
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 "
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >

                            <div className='relative border border-main mt-10 max-w-[27rem] sm:max-w-[55rem] w-full overflow-hidden bg-white rounded-md'>
                                <motion.button
                                    onClick={() => setItem(null)}
                                    className="absolute  right-1 top-[-0.75rem]  mt-4 text-red-600 bg-red-50 border border-red-500 rounded-full p-1 rounded-tr-lg"
                                >
                                    <FaXmark />
                                </motion.button>
                                <div className="flex flex-col items-center justify-between w-full mx-auto border-b sm:flex-row">
                                    {/* Car image and details */}
                                    <div className="flex items-start justify-between w-full pr-3 border-b sm:w-fit">
                                        <img
                                            src={item?.photo?.secure_url || car1}
                                            alt={`car ${item?.category}`}
                                            className="max-w-[7.8rem] min-w-[7.8rem] min-h-[5.3rem] max-h-[5.3rem] object-cover sm:max-h-[6rem] sm:min-h-[6rem] sm:min-w-[9.9rem] sm:max-w-[9.8rem]"
                                        />
                                        <div className="w-full ml-2 sm:hidden">
                                            <div className="block pt-2 sm:text-left">
                                                <p className='text-[0.8rem] sm:text-[85rem] font-semibold tracking-wide border rounded border-main bg-sky-100 w-fit p-[0.1rem] px-2'>{item?.bookingId}</p>
                                                <h2 className="text-[1.4rem] leading-6 mb-1 font-semibold line-clamp-1">
                                                    {item?.category}
                                                </h2>
                                            </div>
                                            <div className="flex justify-between sm:flex-col sm:w-[13rem] max-w-[14.5rem] items-center gap-3">
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center mr-2 text-[1.1rem] font-bold text-gray-800">
                                                        <FaIndianRupeeSign className="w-4 h-4 text-gray-800 " />{' '}
                                                        {Math.ceil(item?.totalPrice)}

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    {/* Right section */}
                                    <div className="w-full sm:max-w-[70%] pl-2">
                                        <div className="hidden text-center sm:block sm:text-left">
                                            <h2 className="mb-2 text-2xl font-semibold">{item?.category}</h2>
                                        </div>

                                        <div className=' sm:p-0 py-2 text-[0.9rem] md:text-[0.95rem] font-semibold flex justify-between'>
                                            <p>Pickup: {item?.pickupDate.split('T')[0]} at {item?.pickupTime}</p>
                                            {item?.tripType === "Round" && <p>Return: {item?.returnDate?.split('T')[0]}</p>}
                                        </div>


                                    </div>

                                    {/* Price and buttons */}
                                    <div className="hidden sm:flex sm:flex-col min-w-[9rem] max-w-[9rem] items-center">
                                        <div>
                                            <div className="flex items-center text-2xl font-bold text-gray-800">
                                                <FaIndianRupeeSign className="w-4 h-4 mt-1 text-gray-800 " />{' '}
                                                {Math.ceil(item?.totalPrice)}

                                            </div>
                                        </div>


                                    </div>
                                </div>

                                {/* Status and Trip Type */}
                                <div className='p-2 sm:p-3'>
                                    <div onClick={() => download(item?._id)} className='p-2 flex items-center justify-center gap-2 cursor-pointer min-w-fit bg-blue-50 text-blue-600 border py-[0.42rem] border-blue-500 rounded'>
                                        <FaDownload /> Download invoice
                                    </div>
                                    <div className="flex relative  flex-col items-start mt-4 text-[0.9rem] gap-2 sm:mt-0 font-semibold font-sans mb-2">

                                        {item?.tripType === "Round" ? (
                                            <>

                                                <div className='flex items-start'>
                                                    <div className="rotate-[180deg] mr-2 mt-[0.34rem] size-[0.65rem] border-light border-[0.2rem] rounded-full"></div>

                                                    <p className="">{item?.fromLocation}</p>
                                                </div>
                                                <p className="flex items-center">
                                                    <FaLocationDot className='text-[0.7rem] mt-[0.34rem] mr-[0.4rem]' />

                                                    {item?.toLocation}</p>
                                            </>
                                        ) : (
                                            <>
                                                <div className='flex items-start'>
                                                    <div className="rotate-[180deg] mr-2 mt-[0.34rem] size-[0.65rem] border-light border-[0.2rem] rounded-full"></div>

                                                    <p className="">{item?.pickupAddress}</p>
                                                </div>
                                                <p className="flex ">
                                                    <FaLocationDot className='text-[0.7rem] mt-[0.34rem] ml-[0.06rem] mr-[0.5rem]' />

                                                    {item?.dropAddress}</p>
                                            </>
                                        )}
                                    </div>

                                    {/* Driver details */}
                                    {/* {item?.driverDetails} */}
                                    {item?.driverDetails?.filter(driver => driver.isActive).map((driver, index) => (
                                        <div key={index} className="flex bg-sky-50 font-semibold flex-col text-[0.9rem] p-2  rounded border border-main mt-3 text-black">
                                            <h3 className="flex items-center gap-2 mb-1 text-lg font-semibold"> <FaUserCheck /> Driver Details</h3>
                                            <p className="">
                                                <span className='font-semibold text-gray-700'>Driver Name:</span> {driver.name}
                                            </p>
                                            <p className="">
                                                <span className='font-semibold text-gray-700'>Car Number:</span> {driver.carNumber}
                                            </p>
                                            <p className="">
                                                <span className='font-semibold text-gray-700'>Driver Phone:</span> {driver.phoneNumber}
                                            </p>

                                        </div>
                                    ))}
                                    {item?.driverDetails?.filter(driver => driver.isActive).length === 0 && <div className="flex bg-sky-50 font-semibold flex-col text-[0.9rem] p-2 rounded border border-main mt-3 text-black">
                                        <h3 className="flex items-center gap-2 mb-1 text-lg font-semibold"> <FaUserCheck /> Driver Details</h3>
                                        <p className="">
                                            <span className='font-semibold text-gray-700'>Driver Name:</span> N/A
                                        </p>
                                        <p className="">
                                            <span className='font-semibold text-gray-700'>Car Number:</span>  N/A
                                        </p>
                                        <p className="">
                                            <span className='font-semibold text-gray-700'>Driver Phone:</span>  N/A
                                        </p>

                                    </div>}
                                    <div className="flex flex-wrap items-center justify-between gap-2 py-2 mt-2 text-[0.85rem] sm:text-[0.95rem] font-semibold text-main">
                                        <div className="flex gap-2">
                                            <div
                                                className={`flex cursor-pointer items-center p-[0.15rem] pr-1 
                        ${item?.status === 'confirmed' ? 'bg-green-100 border border-green-500' :
                                                        item?.status === 'pending' ? 'bg-yellow-100 border border-yellow-500' :
                                                            item?.status === 'ongoing' ? 'bg-blue-100 border border-blue-500' :
                                                                item?.status === 'cancelled' ? 'bg-red-100 border border-red-500' :
                                                                    item?.status === 'complete' ? 'bg-gray-100 border border-gray-500' :
                                                                        'bg-red-100 border border-red-500'} 
                        rounded`}
                                            >
                                                <div className="p-1 rounded-full">
                                                    {item?.status === 'confirmed' && <AiOutlineCheckCircle className="w-4 h-4 text-green-600" />}
                                                    {item?.status === 'pending' && <AiOutlineClockCircle className="w-4 h-4 text-yellow-600" />}
                                                    {item?.status === 'ongoing' && <AiOutlineSync className="w-4 h-4 text-blue-600" />}
                                                    {item?.status === 'cancelled' && <AiOutlineCloseCircle className="w-4 h-4 text-red-600" />}
                                                    {item?.status === 'complete' && <AiOutlineCheck className="w-4 h-4 text-gray-600" />}
                                                </div>
                                                <span className="text-gray-700 capitalize">{item?.status}</span>
                                            </div>
                                        </div>
                                        <div className="sm:flex hidden items-center p-[0.15rem] pr-2 sm:px-3 sm:pl-2 cursor-pointer bg-blue-50 border border-main rounded">
                                            <div className="p-1 rounded-full">
                                                <FaCar className="w-4 h-4 text-main" />
                                            </div>
                                            <span className="text-gray-700">{item?.bookingId}</span>
                                        </div>
                                        <div className="flex items-center p-[0.15rem] pr-1 sm:px-3 sm:pl-2 cursor-pointer bg-blue-50 border border-main rounded">
                                            <div className="p-1 rounded-full">
                                                <FaCar className="w-4 h-4 text-main" />
                                            </div>
                                            <span className="text-gray-700">{item?.tripType.split(' ')[0]} trip</span>
                                        </div>
                                        {(item?.status === "confirmed" || item?.status === "pending") &&
                                            <div onClick={() => cancel(item?._id)} className="flex items-center p-[0.3rem] pr-1 gap-2 sm:px-3 sm:pl-2 cursor-pointer bg-red-500 border rounded">
                                                {active &&
                                                    <div className='border-[3px] border-b-red-500 animate-spin rounded-full size-4'></div>

                                                }
                                                <span className="text-white">Cancel booking</span>
                                            </div>}
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    )
}

export default PastBooking
