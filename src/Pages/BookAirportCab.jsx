import React, { useEffect, useState } from 'react'
import { FaAnchorCircleExclamation, FaArrowRight, FaCar, FaHotel, FaLocationDot } from 'react-icons/fa6'
import { IoBed, IoDocumentText } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom'
import car1 from '../assets/car1.jpg'
import { MdAirlineSeatReclineExtra, MdKeyboardArrowRight, MdLocalParking, MdLuggage } from 'react-icons/md'
import { TbAirConditioning } from 'react-icons/tb'
import { PiUsersThreeFill } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { sendBookingData } from '../Redux/Slices/localTripSlice'
import { toast } from 'react-toastify'
import { order, verifyPayment } from '../Redux/Slices/razorpaySlice'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { GiGasPump, GiTakeMyMoney } from 'react-icons/gi'
import { SiToll } from 'react-icons/si'
import { sendAirportBookingData } from '../Redux/Slices/airportSlice'
import { verifyVoucher } from '../Redux/Slices/authSlice'
import { FaRegCheckCircle } from 'react-icons/fa'

const BookAirportCab = () => {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1);
    const [detailsActive, setDetailsActive] = useState(1)
    const [actualPrice, setActualPrice] = useState(0)
    const dispatch = useDispatch()
    const location = useLocation()
    console.log(location.state)
    const { cabData, tcData, pickupDate, pickup, drop, airpotValue, pickupTime, tripType } = location.state
    const totalPrice = cabData?.rates[0]?.rate
    const [finalPrice, setFinalPrice] = useState(Number(totalPrice))
    const [price10, setPrice10] = useState(Number(finalPrice) * 10 / 100)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [voucherLoading, setVoucherLoading] = useState(false)
    const [gstActive, setGstActive] = useState(false)

    const userData = useSelector((state) => state?.auth)
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const order_id = useSelector((state) => state?.razorpay?.orderId);

    const formatPickupDate = (dateString) => {
        // Create a new Date object directly from the "yyyy-mm-dd" string
        const dateObject = new Date(dateString);

        // Use Intl.DateTimeFormat to get the weekday
        const weekday = new Intl.DateTimeFormat('en-GB', {
            weekday: 'long',
        }).format(dateObject);

        // Use Intl.DateTimeFormat to get the rest of the date (day, month, year)
        const dateWithoutWeekday = new Intl.DateTimeFormat('en-GB', {
            month: 'long',
            day: 'numeric',
        }).format(dateObject);

        // Extract the year directly from the dateObject
        const year = dateObject.getFullYear();

        // Combine the weekday, the formatted date, and the year with commas
        return `${weekday}, ${dateWithoutWeekday}, ${year}`;
    };

    console.log(userData)

    const handleVoucher = async () => {
        setVoucherLoading(true)
        const res = await dispatch(verifyVoucher({
            voucherCode: formData?.voucherCode,
            tripType: "Airport Trip"
        }))

        const discount = res?.payload?.discount

        if (res?.payload?.dataType === 1) {

            const discountPrice = Number(discount) * finalPrice / 100
            setDiscountPrice(Number(discountPrice))
            setFinalPrice(Number(finalPrice) - Number(discountPrice))
            setVoucherLoading(false)
        }

        if (res?.payload?.dataType === 2) {
            setDiscountPrice(Number(discount))
            setFinalPrice(Number(finalPrice) - Number(discount))
            setVoucherLoading(false)
        }

        setVoucherLoading(false)
        console.log(res?.payload)
    }



    const [formData, setFormData] = useState({
        fromLocation: airpotValue === 1 ? pickup : drop,
        airpotAddress: airpotValue === 1 ? drop : pickup,
        tripType: tripType,
        category: cabData?.name,
        pickupDate: pickupDate,
        pickupTime: pickupTime,
        name: userData?.data?.name || "",
        email: userData?.data?.email || "",
        phoneNumber: userData?.data?.phoneNumber || "",
        voucherCode: "",
        distance: cabData?.rates[0]?.kilometer,
        paymentMode: '10',
        declaration: false,
        airpotValue: airpotValue,
        gst: false
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value, // Handle checkbox separately
        });
    };

    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_order_id: "",
        razorpay_signature: ""
    };


    const handleGst = () => {
        const gst = totalPrice * 5 / 100
        if (formData.gst) {
            setFinalPrice(Math.ceil(Number(gst) + Number(finalPrice)))
            setGstActive(true)
        }

        if (gstActive) {
            setFinalPrice(Math.ceil(Number(finalPrice) - Number(gst)))
            setGstActive(false)
        }
    }

    useEffect(() => {
        handleGst()
    }, [formData?.gst])

    const checkPickupTime = (pickupDate, pickupTime) => {
        const currentTime = new Date();

        // Parse pickup date (assuming the format is "YYYY-MM-DD")
        const [year, month, day] = pickupDate.split('-').map(Number);
        const pickupDateTime = new Date(year, month - 1, day); // JavaScript months are 0-indexed

        // Check if the pickup date is today
        const isToday = pickupDateTime.toDateString() === currentTime.toDateString();
        console.log(isToday)
        // Parse pickup time in 12-hour format
        const [time, period] = pickupTime.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        const adjustedHours = period === 'PM' ? (hours % 12) + 12 : hours % 12;

        // Set the pickup time on the pickup date
        pickupDateTime.setHours(adjustedHours, minutes, 0, 0);

        console.log(pickupDateTime)
        console.log(currentTime)

        // If the pickup date is today, compare the time
        if (isToday) {
            // If the pickup time is earlier than the current time, return an error
            if (pickupDateTime < currentTime) {
                return "Pickup time is expired";
            }
        }

        // For future dates, no time comparison is needed
        return null; // No error
    };

    const checkPickupDate = (pickupDate) => {

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);


        const pickupDateObj = new Date(pickupDate);
        pickupDateObj.setHours(0, 0, 0, 0);

        if (pickupDateObj < currentDate) {
            navigate('/')

            return toast.error("Pickup date is expired!");
        }
        return null; // No error
    };



    console.log(pickupDate, pickupTime)

    useEffect(() => {
        setPrice10(Number(finalPrice) * 10 / 100)
    }, [finalPrice])

    useEffect(() => {

        const paymentMode = Number(formData?.paymentMode);
        setActualPrice(paymentMode === 10 ? price10 : finalPrice)
    }, [formData.paymentMode, finalPrice, discountPrice, price10, actualPrice, formData?.gst])

    const fetchOrderId = async () => {
        const res = await dispatch(order({ amount: actualPrice, forName: "Airport" }));
        console.log(res)
    };

    useEffect(() => {
        console.log(actualPrice)
        if (actualPrice > 0) {
            fetchOrderId()
        }
    }, [actualPrice]);



    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        const { fromLocation, tripType, category, airpotValue, pickupDate, pickupTime, name, email, phoneNumber, airpotAddress, paymentMode, distance } = formData

        if (currentStep === 1) {
            if (!fromLocation || !tripType || !category || !airpotValue || !airpotAddress || !pickupDate || !pickupTime || !name || !email || !phoneNumber || !distance) {
                return toast.error("All fields are required!")
            }

            checkPickupDate(pickupDate)

            if (checkPickupTime(pickupDate, pickupTime)) {

                return toast.error("Pickup time is expired!")
            }

            return setCurrentStep(2)
        }

        checkPickupDate(pickupDate)

        if (checkPickupTime(pickupDate, pickupTime)) {
            navigate('/')
            return toast.error("Pickup time is expired!")
        }

        const options = {
            key: razorpayKey,
            amount: formData?.finalPrice * 100,
            currency: "INR",
            name: "UCS",
            description: "",
            image: "",
            order_id: order_id,
            handler: async function (res) {
                paymentDetails.razorpay_payment_id = res.razorpay_payment_id;
                paymentDetails.razorpay_order_id = res.razorpay_order_id;
                paymentDetails.razorpay_signature = res.razorpay_signature;
                const response = await dispatch(verifyPayment(paymentDetails));
                if (response?.payload?.success) {
                    const res = await dispatch(sendAirportBookingData(formData))

                    if (res?.payload?.success) {
                        return toast.success("Booking confirmed")
                    }

                }
            },
            prefill: {
                name: formData?.name,
                email: formData?.email,
                contact: formData?.phoneNumber
            },
            notes: {
                address: "Address"
            },
            theme: {
                color: "#2499BF"
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    }



    return (
        <div className='flex flex-wrap items-start justify-center min-h-[90vh] p-4 py-8 bg-gray-100'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <div className='flex flex-wrap items-start justify-center gap-4'>
                    <div
                        className='bg-white  flex flex-col   min-w-[19.5rem] text-black max-w-[29rem] w-[90vw] hover:from-[#f3fbff] cursor-pointer transition-all duration-500 border border-main hover:bg-gradient-to-b hover:to-[#f8fafc] rounded shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'
                    >

                        <div className='flex items-center gap-2 p-2 rounded rounded-b-none bg-gradient-to-tr from-blue-200 via-blue-100 to-[#e6f7ff]'>
                            <div className='p-[8px] border-[0.1px] border-black rounded-full size-fit'>
                                <FaCar />
                            </div>
                            <div>
                                <div className='flex items-center text-[0.9rem]'>
                                    <h2 className='font-semibold tracking-wide'>{pickup.split(',')[0]}</h2>
                                    <MdKeyboardArrowRight className='text-[1.2rem] mt-[0.05rem]' />
                                    <h2 className='font-semibold tracking-wide'> {drop.split(',')[0]}
                                    </h2>
                                </div>
                                <p className='text-[0.7rem] sm:text-[0.85rem] font-[400]'>{formatPickupDate(pickupDate)}
                                    <span> {pickupTime}</span>
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div>
                                <img src={cabData?.photo?.secure_url || car1} className='min-w-[7.1rem] object-cover h-[5rem] max-w-[7.2rem]' alt="" />
                            </div>
                            <div className=''>


                                <h2 className='font-semibold text-[0.95rem]'>{cabData?.name}</h2>

                                <div className='flex flex-wrap '>
                                    <div className='flex items-center mr-4 justify-center gap-[0.15rem] text-[0.78rem] text-[#1c1c1c]'>
                                        <MdLuggage className='' />
                                        {cabData?.numberOfBags} luggage
                                    </div>

                                    <div className='flex items-center mr-4  justify-center gap-[0.15rem] text-[0.78rem] text-[#1c1c1c]'>
                                        <MdAirlineSeatReclineExtra className='' />
                                        <p>{cabData?.numberOfSeats} seats</p>
                                    </div>
                                    <div className='flex items-center mr-4  justify-center gap-[0.15rem] text-[0.75rem] text-[#1c1c1c]'>
                                        <TbAirConditioning className='' />
                                        <p>{cabData?.acAvailable ? "AC" : "NON AC"}</p>
                                    </div>
                                    <div className='flex items-center mr-4  justify-center gap-1 text-[0.87rem] text-[#6e6d6d] font-semibold'>
                                        <GiTakeMyMoney className='' />
                                        <p>{cabData?.rates[0]?.rate} for {cabData?.rates[0]?.kilometer} km</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div>
                            <div className='flex items-center p-1 px-2 text-[0.9rem] gap-1'>
                                <h3 className='font-semibold'>Trip Type :</h3><span className='text-[0.85rem] mt-[0.08rem]'>
                                    {airpotValue === 1 ? "Drop to airport" : "Pickup from airport"}
                                </span>
                            </div>
                            <div className='flex items-center p-1 px-2 text-[0.9rem] gap-1'>
                                <h3 className='font-semibold'>Total Fare :</h3>                                                        <p>&#8377;{finalPrice} for {cabData?.rates[0]?.kilometer} km</p>
                            </div>
                            {discountPrice > 0 &&
                                <p className='font-semibold pl-2 pb-1 text-green-600 text-[0.85rem] flex items-center gap-2'><FaRegCheckCircle /> Applied {discountPrice} off </p>
                            }
                        </div>
                        <div>
                            <div className='flex items-center justify-between rounded rounded-b-none bg-gradient-to-tr from-blue-200 via-blue-100 to-[#e6f7ff]'>
                                <button
                                    onClick={() => setDetailsActive(1)}
                                    className={`flex items-center gap-1 w-full p-2 text-[0.8rem]  justify-center  font-semibold ${detailsActive === 1 ? 'bg-main text-white' : 'bg-transparent'}`}
                                >
                                    {detailsActive === 1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                    Inclusive
                                </button>

                                <button
                                    onClick={() => setDetailsActive(2)}
                                    className={`flex items-center gap-1 p-2 text-[0.8rem] w-full justify-center font-semibold ${detailsActive === 2 ? 'bg-main text-white' : 'bg-transparent'}`}
                                >
                                    {detailsActive === 2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                    Exclusive
                                </button>

                                <button
                                    onClick={() => setDetailsActive(3)}
                                    className={`flex items-center gap-1 p-2 text-[0.8rem] justify-center w-full font-semibold ${detailsActive === 3 ? 'bg-main text-white' : 'bg-transparent'}`}
                                >
                                    {detailsActive === 3 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                    T&C
                                </button>

                            </div>
                            <div className=' text-[#0f0f0f] '>
                                {detailsActive === 3 &&
                                    <div className='text-[0.8rem] p-2 py-4 relative'>

                                        <h3 className='text-[0.9rem] font-semibold '>Terms and Conditions</h3>
                                        {
                                            tcData?.map((data, index) => (
                                                <li className='pl-2 mt-1 leading-4 list-disc' key={index}>{data}</li>
                                            ))
                                        }
                                    </div>
                                }
                                {detailsActive === 2 &&
                                    <div className='text-[0.8rem] p-2 py-4 flex items-start justify-center w-full flex-col gap-3
                                                 relative'>


                                        <div className='flex items-center gap-2'>
                                            <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                                <GiTakeMyMoney className='text-[1.1rem]' />
                                            </div>
                                            <p>Pay &#8377; {cabData?.rates[0]?.extra}/km after {cabData?.rates[0]?.kilometer} km</p>

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
                                {detailsActive === 1 &&
                                    <div className='text-[0.8rem] p-2 py-4 flex flex-col items-start justify-center gap-6 relative'>

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
                    </div>

                    <form onSubmit={handleSubmit} noValidate className='bg-white   flex flex-col  border border-main  min-w-[19.5rem] text-black max-w-[29rem] w-[90vw]  cursor-pointer transition-all duration-500 hover:bg-gradient-to-b  rounded shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'>
                        {currentStep === 1 &&
                            <>
                                <div className='flex items-center gap-2 p-2 rounded rounded-b-none bg-gradient-to-tr from-blue-200 via-blue-100 to-[#e6f7ff]'>
                                    <div className='p-[5px] border-[0.1px] border-black rounded-full size-fit'>
                                        <PiUsersThreeFill className='text-[1.3rem]' />
                                    </div>
                                    <h2 className='font-semibold tracking-wide'>Travelers </h2>

                                </div>
                                <div className='p-2'>
                                    <div className="relative flex flex-col items-center w-full p-1 px-0 mb-1 border-b border-main">
                                        <label className="w-full text-blue-800 text-[0.78rem]">Full name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter full name..."
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-0 tracking-wide bg-transparent outline-none placeholder:text-[#808080] text-[0.95rem]"
                                            required
                                        />
                                    </div>
                                    <div className="relative flex flex-col items-center w-full p-1 px-0 mb-1 border-b border-main">
                                        <label className="w-full text-blue-800 text-[0.78rem]">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter email..."
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-0 tracking-wide bg-transparent outline-none placeholder:text-[#808080] text-[0.95rem]"
                                            required
                                        />
                                    </div>
                                    <div className="relative flex flex-col items-center w-full p-1 px-0 mb-1 border-b border-main">
                                        <label className="w-full text-blue-800 text-[0.78rem]">Phone number</label>
                                        <input
                                            type="number"
                                            name="phoneNumber"
                                            placeholder="Enter phone number..."
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full px-0 tracking-wide bg-transparent outline-none placeholder:text-[#808080] text-[0.95rem]"
                                            required
                                        />
                                    </div>
                                    <div className="relative flex flex-col items-center w-full p-1 px-0 mb-1 border-b border-main">
                                        <label className="w-full text-blue-800 text-[0.78rem]">Pickup address</label>
                                        <input
                                            type="text"
                                            name="pickupAddress"
                                            placeholder="Enter pickup address..."
                                            readOnly

                                            value={pickup}
                                            // onChange={handleChange}
                                            className="w-full px-0 tracking-wide bg-transparent outline-none placeholder:text-[#808080] text-[0.95rem]"
                                            required
                                        />
                                    </div>
                                    <div className="relative flex flex-col items-center w-full p-1 px-0 mb-1 border-b border-main">
                                        <label className="w-full text-blue-800 text-[0.78rem]">Drop address</label>
                                        <input
                                            readOnly
                                            type="text"
                                            name="dropAddress"
                                            placeholder="Enter drop address..."
                                            value={drop}
                                            // onChange={handleChange}
                                            className="w-full px-0 tracking-wide bg-transparent outline-none placeholder:text-[#808080] text-[0.95rem]"
                                            required
                                        />
                                    </div>
                                    {/* <div className='flex gap-1'>
                                <input type="checkbox" onClick={() => setFormData(...formData, declaration = true)} name="" id="" />
                                I accept the terms and conditions
                            </div> */}



                                    <button className='w-full p-2 py-[0.4rem] mt-3 rounded text-white  bg-main' type='submit'>Proceed</button>
                                </div>
                            </>}


                        {currentStep === 2 &&
                            <>
                                <div className='flex items-center gap-2 p-2 rounded rounded-b-none bg-gradient-to-tr from-blue-200 via-blue-100 to-[#e6f7ff] relative'>
                                    <div className='p-[5px] border-[0.1px] border-black rounded-full size-fit'>
                                        <PiUsersThreeFill className='text-[1.3rem]' />
                                    </div>
                                    <h2 className='font-semibold tracking-wide'>Payment Details </h2>
                                    <button className='absolute px-3 py-[0.2rem] text-white rounded right-2 bg-main' onClick={() => setCurrentStep(1)}>Back</button>
                                </div>
                                <div className='p-2'>

                                    {/* <div className='flex gap-1'>
                                <input type="checkbox" onClick={() => setFormData(...formData, declaration = true)} name="" id="" />
                                I accept the terms and conditions
                            </div> */}


                                    <div className="mt-1">
                                        <label className="w-full text-blue-800 text-[0.78rem]">Have a Coupon Code?</label>
                                        <div className="flex items-center gap-2 mt-1 tracking-wide border border-gray-300 rounded bg-transparent outline-none placeholder:text-[#808080] text-[0.95rem]">
                                            <input
                                                type="text"
                                                name="voucherCode"
                                                placeholder="Enter coupon code"
                                                value={formData.voucherCode}
                                                onChange={handleChange}
                                                className="w-full pl-2 font-semibold tracking-wider outline-none"
                                            />

                                            {discountPrice > 0 ?
                                                <p className='font-semibold bg-green-600 text-white p-2 px-4 rounded-r text-[0.85rem] flex items-center gap-2'><FaRegCheckCircle /> Applied  </p>
                                                :
                                                <div

                                                    onClick={(discountPrice > 0 || voucherLoading) ? undefined : handleVoucher}
                                                    className="px-5 py-[0.4rem] bg-main  text-white font-semibold rounded-r hover:bg-blue-600 transition-colors text-[0.85rem]"
                                                >
                                                    {voucherLoading && /* From Uiverse.io by abrahamcalsin */
                                                        <div className="dot-spinner">
                                                            <div className="dot-spinner__dot"></div>
                                                            <div className="dot-spinner__dot"></div>
                                                            <div className="dot-spinner__dot"></div>
                                                            <div className="dot-spinner__dot"></div>
                                                            <div className="dot-spinner__dot"></div>
                                                            <div className="dot-spinner__dot"></div>
                                                            <div className="dot-spinner__dot"></div>
                                                            <div className="dot-spinner__dot"></div>
                                                        </div>}
                                                    {!voucherLoading && discountPrice === 0 && /* From Uiverse.io by abrahamcalsin */
                                                        'Apply'}

                                                </div>}
                                        </div>
                                    </div>


                                    <div className="relative flex-col items-center w-full p-1 px-0 mt-2 mb-1 fle3">
                                        <label className="w-full text-blue-800 text-[0.78rem]">Payment Details</label>

                                        <div className="flex flex-col w-full gap-2 mt-2">
                                            <label className="flex items-center p-2 px-4 text-black border border-gray-400 rounded bg-blue-50">
                                                <input
                                                    type="radio"
                                                    name="paymentMode"
                                                    value="10"
                                                    checked={formData.paymentMode === '10'}
                                                    onChange={handleChange}
                                                    className="hidden mr-2 peer"
                                                />
                                                <span className="flex items-center justify-center w-3 h-3 mt-[0.18rem] mr-1  border border-black rounded-full peer-checked:border-black peer-checked:bg-main"></span>
                                                10%  <FaArrowRight className='ml-2' /> <span className='ml-2 font-semibold tracking-wide'>&#8377;{price10}

                                                </span>
                                                <span className="ml-1">
                                                    for now
                                                </span>
                                            </label>

                                            <label className="flex items-center p-2 px-4 text-black border border-gray-400 rounded bg-blue-50">
                                                <input
                                                    type="radio"
                                                    name="paymentMode"
                                                    value="100"
                                                    checked={formData.paymentMode === '100'}
                                                    onChange={handleChange}
                                                    className="hidden mr-2 peer"
                                                />
                                                <span className="flex items-center justify-center w-3 h-3 mt-[0.18rem] mr-1  border border-black rounded-full peer-checked:border-black peer-checked:bg-main"></span>
                                                100% <FaArrowRight className='ml-2' /> <span className='ml-2 font-semibold tracking-wide'>&#8377;{finalPrice}</span>
                                                <span className='ml-1'> now</span>
                                            </label>
                                        </div>
                                    </div>

                                    {discountPrice > 0 &&
                                        <p className='font-semibold text-green-600 text-[0.85rem] flex items-center gap-2'><FaRegCheckCircle /> Applied {discountPrice} off </p>
                                    }

                                    <label className="flex items-center p-1 px-4 mt-3 text-black border border-gray-400 rounded bg-blue-50">
                                        <input
                                            type="checkbox"
                                            name="gst"
                                            checked={formData.gst || false}  // Handle the checked state for GST
                                            onChange={handleChange}          // Handle the change
                                            className="mt-1 mr-2"
                                        />
                                        Need a invoice with GST?
                                    </label>

                                    <button className='w-full p-2 py-[0.4rem] mt-3 rounded text-white  bg-main' type='submit'>Proceed</button>
                                </div>
                            </>}
                    </form>
                </div>
            </div>
        </div >
    )
}

export default BookAirportCab
