import { useEffect, useState } from 'react'
import { FaArrowRight, FaCar, FaCreditCard, FaSpinner, FaXmark } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import car1 from '../../assets/car1.avif'
import { MdAirlineSeatReclineExtra, MdKeyboardArrowRight, MdLocalParking, MdLuggage } from 'react-icons/md'
import { TbAirConditioning } from 'react-icons/tb'
import { PiUsersThreeFill } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { sendBookingData } from '../../Redux/Slices/localTripSlice'
import { toast } from 'sonner'
import { order, verifyPayment } from '../../Redux/Slices/razorpaySlice'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { GiGasPump, GiTakeMyMoney } from 'react-icons/gi'
import { SiToll } from 'react-icons/si'
import { verifyVoucher } from '../../Redux/Slices/authSlice'
import { FaRegCheckCircle } from 'react-icons/fa'
import bookingDone from "../../assets/icons/bookingDone.avif"
import bookingProgress from "../../assets/icons/bookProgress.avif"
import failed from "../../assets/icons/failed.avif"



const BookCab = () => {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1);
    const [detailsActive, setDetailsActive] = useState(1)
    const [actualPrice, setActualPrice] = useState(0)
    const [showBookingCard, setShowBookingCard] = useState(false)
    const [bookingStatus, setBookingStatus] = useState(0)
    const [successDetail, setSuccessDetail] = useState()
    const dispatch = useDispatch()
    const location = useLocation()


    useEffect(() => {
        if (!location.state) {
            navigate('/')
        }
    }, [])



    const data = location.state

    const cabData = data?.cabData
    const tcData = data?.tcData
    const pickupDate = data?.pickupDate
    const pickupCity = data?.pickupCity
    const totalPrice = data?.totalPrice
    const pickupTime = data?.pickupTime
    const selectedType = data?.selectedType
    const tripType = data?.tripType

    const [finalPrice, setFinalPrice] = useState(Number(totalPrice))
    const [price10, setPrice10] = useState(Number(finalPrice) * 10 / 100)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [voucherLoading, setVoucherLoading] = useState(false)
    const [gstActive, setGstActive] = useState(false)
    const [gstPrice, setGstPrice] = useState(0)

    const [isChange, setIsChange] = useState(false)

    const userData = useSelector((state) => state?.auth)

    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const order_id = useSelector((state) => state?.razorpay?.orderId);

    const [formData, setFormData] = useState({
        cityName: pickupCity,
        tripType: tripType,
        category: cabData?.category?.name,
        pickupDate: pickupDate,
        pickupTime: pickupTime,
        name: userData?.data?.name || "",
        email: userData?.data?.email || "",
        phoneNumber: userData?.data?.phoneNumber || "",
        voucherCode: "",
        pickupAddress: "",
        dropAddress: "",
        distance: selectedType === "8 hrs | 80 km" ? 80 : 120,
        paymentMode: '10',
        actualAmount: totalPrice,
        discountAmount: discountPrice,
        totalAmount: finalPrice,
        gstAmount: gstPrice,
        declaration: false,
        gst: false,
        extraPerKm: cabData?.perKm,
        extraPerHr: cabData?.perHour,
    })

    useEffect(() => {
        setFormData({
            ...formData,
            actualAmount: totalPrice,
            discountAmount: discountPrice,
            totalAmount: finalPrice,
            gstAmount: gstPrice,
        })
    }, [totalPrice, discountPrice, finalPrice, gstPrice])



    const [submitLoading, setSubmitLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState({
        nameMsg: false,
        phoneNumber: false,
        email: false,
        emailPattern: false,
        phonePattern: false,
        pickup: false,
        drop: false,
        voucher: ""
    })


    const formatPickupDate = (dateString) => {

        if (!dateString) return

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

    const handleVoucher = async () => {

        


        if (formData?.paymentMode === '100') {
            setErrorMessage((prev) => ({ ...prev, voucher: "" }))

            setVoucherLoading(true)
            const res = await dispatch(verifyVoucher({
                voucherCode: formData?.voucherCode,
                tripType: "Local Trip"
            }))

            const discount = res?.payload?.discount

            if (!discount) {
                setVoucherLoading(false)
                return setErrorMessage((prev) => ({ ...prev, voucher: "Invalid Coupon code!" }))
            }

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


        } else {
            return setErrorMessage((prev) => ({ ...prev, voucher: "Voucher is available for 100% payment!" }))
        }
    }

    useEffect(() => {
        setErrorMessage((prev) => ({ ...prev, voucher: "" }))
        if (discountPrice > 0) {

            setFinalPrice(Number(finalPrice) + Number(discountPrice))
            setDiscountPrice(0)
        }
    }, [formData?.voucherCode])

    const handleVoucherCut = () => {
        setFormData((prev) => ({ ...prev, voucherCode: "" }))
        setErrorMessage((prev) => ({ ...prev, voucher: "" }))

        if (discountPrice > 0) {
            setFinalPrice(Number(finalPrice) + Number(discountPrice))
            setDiscountPrice(0)
        }
    }


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value, // Handle checkbox separately
        });

        setIsChange(true)


    };

    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_order_id: "",
        razorpay_signature: ""
    };


    const handleGst = () => {
        const gst = totalPrice * 5 / 100
        if (formData.gst) {
            setFinalPrice((Number(gst) + Number(finalPrice)))
            setGstActive(true)
            setGstPrice(gst)

        }

        if (gstActive) {
            setFinalPrice((Number(finalPrice) - Number(gst)))
            setGstActive(false)
            setGstPrice(gst)

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

        // Parse pickup time in 12-hour format
        const [time, period] = pickupTime.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        const adjustedHours = period === 'PM' ? (hours % 12) + 12 : hours % 12;

        // Set the pickup time on the pickup date
        pickupDateTime.setHours(adjustedHours, minutes, 0, 0);




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







    useEffect(() => {
        setPrice10(Number(finalPrice) * 10 / 100)

    }, [finalPrice, discountPrice, gstActive, formData.paymentMode])

    useEffect(() => {

        const paymentMode = Number(formData?.paymentMode);
        setActualPrice(paymentMode === 10 ? price10 : finalPrice)
    }, [formData.paymentMode, finalPrice, discountPrice, price10, actualPrice, formData?.gst, gstActive])



    useEffect(() => {

        if (actualPrice > 0) {

            dispatch(order({ amount: actualPrice, forName: "Airport" }));
        }
    }, [actualPrice, dispatch]);





    useEffect(() => {

    
        setFormData((prev) => ({ ...prev, voucherCode: "" }))
        setErrorMessage((prev) => ({ ...prev, voucher: "" }))

        if (discountPrice > 0) {
            setFinalPrice(Number(finalPrice) + Number(discountPrice))
            setDiscountPrice(0)
        }


    }, [formData?.paymentMode])



    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        const { cityName, tripType, category, pickupDate, pickupTime, name, email, phoneNumber, pickupAddress, dropAddress, paymentMode, distance } = formData

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phonePattern = /^[6-9]\d{9}$/;

        if (currentStep === 1) {

            let hasError = false;

            if (!name) {


                setErrorMessage((prev) => ({ ...prev, nameMsg: true }));


                hasError = true;
            }

            if (!email) {
                setErrorMessage((prev) => ({ ...prev, email: true }));
                hasError = true;
            }

            if (!emailPattern.test(email)) {

                console.log("email pattern is:-", emailPattern.test(email));

                setErrorMessage((prev) => ({ ...prev, emailPattern: true }));
                console.log(errorMessage);

                hasError = true;
            }

            if (!phoneNumber) {

                setErrorMessage((prev) => ({ ...prev, phoneNumber: true }));
                hasError = true;
            }

            if (!phonePattern.test(phoneNumber)) {


                setErrorMessage((prev) => ({ ...prev, phonePattern: true }));
                console.log(errorMessage);

                hasError = true;
            }

            if (!pickupAddress) {
                setErrorMessage((prev) => ({ ...prev, pickup: true }));
                hasError = true;
            }

            if (!dropAddress) {
                setErrorMessage((prev) => ({ ...prev, drop: true }));
                hasError = true;
            }

            // Return early if there are errors
            if (hasError) return;


            if (!cityName || !tripType || !category || !pickupDate || !pickupTime || !distance) {
                return navigate('/home')
            }

            checkPickupDate(pickupDate)

            if (checkPickupTime(pickupDate, pickupTime)) {
                navigate('/')
                return toast.error("Pickup time is expired!")
            }

            return setCurrentStep(2)
        }

        setSubmitLoading(true)

        checkPickupDate(pickupDate)

        if (checkPickupTime(pickupDate, pickupTime)) {
            setSubmitLoading(false)

            navigate('/')
            return toast.error("Pickup time is expired!")
        }

        const options = {
            key: razorpayKey,
            amount: finalPrice * 100,
            currency: "INR",
            name: "UCS CAB",
            description: "",
            image: "",
            order_id: order_id,
            handler: async function (res) {
                paymentDetails.razorpay_payment_id = res.razorpay_payment_id;
                paymentDetails.razorpay_order_id = res.razorpay_order_id;
                paymentDetails.razorpay_signature = res.razorpay_signature;
                setShowBookingCard(true)
                setBookingStatus(0)
                const response = await dispatch(verifyPayment(paymentDetails));
                if (response?.payload?.success) {
                    const res = await dispatch(sendBookingData(formData))

                    if (res?.payload?.success) {
                        setBookingStatus(1)
                        setSuccessDetail(res?.payload?.data)
                    } else {
                        setBookingStatus(2)
                    }
                } else {
                    setBookingStatus(3)
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
        setTimeout(() => {
            setSubmitLoading(false)
            paymentObject.open();
        }, 4000);


    }













    return (
        <div className='flex flex-wrap  items-start justify-center min-h-[90vh] p-4 py-8 bg-gray-100'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <div className='mb-6'>
                    <h1 className='text-[1.7rem] mb-2 leading-8  font-bold'>Book your journey</h1>
                    <div className='flex items-center gap-1'>
                        <div className='w-[6rem] h-[0.32rem] rounded bg-main'>

                        </div>
                        <div className='w-[4rem] h-[0.32rem] rounded bg-main'>

                        </div>
                        <div className='w-[1rem] h-[0.32rem] rounded bg-main'>

                        </div>
                        <div className='w-[0.35rem] h-[0.32rem] rounded bg-main'>

                        </div>
                    </div>
                </div>
                <div className='flex flex-row-reverse flex-wrap items-start justify-center gap-4'>
                    <div className="bg-white flex flex-col min-w-[19.5rem] max-w-[33rem] w-[90vw] text-black hover:bg-gradient-to-b hover:from-[#f3fbff] hover:to-[#f8fafc] cursor-pointer transition-all duration-500 border border-gray-300 hover:border-blue-400 rounded-lg shadow-md overflow-hidden">
                        {/* Header Section */}
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-tr from-blue-200 via-blue-100 to-[#e6f7ff] rounded-t-lg">
                            <div className="p-2 border border-gray-400 rounded-full">
                                <FaCar className="text-xl" />
                            </div>
                            <div>
                                <div className="flex items-center text-lg sm:text-[1.3rem] font-semibold">
                                    <h2>{pickupCity}</h2>
                                    <MdKeyboardArrowRight className="mx-1 text-2xl" />
                                    <h2>{pickupCity}</h2>
                                </div>
                                <p className="text-sm font-semibold text-gray-600">
                                    {formatPickupDate(pickupDate)} <span>{pickupTime}</span>
                                </p>
                            </div>
                        </div>

                        {/* Car Details */}
                        <div className="flex gap-3 p-4">
                            <img
                                src={cabData?.category?.photo?.secure_url || car1}
                                className="min-w-[7.1rem] object-cover h-[5rem] rounded-md"
                                alt="Car"
                            />
                            <div>
                                <h2 className="text-lg font-semibold sm:text-[1.3rem]">{cabData?.category?.name}</h2>
                                <div className="flex flex-wrap gap-3 mt-2 text-sm sm:text-[0.95rem] sm:text-[1.07rem] md:text-[1.1rem] text-gray-700">
                                    <div className="flex items-center gap-1">
                                        <MdLuggage />
                                        <p>{cabData?.category?.numberOfBags} luggage</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MdAirlineSeatReclineExtra />
                                        <p>{cabData?.category?.numberOfSeats} seats</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <TbAirConditioning />
                                        <p>{cabData?.category?.acAvailable ? "AC" : "NON AC"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trip Info and Fare */}
                        <div className="px-4 py-2 text-sm sm:text-[0.98rem] space-y-2">
                            <div className="flex items-center">
                                <h3 className="font-semibold">Trip Type:</h3>
                                <span className="ml-2">{tripType} ({selectedType})</span>
                            </div>
                            <div className="flex items-center mt-1">
                                <h3 className="font-semibold">Total Fare:</h3>
                                <p className="ml-2">&#8377; {Math.ceil(finalPrice)}</p>
                            </div>
                            {discountPrice > 0 && (
                                <p className="flex items-center gap-2 mt-1 font-semibold text-green-600">
                                    <FaRegCheckCircle /> Applied {discountPrice} off
                                </p>
                            )}
                        </div>

                        {/* Section Tabs */}
                        <div className="flex items-center justify-between mt-2 bg-gradient-to-tr from-blue-200 via-blue-100 to-[#e6f7ff] rounded-b-lg">
                            <button
                                onClick={() => setDetailsActive(1)}
                                className={`flex items-center gap-2 w-full justify-center py-2 text-sm font-semibold ${detailsActive === 1 ? 'bg-main text-white' : 'bg-transparent'}`}
                            >
                                {detailsActive === 1 ? <IoIosArrowUp /> : <IoIosArrowDown />} Inclusive
                            </button>
                            <button
                                onClick={() => setDetailsActive(2)}
                                className={`flex items-center gap-2 w-full justify-center py-2 text-sm font-semibold ${detailsActive === 2 ? 'bg-main text-white' : 'bg-transparent'}`}
                            >
                                {detailsActive === 2 ? <IoIosArrowUp /> : <IoIosArrowDown />} Exclusive
                            </button>
                            <button
                                onClick={() => setDetailsActive(3)}
                                className={`flex items-center gap-2 w-full justify-center py-2 text-sm font-semibold ${detailsActive === 3 ? 'bg-main text-white' : 'bg-transparent'}`}
                            >
                                {detailsActive === 3 ? <IoIosArrowUp /> : <IoIosArrowDown />} T&C
                            </button>
                        </div>

                        <div className="text-[#0f0f0f] px-4 py-2">
                            {detailsActive === 1 && (
                                <div className="text-[0.8rem] flex flex-col items-start gap-2">
                                    {/* <div className="flex items-center gap-2">
                                        <div className="p-[6px] border-[0.1px] border-black rounded-full">
                                            <IoDocumentText className="text-[1.1rem]" />
                                        </div>
                                        <p>GST charges (5%)</p>
                                    </div> */}
                                    <div className="flex items-center gap-2">
                                        <div className="p-[6px] border-[0.1px] border-black rounded-full">
                                            <GiGasPump className="text-[1.1rem]" />
                                        </div>
                                        <p>Base Fare</p>
                                    </div>
                                </div>
                            )}

                            {detailsActive === 2 && (
                                <div className="text-[0.8rem] flex flex-col items-start gap-3">
                                    <div className='flex items-center gap-2'>
                                        <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                            <GiTakeMyMoney className='text-[1.1rem]' />
                                        </div>
                                        <p>Pay &#8377; {cabData?.perKm}/km after 80 km</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div className='p-[5.5px] border-[0.1px] border-black rounded-full size-fit'>
                                            <MdLocalParking className='text-[1.15rem]' />

                                        </div>
                                        <p>Parking</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div className='p-[6px] border-[0.1px] border-black rounded-full size-fit'>
                                            <GiTakeMyMoney className='text-[1.1rem]' />

                                        </div>

                                        <p>Pay &#8377; {cabData?.perHour}/hr after 8 hr</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div className='p-[3px] border-[0.1px] border-black rounded-full size-fit'>
                                            <SiToll className='text-[1.4rem]' />

                                        </div>

                                        <p>Toll/State tax</p>
                                    </div>

                                </div>
                            )}

                            {detailsActive === 3 && (
                                <div className="text-[0.8rem]">
                                    <h3 className="text-[0.9rem] font-semibold">Terms and Conditions</h3>
                                    {tcData?.map((data, index) => (
                                        <li className="pl-2 mt-1 leading-4 list-disc" key={index}>{data}</li>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>



                    <form onSubmit={handleSubmit} noValidate className='bg-white  pb-6 flex flex-col  border border-main  min-w-[19.5rem] text-black max-w-[33rem] w-[90vw]  cursor-pointer transition-all duration-500 hover:bg-gradient-to-b  rounded shadow-[0px_5px_10px_-6px_#808080] overflow-hidden'>
                        {currentStep === 1 &&
                            <>
                                <div className='flex items-center gap-2 p-3 py-5 rounded rounded-b-none bg-gradient-to-tr from-blue-200 via-blue-100 to-[#e6f7ff]'>
                                    <div className='p-[5px] border-[0.1px] border-black rounded-full size-fit'>
                                        <PiUsersThreeFill className='text-[1.3rem]' />
                                    </div>
                                    <h2 className='font-semibold tracking-wide sm:text-[1.3rem]'>Customer Details </h2>

                                </div>
                                <div className='p-2 space-y-2'>
                                    <div>
                                        <div className={`relative flex flex-col items-center w-full p-1 px-0 border-b ${!formData?.name && errorMessage?.nameMsg ? 'border-red-500' : 'border-main'}`}>
                                            <label className="w-full text-blue-800 text-[0.8rem] sm:text-[0.95rem] font-semibold">Full name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Enter full name..."
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-0 tracking-wide bg-transparent outline-none placeholder:text-[#808080] text-[0.95rem] sm:text-[1.07rem] md:text-[1.1rem]"
                                                required
                                            />
                                        </div>
                                        {!formData?.name && errorMessage?.nameMsg &&
                                            <p className='text-[0.78rem] text-left w-full leading-3 pt-[0.1rem] text-red-500'>*Full name is required!</p>}

                                    </div>
                                    <div>
                                        <div className={`relative flex flex-col items-center w-full p-1 px-0 border-b ${!formData?.email && errorMessage?.email ? 'border-red-500' : 'border-main'}`}>

                                            <label className="w-full text-blue-800 text-[0.8rem] sm:text-[0.95rem] font-semibold">Email</label>

                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter email..."
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-0 tracking-wide bg-transparent outline-none placeholder:text-[#808080] text-[0.95rem] sm:text-[1.07rem] md:text-[1.1rem]"
                                                required
                                            />
                                        </div>
                                        {!formData?.email && errorMessage?.email &&
                                            <p className='text-[0.78rem] text-left w-full leading-3 pt-[0.1rem] text-red-500'>*Email is required!</p>}

                                        {errorMessage?.emailPattern &&
                                            <p className='text-[0.78rem] text-left w-full leading-3 pt-[0.1rem] text-red-500'>*Email is Not Valid!</p>}

                                    </div>
                                    <div>
                                        <div className={`relative flex flex-col items-center w-full p-1 px-0 border-b ${!formData?.phoneNumber && errorMessage?.phoneNumber ? 'border-red-500' : 'border-main'}`}>
                                            <label className="w-full text-blue-800 text-[0.8rem] sm:text-[0.95rem] font-semibold">Phone number</label>
                                            <input
                                                type="number"
                                                name="phoneNumber"
                                                placeholder="Enter phone number..."
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                className="w-full px-0 tracking-wide bg-transparent outline-none placeholder:text-[#808080] text-[0.95rem] sm:text-[1.07rem] md:text-[1.1rem]"
                                                required
                                            />
                                        </div>
                                        {!formData?.phoneNumber && errorMessage?.phoneNumber &&
                                            <p className='text-[0.78rem] text-left w-full leading-3 pt-[0.1rem] text-red-500'>*Phone number is required!</p>}

                                        {errorMessage?.phonePattern &&
                                            <p className='text-[0.78rem] text-left w-full leading-3 pt-[0.1rem] text-red-500'>*Phone is not valid start with 6 to 9 and having 10 digit!</p>}

                                    </div>
                                    <div>
                                        <div className={`relative flex flex-col items-center w-full p-1 px-0 border-b ${!formData?.pickupAddress && errorMessage?.pickup ? 'border-red-500' : 'border-main'}`}>
                                            <label className="w-full text-blue-800 text-[0.8rem] sm:text-[0.95rem] font-semibold">Pickup address</label>
                                            <input
                                                type="text"
                                                name="pickupAddress"
                                                placeholder="Enter pickup address..."
                                                value={formData.pickupAddress}
                                                onChange={handleChange}
                                                className="w-full px-0 tracking-wide bg-transparent outline-none placeholder:text-[#808080] text-[0.95rem] sm:text-[1.07rem] md:text-[1.1rem]"
                                                required
                                            />
                                        </div>
                                        {!formData?.pickupAddress && errorMessage?.pickup &&
                                            <p className='text-[0.78rem] text-left w-full leading-3 pt-[0.1rem] text-red-500'>*Pickup address is required!</p>}

                                    </div>
                                    <div>
                                        <div className={`relative flex flex-col items-center w-full p-1 px-0 border-b ${!formData?.dropAddress && errorMessage?.drop ? 'border-red-500' : 'border-main'}`}>
                                            <label className="w-full text-blue-800 text-[0.8rem] sm:text-[0.95rem] font-semibold">Drop address</label>
                                            <input
                                                type="text"
                                                name="dropAddress"
                                                placeholder="Enter drop address..."
                                                value={formData.dropAddress}
                                                onChange={handleChange}
                                                className="w-full px-0 tracking-wide bg-transparent outline-none placeholder:text-[#808080] text-[0.95rem] sm:text-[1.07rem] md:text-[1.1rem]"
                                                required
                                            />
                                        </div>
                                        {!formData?.dropAddress && errorMessage?.drop &&
                                            <p className='text-[0.78rem] text-left w-full leading-3 pt-[0.1rem] text-red-500'>*Drop address is required!</p>}

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
                                <div className='flex items-center gap-2 p-3 py-5 rounded rounded-b-none bg-gradient-to-tr from-blue-200 via-blue-100 to-[#e6f7ff] relative'>
                                    <div className='p-[5px] border-[0.1px] border-black rounded-full size-fit'>
                                        <PiUsersThreeFill className='text-[1.3rem]' />
                                    </div>
                                    <h2 className='font-semibold tracking-wide sm:text-[1.3rem]'>Payment Details </h2>
                                    <button className='absolute px-3 py-[0.2rem] text-white rounded right-2 bg-main' onClick={() => setCurrentStep(1)}>Back</button>
                                </div>
                                <div className='p-2'>

                                    {/* <div className='flex gap-1'>
                                <input type="checkbox" onClick={() => setFormData(...formData, declaration = true)} name="" id="" />
                                I accept the terms and conditions
                            </div> */}


                                    <div className="relative flex-col items-center w-full p-1 px-0 mt-2 mb-1 fle3">
                                        <label className="w-full text-blue-800 text-[0.8rem] sm:text-[0.95rem] font-semibold">Payment Details</label>

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
                                                10%  <FaArrowRight className='ml-2' /> <span className='ml-2 font-semibold tracking-wide'>&#8377;{price10.toFixed(2)}

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
                                                100% <FaArrowRight className='ml-2' /> <span className='ml-2 font-semibold tracking-wide'>&#8377;{finalPrice.toFixed(2)}</span>
                                                <span className='ml-1'> now</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label className="w-full text-blue-800 text-[0.8rem] sm:text-[0.95rem] font-semibold">Have a Coupon Code?</label>
                                        <div className="flex items-center gap-2 mt-1 tracking-wide border border-gray-300 rounded bg-transparent outline-none placeholder:text-[#808080] text-[0.95rem] sm:text-[1.07rem] md:text-[1.1rem]">
                                            <input
                                                type="text"
                                                name="voucherCode"
                                                placeholder="Enter coupon code"
                                                value={formData.voucherCode}
                                                onChange={handleChange}
                                                className="w-full pl-2 font-semibold tracking-wider outline-none"
                                            />

                                            {formData?.voucherCode &&
                                                <div onClick={handleVoucherCut} className='p-[0.15rem] border border-red-500 rounded-full text-[0.7rem]'>
                                                    <FaXmark />
                                                </div>
                                            }
                                            {discountPrice > 0 ?
                                                <p className='font-semibold bg-green-600 text-white p-2 px-4 rounded-r text-[0.85rem] flex items-center gap-2'><FaRegCheckCircle /> Applied  </p>
                                                :
                                                <div

                                                    onClick={(discountPrice > 0 || voucherLoading) ? undefined : handleVoucher}
                                                    className="px-5 py-[0.6rem] bg-main  text-white font-semibold rounded-r hover:bg-blue-600 transition-colors text-[0.85rem]"
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

                                    {discountPrice > 0 &&
                                        <p className='font-semibold text-green-600 text-[0.85rem] flex items-center gap-2'><FaRegCheckCircle /> Applied {discountPrice} off </p>
                                    }
                                    {errorMessage?.voucher &&
                                        <p className=' text-red-600 text-[0.8rem] flex items-center gap-2'>{errorMessage?.voucher}</p>
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
                                    <button disabled={submitLoading} className='w-full p-2 py-[0.4rem] mt-5  rounded text-white  bg-main' type='submit'>{submitLoading ?
                                        <FaSpinner className="mx-auto text-2xl w-fit animate-spin" /> :
                                        "Proceed"
                                    }</button>
                                </div>
                            </>}
                    </form>


                </div>
            </div>
            {showBookingCard &&
                <div className='fixed top-0 w-full'>
                    {bookingStatus === 0 &&
                        <div className="flex items-center justify-center min-h-screen p-2 bg-gradient-to-br from-blue-100 to-blue-300">
                            <div className="flex flex-col items-center w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
                                {/* Header */}
                                <div className="flex flex-col items-center mb-4">
                                    <img src={bookingProgress} className='w-[5.5rem]' alt="icon" />

                                    <h2 className="text-[1.3rem] font-semibold text-gray-900">Booking In Progress</h2>
                                    <p className="text-sm text-gray-500">Please wait while we confirm your booking</p>
                                </div>

                                {/* Progress Indicator */}
                                <div className="w-full h-2 mb-4 bg-gray-200 rounded-full">
                                    <div className="w-2/3 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                </div>

                                {/* Loading Spinner */}
                                <div className="flex items-center gap-2 text-blue-500">
                                    <FaSpinner className="text-2xl animate-spin" />
                                    <span className="text-gray-600">Processing...</span>
                                </div>
                            </div>
                        </div>}
                    {bookingStatus === 1 &&
                        <div className="flex items-center justify-center min-h-screen p-2 bg-gradient-to-br from-green-100 to-green-300">
                            <div className="flex flex-col items-center w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
                                {/* Header */}
                                <div className="flex flex-col items-center mb-4 text-center">
                                    <img src={bookingDone} className='w-[4.5rem]' alt="icon" />
                                    <h2 className="text-[1.3rem] font-semibold text-gray-900">Booking Completed</h2>
                                    <p className="text-sm text-gray-500">Your booking has been successfully processed.</p>
                                </div>

                                <div className='font-semibold'>
                                    <p><span className='font-normal text-[0.95rem] mr-[0.55rem]'>Booking id </span>: {successDetail?.bookingId}</p>
                                    <p><span className='font-normal text-[0.95rem] mr-[0.05rem]'>Pickup Date </span> : {successDetail?.pickupDate.split('T')[0]}</p>
                                    <p><span className='font-normal text-[0.95rem]'>Pickup Time </span> : {successDetail?.pickupTime}</p>
                                </div>

                                {/* Confirmation Message */}
                                <div className="flex items-center gap-2 pt-2 text-green-500">
                                    <span className="text-gray-600">Thank you for booking with us!</span>
                                </div>
                                {userData?.data?._id ?
                                    <button className='px-5 py-[0.25rem] rounded mt-2 text-green-700 bg-green-100 border border-green-700' onClick={() => navigate(`/booking/${userData?.data?._id}`)}>View bookings</button>
                                    :
                                    <p className='pt-1 text-center'>
                                        Please Login to your account to download invoice and track your booking
                                    </p>}

                            </div>
                        </div>
                    }
                    {bookingStatus === 2 &&
                        <div className="flex items-center justify-center min-h-screen p-2 bg-gradient-to-br from-red-100 to-red-300">
                            <div className="flex flex-col items-center w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
                                {/* Header */}
                                <div className="flex flex-col items-center mb-4">
                                    <img src={failed} className='w-[4.5rem]' alt="icon" />

                                    <h2 className="text-xl font-semibold text-gray-700">Booking Failed</h2>
                                    <p className="text-sm text-gray-500">Something went wrong with your booking.</p>
                                </div>

                                {/* Failure Message */}
                                <div className="w-full h-2 mb-4 bg-red-200 rounded-full">
                                    <div className="w-full h-2 bg-red-500 rounded-full"></div>
                                </div>

                                {/* Instructions */}
                                <div className="flex flex-col items-center gap-2 mb-4">
                                    <p className="text-center text-gray-600">
                                        Please try again or contact support if the payment has been deducted.
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className='flex flex-row items-center justify-center gap-2'>
                                        <button onClick={() => setShowBookingCard(false)} className="px-4 py-2 text-white transition bg-red-500 rounded-md hover:bg-red-600">
                                            Retry
                                        </button>
                                        <button onClick={() => navigate('/')} className="px-4 py-2 text-white transition bg-red-500 rounded-md hover:bg-red-600">
                                            Home
                                        </button>
                                    </div>
                                    <Link to={'/contact'}
                                        className="mt-2 text-red-500 hover:underline"
                                    >
                                        Contact Support
                                    </Link>
                                </div>
                            </div>
                        </div>}

                    {bookingStatus === 3 &&
                        <div className="flex items-center justify-center min-h-screen p-2 bg-gradient-to-br from-gray-100 to-gray-300">
                            <div className="flex flex-col items-center w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
                                {/* Header */}
                                <div className="flex flex-col items-center mb-4">
                                    <img src={failed} className='w-[4.5rem]' alt="icon" />

                                    <h2 className="text-xl font-semibold text-gray-700">Payment Failed</h2>
                                    <p className="text-sm text-gray-500">There was an issue processing your payment.</p>
                                </div>

                                {/* Icon and Message */}
                                <div className="flex flex-col items-center gap-4 mb-4">
                                    <FaCreditCard className="text-3xl text-gray-600" />
                                    <p className="text-center text-gray-600">
                                        We couldn’t process your payment. Please check your payment details or try again.
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col items-center gap-4 mb-4">
                                    <button onClick={() => setShowBookingCard(false)} className="px-4 py-2 text-white transition bg-yellow-500 rounded-md hover:bg-yellow-600">
                                        Retry Payment
                                    </button>
                                    <Link to={'/contact'}
                                        className="mt-2 text-yellow-500 hover:underline"
                                    >
                                        Contact Support
                                    </Link>
                                </div>
                            </div>
                        </div>}
                </div>}
        </div >
    )
}

export default BookCab
