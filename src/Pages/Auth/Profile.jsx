import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FaBars, FaClipboardList, FaDownload, FaSignOutAlt, FaCamera, FaCheckCircle } from 'react-icons/fa';
import userImg from '../../assets/car1.avif'; // Replace with your asset paths
import profileBg from '../../assets/car2.avif';
import { FaCalendarCheck, FaHourglassHalf, FaLock } from 'react-icons/fa6';
import { allBookings, allTC, cancelBooking, changePassword, downloadInvoice, editProfile, logout, userProfile } from '../../Redux/Slices/authSlice';
import { FaIndianRupeeSign, FaLocationDot, FaUserCheck, FaXmark } from 'react-icons/fa6'
import { AiOutlineCheck, AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineCloseCircle, AiOutlineSync } from 'react-icons/ai'
import { FaCar } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion';
import car1 from '../../assets/car1.avif'
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import logo from '../../assets/logo.avif'


const Profile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [eye, setEye] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
    const data = useSelector((state) => state?.auth?.data);
    const [loaderActive, setLoaderActive] = useState(false);
    const [sideActive, setSideActive] = useState(1)
    const [bookingData, setBookingData] = useState()
    const [item, setItem] = useState(null);
    const [active, setActive] = useState(false)
    const [passwordCardActive, setPasswordCardActive] = useState(false)

    const [localTC, setLocalTC] = useState([]);
    const [airportTC, setAirportTC] = useState([]);
    const [roundTC, setRoundTC] = useState([]);
    const [onewayTC, setOnewayTC] = useState([]);

    console.log(localTC)
    console.log(airportTC)
    console.log(roundTC)
    console.log(localTC)




    const setTripTypeData = (tripType, tC) => {
        switch (tripType) {
            case 'local':
                setLocalTC(tC?.map(data => data?.text));
                break;
            case 'airpot':
                setAirportTC(tC?.map(data => data?.text));
                break;
            case 'round':
                setRoundTC(tC?.map(data => data?.text));
                break;
            case 'oneway':
                setOnewayTC(tC?.map(data => data?.text));
                break;
            default:
                break;
        }
    };

    const fetchTcData = async () => {
        const res = await dispatch(allTC())
        console.log(res)
        console.log(res?.payload?.data?.data)
        if (res?.payload?.data?.data && res?.payload?.data?.data.length) {
            res?.payload?.data?.data.forEach(trip => {
                setTripTypeData(trip.tripType, trip.tC);
            });
        }
    }

    useEffect(() => {
        fetchTcData()
    }, [])

    const handleLogout = async () => {
        const res = await dispatch(logout());
        if (res?.payload?.success) {
            navigate('/');
            toast.success("Logged out!");
        }
    };

    const [profileData, setProfileData] = useState({
        userName: data?.userName || "",
        name: data?.name || "",
        email: data?.email || "",
        avatar: "",
        phoneNumber: data?.phoneNumber || "",
        address: data?.address || ""
    });

    const download = async (invoiceId) => {
        const res = await dispatch(downloadInvoice({ invoiceId }))
    }

    const fetchBookingDetails = async () => {
        const id = data?._id
        const res = await dispatch(allBookings({ id }))
        setBookingData(res?.payload?.bookingHistory.reverse())
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

    useEffect(() => {
        const hasChanged = profileData.userName !== data?.userName || profileData.name !== data?.name || profileData.avatar !== '' || profileData.phoneNumber !== data?.phoneNumber;
        setIsUpdated(hasChanged);
    }, [profileData, data]);

    const imgUpload = (e) => {
        e.preventDefault();
        const uploadedImg = e.target.files[0];
        if (uploadedImg) {
            setProfileData({ ...profileData, avatar: uploadedImg });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImg);
            fileReader.addEventListener('load', function () {
                setImage(this.result);
            });
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };
    const handleFormInput = async (e) => {
        e.preventDefault();

        const { name, email, phoneNumber, address } = profileData;

        if (!name || !email || !phoneNumber) {
            return toast.error("All fields are required");
        }

        if (!email.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
            return toast.error('Email is Invalid!');
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phoneNumber', phoneNumber);
        formData.append('address', address);
        formData.append('avatar', profileData.avatar);

        const response = await dispatch(editProfile([data?._id, formData]));

        if (response?.payload?.success) {
            toast.success("Updated!");
            setLoaderActive(false);
            dispatch(userProfile());
        } else {
            setLoaderActive(false)
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        id: data?._id
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmNewPassword } = passwordData;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            setLoaderActive(false)
            return toast.error('Please fill in all fields');
        }

        if (newPassword !== confirmNewPassword) {
            setLoaderActive(false)
            return toast.error('Passwords do not match');
        }

        const response = await dispatch(changePassword(passwordData));

        if (response?.payload?.success) {
            setPasswordData({
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            });
            setLoaderActive(false)
            setPasswordCardActive(false)

        } else {
            setLoaderActive(false)
        }
    };

    const handleEyeClick = () => {
        setEye(!eye)
    }

    const mainDiv = 'relative mb-3 border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center';
    const labelStyle = "w-full  text-light   text-[0.8rem]";
    const inputStyle = "w-full p-[0.1rem] tracking-wide bg-transparent outline-none placeholder:text-[#808080]";
    const disabledInputStyle = "w-full p-[0.1rem] tracking-wide bg-transparent outline-none placeholder:text-[#808080]";


    return (
        <div className="flex flex-col items-center justify-center min-h-screen overflow-x-hidden">


            {/* Main Content */}
            <div className="flex-1 pt-4 max-w-[55rem] p-2   w-full flex">
                {/* Sidebar */}


                {/* Profile Form */}
                <div className={`flex-1 shadow-[0px_0px_5px_#808080]  bg-gray-50 rounded-md relative h-fit  transition-all duration-300`}>

                    <div className='relative w-full z-[50]'>
                        <img className='w-full h-[8rem] shadow-[0px_5px_15px_-5px_#808080] rounded object-cover' src={profileBg} alt="profile background" />
                        <div className='absolute bottom-[-1.8rem] left-4'>
                            <label htmlFor="image_uploads" className='cursor-pointer'>
                                {image ? (
                                    <img src={image} alt="icon" className='size-[6.5rem] border-[2px] border-[#FFB827] rounded-full' />
                                ) : (
                                    <img src={(!data?.avatar?.secure_url ? userImg : data?.avatar?.secure_url)} alt="icon" className='size-[6.5rem] border-[3px] bg-white border-white rounded-full shadow-[0px_5px_15px_-5px_#808080]' />
                                )}
                            </label>
                            <div className='relative'>
                                <input onChange={imgUpload} type="file" id='image_uploads' name='image_uploads' className='hidden' accept='.jpg, .jpeg, .png, .svg' />
                                <label htmlFor="image_uploads" className='absolute bottom-1 right-0 p-2 bg-[#FFB827] text-white text-xl font-semibold border-[3px] border-white rounded-full cursor-pointer shadow-[0px_5px_15px_-5px_#808080]'>
                                    <FaCamera />
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className='flex w-full h-full'>
                        <div className={`relative overflow-hidden top-0 left-0 bg-sky-50 min-h-full ${sidebarOpen ? 'min-w-[15rem]' : 'max-w-[2.8rem] min-w-[2.7rem]'} p-1 transition-transform transform z-40 shadow-lg md:min-w-[15rem] md:transform-none md:transition-none`}>
                            <ul className="pt-[3.2rem] space-y-4">
                                {/* Hamburger Menu Button (Visible on small screens only) */}
                                <div onClick={toggleSidebar} className={`text-[1.1rem] p-2 cursor-pointer bg-[#FFB827] text-white rounded-lg shadow-lg md:hidden`}>
                                    <FaBars />
                                </div>
                                <li onClick={() => setSideActive(1)} className={`flex items-center cursor-pointer p-2 space-x-2 font-semibold ${sideActive === 1 ? 'bg-gray-200 text-main' : 'bg-white text-gray-700'} rounded-lg`}>
                                    <FaClipboardList size={20} />
                                    <span className={`ml-2 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>Profile</span>
                                </li>
                                <li onClick={() => setSideActive(2)} className={`flex items-center cursor-pointer p-2 space-x-2 font-semibold ${sideActive === 2 ? 'bg-gray-200 text-main' : 'bg-white text-gray-700'} rounded-lg`}>
                                    <FaCalendarCheck size={20} />
                                    <span className={`ml-2 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>Confirmed bookings</span>
                                </li>

                                <li onClick={() => setSideActive(4)} className={`flex items-center cursor-pointer p-2 space-x-2 font-semibold ${sideActive === 4 ? 'bg-gray-200 text-main' : 'bg-white text-gray-700'} rounded-lg`}>
                                    <FaHourglassHalf size={20} />
                                    <span className={`ml-2 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>Ongoing booking</span>
                                </li>
                                <li onClick={() => setSideActive(5)} className={`flex items-center cursor-pointer p-2 space-x-2 font-semibold ${sideActive === 5 ? 'bg-gray-200 text-main' : 'bg-white text-gray-700'} rounded-lg`}>
                                    <FaCheckCircle size={20} />
                                    <span className={`ml-2 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>Completed booking</span>
                                </li>
                                <li onClick={() => setSideActive(3)} className={`flex items-center cursor-pointer p-2 space-x-2 font-semibold ${sideActive === 3 ? 'bg-gray-200 text-main' : 'bg-white text-gray-700'} rounded-lg`}>
                                    <FaLock size={20} />
                                    <span className={`ml-2 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>Change Password</span>
                                </li>
                                <li
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to logout?')) {
                                            handleLogout(); // Call the logout function if confirmed
                                        }
                                        // If canceled, do nothing
                                    }}
                                    className={`flex items-center cursor-pointer p-2 space-x-2 font-semibold ${sideActive === 6 ? 'bg-gray-200 text-main' : 'bg-white text-gray-700'} rounded-lg`}
                                >
                                    <FaSignOutAlt size={20} />
                                    <span className={`ml-2 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>Logout</span>
                                </li>


                            </ul>
                        </div>

                        {/* Form Inputs */}
                        {sideActive === 1 &&
                            <form noValidate onSubmit={handleFormInput} className='flex flex-col items-start justify-center w-full p-3 text-black rounded-lg shadow-lg '>

                                <div className='flex items-start mt-8 md:mt-16 justify-start w-full min-h-[55vh] ml-2 '>
                                    <div className='flex flex-col items-start justify-center w-full p-3 text-black rounded-lg '>
                                        <h2 className='text-[1.25rem] font-bold mb-3'>Profile</h2>
                                        <div className={mainDiv}>
                                            <label htmlFor="email" className={labelStyle}>
                                                Email
                                            </label>
                                            <input
                                                disabled
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={profileData.email}
                                                onChange={handleInput}
                                                className={disabledInputStyle}
                                                placeholder=" "
                                            />


                                        </div>
                                        <div className={`${mainDiv}`}>
                                            <label className={`${labelStyle}`} htmlFor="phoneNumber">Phone number</label>
                                            <input className={`${inputStyle}`} type="number" name='phoneNumber' id='phoneNumber' value={profileData.phoneNumber} onChange={handleInput} />
                                        </div>
                                        <div className={`${mainDiv}`}>
                                            <label className={`${labelStyle}`} htmlFor="name">Full name</label>
                                            <input className={`${inputStyle}`} type="text" name='name' id='name' value={profileData.name} onChange={handleInput} />
                                        </div>
                                        <div className={`${mainDiv}`}>
                                            <label className={`${labelStyle}`} htmlFor="address">Address</label>
                                            <textarea rows={3} className={`${inputStyle} resize-none`} type="text" name='address' id='address' value={profileData.address} onChange={handleInput} />
                                        </div>
                                        <button type='submit' onClick={() => setLoaderActive(true)} className={`p-2 px-4 mt-2 flex items-center justify-center text-white bg-main transition-all duration-300 w-full lg:px-6 hover:shadow-[1px_1px_6px_-2px#808080] rounded text-[0.9rem] font-semibold ${!isUpdated && 'opacity-50 cursor-not-allowed'}`} disabled={!isUpdated}>
                                            Update profile {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.2rem] border-[2.4px] border-y-[#57575769] animate-spin rounded-full bottom-0'></div>}
                                        </button>
                                    </div>
                                </div>
                            </form>}

                        {sideActive === 2 &&
                            <div className='flex flex-col items-center justify-start w-full gap-6 p-3 mt-10 md:mt-16'>
                                {!bookingData ?
                                    <p>Loading</p> :
                                    bookingData && bookingData?.filter(detail => detail?.status === "confirmed")?.length === 0 ?
                                        <div className='flex flex-col items-center gap-2'>
                                            <p>No booking till now</p>
                                            <button onClick={() => navigate("/")} className='p-1 px-3 text-white rounded bg-main'>Book now</button>
                                        </div> :
                                        <>
                                            <h1 className='w-full text-[1.2rem] font-bold mt-1'>Confirmed Booking List</h1>
                                            {bookingData?.filter(detail => detail?.status === "confirmed")?.map((item, index) => {
                                                return <motion.div
                                                    key={index}
                                                    layoutId={item?._id}
                                                    className="flex flex-col w-full overflow-hidden border border-gray-200 rounded-lg shadow-md cursor-pointer"
                                                    onClick={() => setItem(item)} // On click, set the selected card ID
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    <div className="flex flex-col items-center justify-between w-full mx-auto bg-white border-b md:flex-row">
                                                        {/* Car image and details */}
                                                        <div className="flex items-start justify-between w-full pr-3 border-b md:w-fit">
                                                            <img
                                                                src={item?.photo?.secure_url || car1}
                                                                alt={`car ${index + 1}`}
                                                                className="max-w-[7.8rem] min-w-[7.8rem] min-h-[5.3rem] max-h-[5.3rem] object-cover md:max-h-[6rem] md:min-h-[6rem] md:min-w-[9.9rem] md:max-w-[9.8rem]"
                                                            />
                                                            <div className="w-full ml-1 md:hidden">
                                                                <div className="block pt-3 md:pt-1 md:text-left">
                                                                    <p className='text-[0.8rem] md:text-[0.85rem] font-semibold tracking-wide border rounded border-main bg-sky-100 w-fit p-[0.1rem] px-2'>{item?.bookingId}</p>
                                                                    <h2 className=" text-[1.4rem] mt-1 leading-7 mb-1 font-semibold line-clamp-1">
                                                                        {item?.category}
                                                                    </h2>
                                                                </div>

                                                            </div>

                                                        </div>

                                                        {/* Right section */}
                                                        <div className="w-full md:max-w-[70%] pl-2">
                                                            <div className="hidden text-center md:block md:text-left">
                                                                <h2 className="mb-2 text-2xl font-semibold">{item?.category}</h2>
                                                            </div>
                                                            <div className="flex items-center md:hidden mr-2 w-fit text-[1.1rem] font-bold text-gray-800">
                                                                <FaIndianRupeeSign className="w-4 h-4 text-gray-800 " />{' '}
                                                                {Math.ceil(item?.totalPrice)}

                                                            </div>
                                                            <div className="flex relative pl-3 flex-col items-start  text-[0.9rem] md:mt-0 font-semibold font-sans mb-2">
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
                                                        <div className="hidden md:flex md:flex-col min-w-[9rem] max-w-[9rem] items-center">
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
                                                        <div className="flex items-center justify-between gap-2 p-3 md:pl-4 text-[0.85rem] md:text-[0.95rem] font-semibold text-main">
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
                                                            <div className="md:flex hidden items-center p-[0.15rem] pr-2 md:px-3 md:pl-2 cursor-pointer bg-blue-50 border border-main rounded">
                                                                <div className="p-1 rounded-full">
                                                                    <FaCar className="w-4 h-4 text-main" />
                                                                </div>
                                                                <span className="text-gray-700">{item?.bookingId}</span>
                                                            </div>
                                                            <div className="flex items-center p-[0.15rem] pr-2 md:px-3 md:pl-2 cursor-pointer bg-blue-50 border border-main rounded">
                                                                <div className="p-1 rounded-full">
                                                                    <FaCar className="w-4 h-4 text-main" />
                                                                </div>
                                                                <span className="text-gray-700">{item?.tripType.split(' ')[0]} trip</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            })}
                                        </>}

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
                                                className="fixed inset-0 h-[100rem] z-40 bg-black"
                                            />

                                            {/* Modal Popup */}
                                            <motion.div
                                                layoutId={item?._id}
                                                key="modal"
                                                className="fixed inset-0 z-50 flex items-center justify-center p-4 top-16 "
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                            >

                                                <div className='relative scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-200 border scroll-m-1 border-main top-2 max-w-[27rem] sm:max-w-[55rem] w-full overflow-hidden bg-white rounded-md max-h-[80vh] overflow-y-auto'>
                                                    <motion.button
                                                        onClick={() => setItem(null)}
                                                        className="absolute  right-1 top-[-0.75rem]  mt-4 text-red-600 bg-red-50 border border-red-500 rounded-full p-1 rounded-tr-lg"
                                                    >
                                                        <FaXmark />
                                                    </motion.button>
                                                    <div className="flex flex-col items-center justify-between w-full mx-auto border-b sm:flex-row">
                                                        {/* Car image and details */}
                                                        <div className="flex items-start justify-between w-full pr-3 sm:w-fit">
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
                                                        <div className='  py-2 text-[0.9rem] border-b md:text-[0.95rem] font-semibold flex flex-col justify-between'>
                                                            <p>Pickup: {item?.pickupDate.split('T')[0]} at {item?.pickupTime}</p>
                                                            {item?.tripType === "Round" && <p>Return: {item?.returnDate?.split('T')[0]}</p>}
                                                        </div>
                                                        {item?.status === "completed" &&
                                                            <div onClick={() => download(item?._id)} className='p-2 flex items-center justify-center gap-2 cursor-pointer min-w-fit bg-blue-50 text-blue-600 border py-[0.42rem] border-blue-500 rounded'>
                                                                <FaDownload /> Download invoice
                                                            </div>
                                                        }
                                                        <div className="flex relative  flex-col items-start mt-4 text-[0.9rem] gap-2 sm:mt-0 font-semibold font-sans mb-2">

                                                            {item?.tripType === "Round" ? (
                                                                <>

                                                                    <div className='flex items-start'>
                                                                        <div className="rotate-[180deg] mr-2 mt-[0.34rem] size-[0.65rem] border-light border-[0.2rem] rounded-full"></div>

                                                                        <p className="">{item?.pickupAddress}</p>
                                                                    </div>
                                                                    <p className="flex items-center">
                                                                        <FaLocationDot className='text-[0.7rem] mt-[0.05rem] mr-[0.4rem]' />

                                                                        {item?.toLocation}</p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className='flex items-start'>
                                                                        <div className="rotate-[180deg] mr-2 mt-[0.34rem] size-[0.65rem] border-light border-[0.2rem] rounded-full"></div>

                                                                        <p className="">{item?.pickupAddress}</p>
                                                                    </div>
                                                                    <p className="flex ">
                                                                        <FaLocationDot className='text-[0.7rem] mt-[0.05rem] ml-[0.06rem] mr-[0.5rem]' />

                                                                        {item?.dropAddress}</p>
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* Driver details */}
                                                        {/* {item?.driverDetails} */}

                                                        {item?.status !== "cancelled" &&
                                                            <>
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
                                                                        <span className='font-semibold text-gray-700'>Assigning soon</span>
                                                                    </p>
                                                                </div>}
                                                            </>

                                                        }

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
                                                                <div
                                                                    onClick={() => {
                                                                        if (window.confirm('Are you sure you want to cancel?')) {
                                                                            cancel(item?._id) // Call the logout function if confirmed
                                                                        }
                                                                        // If canceled, do nothing
                                                                    }}
                                                                    className="flex items-center p-[0.3rem] pr-1 gap-2 sm:px-3 sm:pl-2 cursor-pointer bg-red-500 border rounded">
                                                                    {active &&
                                                                        <div className='border-[3px] border-b-red-500 animate-spin rounded-full size-4'></div>

                                                                    }
                                                                    <span className="text-white">Cancel booking</span>
                                                                </div>}
                                                        </div>
                                                        <div className='py-4 pt-2 border-t border-gray-400'>

                                                            <h3 className='mb-2 font-semibold'>Billing details :</h3>
                                                            <div className='text-[0.9rem] flex flex-col gap-2'>
                                                                <div className='flex items-start'><p className='min-w-[6.3rem] max-w-[6.3rem] '>Total Amount :</p> <span className='font-semibold'>Rs. {(Number(item?.totalPrice)).toFixed(2)}</span></div>
                                                                <div className='flex items-start'><p className='min-w-[6.3rem] max-w-[6.3rem] '>Amount paid :</p> <span className='font-semibold'>Rs. {(Number(item?.paymentMode) * ((item?.totalPrice)) / 100).toFixed(2)} paid at the time of booking</span></div>
                                                                {item?.paymentMode === "100" ?
                                                                    <div className='flex items-start'><p className='min-w-[6.3rem] max-w-[6.3rem] '>Dues Amount :</p> <span className='font-semibold'> Pay extras to driver during the trip (if applicable)</span></div>
                                                                    :
                                                                    <div className='flex items-start'><p className='min-w-[6.3rem] max-w-[6.3rem] '>Dues Amount :</p> <span className='font-semibold'> Pay Rs. {(item?.totalPrice - (Number(item?.paymentMode) * ((item?.totalPrice)) / 100)).toFixed(2)} to driver during the trip with extras (if applicable)</span></div>
                                                                }
                                                            </div>

                                                            <div className='mt-3 pt-2 font-semibold text-[0.92rem] border-t border-gray-400'>
                                                                *Extra charges if applicable (to be paid to the driver during the trip)
                                                                <ul className='ml-6 font-normal list-decimal text-[0.87rem]'>
                                                                    {item?.tripType === "Local" ?
                                                                        <li>Distance travelled beyond {Number(item?.distance) === 80 ? "80" : "120"} km will be charged at Rs. {item?.extraPerKm}/Km and beyond {Number(item?.distance) === 80 ? "8" : "12"} hr will be charged at Rs. {item?.extraPerHour}/hr.</li>
                                                                        :
                                                                        <li>Distance travelled beyond {item?.distance} km will be charged at Rs. {item?.extraPerKm}/Km.</li>

                                                                    }
                                                                    <li>This fare not includes toll tax and parking.</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className='py-4 pt-2 border-gray-400 border-y'>
                                                            <h3 className='mb-2 font-semibold'>Important T&C!</h3>
                                                            <ul className='ml-6 list-disc'>
                                                                {item?.tripType === "Round" && roundTC?.map((data, index) => {
                                                                    return (
                                                                        <li className='list-disc text-[0.8rem] font-semibold' key={index + 1}>{data}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                            <ul className='ml-6 list-disc'>
                                                                {item?.tripType === "Airport Trip" && roundTC?.map((data, index) => {
                                                                    return (
                                                                        <li className='list-disc text-[0.8rem] font-semibold' key={index + 1}>{data}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                            <ul className='ml-6 list-disc'>
                                                                {item?.tripType === "Local" && localTC?.map((data, index) => {
                                                                    return (
                                                                        <li className='list-disc text-[0.8rem] font-semibold' key={index + 1}>{data}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                            <ul className='ml-6 list-disc'>
                                                                {item?.tripType === "One-Way Trip" && onewayTC?.map((data, index) => {
                                                                    return (
                                                                        <li className='list-disc text-[0.8rem] font-semibold' key={index + 1}>{data}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div className='flex items-center justify-between pt-2 m-2 font-semibold text-main'>
                                                            <img src={logo} className='w-[5rem]' alt="icon" />
                                                            Thankyou for booking with us!
                                                        </div>
                                                    </div>
                                                </div>

                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>

                            </div>}
                        {sideActive === 3 &&
                            <form onSubmit={handleSubmit} className="relative w-full p-4 mt-10 space-y-4 md:mt-16 ">

                                <h2 className="mb-6 text-[1.2rem] font-semibold text-left text-gray-600">Change Password</h2>
                                <div className={mainDiv}>
                                    <label htmlFor="oldPassword" className={labelStyle}>Current Password</label>
                                    <input
                                        type="password"
                                        name="oldPassword"
                                        id="oldPassword"
                                        className={`${inputStyle} w-[20rem]`}
                                        value={passwordData.oldPassword}
                                        placeholder='Enter old password...'
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={`${mainDiv} relative`}>
                                    <label htmlFor="newPassword" className={labelStyle}>New Password</label>
                                    <input
                                        type={`${eye ? 'password' : 'text'}`}
                                        name="newPassword"
                                        placeholder='Enter new password...'

                                        id="newPassword"
                                        className={`${inputStyle} w-[20rem]`}

                                        value={passwordData.newPassword}
                                        onChange={handleInputChange}
                                    />
                                    <div className='absolute bottom-2 right-2' onClick={handleEyeClick}>
                                        {eye ? <VscEyeClosed /> :
                                            <VscEye />}
                                    </div>
                                </div>
                                <div className={mainDiv}>
                                    <label htmlFor="confirmNewPassword" className={labelStyle}>Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmNewPassword"
                                        id="confirmNewPassword"
                                        className={`${inputStyle} w-[20rem]`}
                                        placeholder='Enter new password again...'

                                        value={passwordData.confirmNewPassword}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type='submit' onClick={() => setLoaderActive(true)} className={`p-2 px-4 flex items-center justify-center text-white bg-main w-full  transition-all duration-300  lg:px-6 hover:shadow-[1px_1px_6px_-2px#808080] rounded text-[0.9rem] font-semibold `} >
                                    Change Password {loaderActive && <div className='ml-4 ease-in-out mt-1 size-[1.2rem] border-[2.4px] border-y-[#57575769] animate-spin rounded-full bottom-0'></div>}
                                </button>
                            </form>}
                        {sideActive === 4 &&
                            <div className='flex flex-col items-center justify-start w-full gap-6 p-3 mt-10 md:mt-16'>
                                {!bookingData ?
                                    <p>Loading</p> :
                                    bookingData && bookingData?.filter(detail => detail?.status === "ongoing")?.length === 0 ?
                                        <div className='flex flex-col items-center gap-2'>
                                            <p>No Ongoing booking till now</p>
                                            <button onClick={() => navigate("/")} className='p-1 px-3 text-white rounded bg-main'>Book now</button>
                                        </div> :
                                        <>
                                            <h1 className='w-full text-[1.2rem] font-bold mt-1'>Ongoing Booking List</h1>
                                            {bookingData?.filter(detail => detail?.status === "ongoing")?.map((item, index) => {
                                                return <motion.div
                                                    key={index}
                                                    layoutId={item?._id}
                                                    className="flex flex-col w-full overflow-hidden border border-gray-200 rounded-lg shadow-md cursor-pointer"
                                                    onClick={() => setItem(item)} // On click, set the selected card ID
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    <div className="flex flex-col items-center justify-between w-full mx-auto bg-white border-b md:flex-row">
                                                        {/* Car image and details */}
                                                        <div className="flex items-start justify-between w-full pr-3 border-b md:w-fit">
                                                            <img
                                                                src={item?.photo?.secure_url || car1}
                                                                alt={`car ${index + 1}`}
                                                                className="max-w-[7.8rem] min-w-[7.8rem] min-h-[5.3rem] max-h-[5.3rem] object-cover md:max-h-[6rem] md:min-h-[6rem] md:min-w-[9.9rem] md:max-w-[9.8rem]"
                                                            />
                                                            <div className="w-full ml-1 md:hidden">
                                                                <div className="block pt-3 md:pt-1 md:text-left">
                                                                    <p className='text-[0.8rem] md:text-[0.85rem] font-semibold tracking-wide border rounded border-main bg-sky-100 w-fit p-[0.1rem] px-2'>{item?.bookingId}</p>
                                                                    <h2 className=" text-[1.4rem] mt-1 leading-7 mb-1 font-semibold line-clamp-1">
                                                                        {item?.category}
                                                                    </h2>
                                                                </div>

                                                            </div>

                                                        </div>

                                                        {/* Right section */}
                                                        <div className="w-full md:max-w-[70%] pl-2">
                                                            <div className="hidden text-center md:block md:text-left">
                                                                <h2 className="mb-2 text-2xl font-semibold">{item?.category}</h2>
                                                            </div>
                                                            <div className="flex items-center md:hidden mr-2 w-fit text-[1.1rem] font-bold text-gray-800">
                                                                <FaIndianRupeeSign className="w-4 h-4 text-gray-800 " />{' '}
                                                                {Math.ceil(item?.totalPrice)}

                                                            </div>
                                                            <div className="flex relative pl-3 flex-col items-start  text-[0.9rem] md:mt-0 font-semibold font-sans mb-2">
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
                                                        <div className="hidden md:flex md:flex-col min-w-[9rem] max-w-[9rem] items-center">
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
                                                        <div className="flex items-center justify-between gap-2 p-3 md:pl-4 text-[0.85rem] md:text-[0.95rem] font-semibold text-main">
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
                                                            <div className="md:flex hidden items-center p-[0.15rem] pr-2 md:px-3 md:pl-2 cursor-pointer bg-blue-50 border border-main rounded">
                                                                <div className="p-1 rounded-full">
                                                                    <FaCar className="w-4 h-4 text-main" />
                                                                </div>
                                                                <span className="text-gray-700">{item?.bookingId}</span>
                                                            </div>
                                                            <div className="flex items-center p-[0.15rem] pr-2 md:px-3 md:pl-2 cursor-pointer bg-blue-50 border border-main rounded">
                                                                <div className="p-1 rounded-full">
                                                                    <FaCar className="w-4 h-4 text-main" />
                                                                </div>
                                                                <span className="text-gray-700">{item?.tripType.split(' ')[0]} trip</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            })}
                                        </>}

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
                                                className="fixed inset-0 h-[100rem] z-40 bg-black"
                                            />

                                            {/* Modal Popup */}
                                            <motion.div
                                                layoutId={item?._id}
                                                key="modal"
                                                className="fixed inset-0 z-50 flex items-center justify-center p-4 top-16 "
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                            >

                                                <div className='relative scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-200 border scroll-m-1 border-main top-2 max-w-[27rem] sm:max-w-[55rem] w-full overflow-hidden bg-white rounded-md max-h-[80vh] overflow-y-auto'>
                                                    <motion.button
                                                        onClick={() => setItem(null)}
                                                        className="absolute  right-1 top-[-0.75rem]  mt-4 text-red-600 bg-red-50 border border-red-500 rounded-full p-1 rounded-tr-lg"
                                                    >
                                                        <FaXmark />
                                                    </motion.button>
                                                    <div className="flex flex-col items-center justify-between w-full mx-auto border-b sm:flex-row">
                                                        {/* Car image and details */}
                                                        <div className="flex items-start justify-between w-full pr-3 sm:w-fit">
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
                                                        <div className='  py-2 text-[0.9rem] border-b md:text-[0.95rem] font-semibold flex flex-col justify-between'>
                                                            <p>Pickup: {item?.pickupDate.split('T')[0]} at {item?.pickupTime}</p>
                                                            {item?.tripType === "Round" && <p>Return: {item?.returnDate?.split('T')[0]}</p>}
                                                        </div>
                                                        {item?.status === "completed" &&
                                                            <div onClick={() => download(item?._id)} className='p-2 flex items-center justify-center gap-2 cursor-pointer min-w-fit bg-blue-50 text-blue-600 border py-[0.42rem] border-blue-500 rounded'>
                                                                <FaDownload /> Download invoice
                                                            </div>
                                                        }
                                                        <div className="flex relative  flex-col items-start mt-4 text-[0.9rem] gap-2 sm:mt-0 font-semibold font-sans mb-2">

                                                            {item?.tripType === "Round" ? (
                                                                <>

                                                                    <div className='flex items-start'>
                                                                        <div className="rotate-[180deg] mr-2 mt-[0.34rem] size-[0.65rem] border-light border-[0.2rem] rounded-full"></div>

                                                                        <p className="">{item?.pickupAddress}</p>
                                                                    </div>
                                                                    <p className="flex items-center">
                                                                        <FaLocationDot className='text-[0.7rem] mt-[0.05rem] mr-[0.4rem]' />

                                                                        {item?.toLocation}</p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className='flex items-start'>
                                                                        <div className="rotate-[180deg] mr-2 mt-[0.34rem] size-[0.65rem] border-light border-[0.2rem] rounded-full"></div>

                                                                        <p className="">{item?.pickupAddress}</p>
                                                                    </div>
                                                                    <p className="flex ">
                                                                        <FaLocationDot className='text-[0.7rem] mt-[0.05rem] ml-[0.06rem] mr-[0.5rem]' />

                                                                        {item?.dropAddress}</p>
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* Driver details */}
                                                        {/* {item?.driverDetails} */}

                                                        {item?.status !== "cancelled" &&
                                                            <>
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
                                                                        <span className='font-semibold text-gray-700'>Assigning soon</span>
                                                                    </p>
                                                                </div>}
                                                            </>

                                                        }

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
                                                                <div
                                                                    onClick={() => {
                                                                        if (window.confirm('Are you sure you want to cancel?')) {
                                                                            cancel(item?._id) // Call the logout function if confirmed
                                                                        }
                                                                        // If canceled, do nothing
                                                                    }}
                                                                    className="flex items-center p-[0.3rem] pr-1 gap-2 sm:px-3 sm:pl-2 cursor-pointer bg-red-500 border rounded">
                                                                    {active &&
                                                                        <div className='border-[3px] border-b-red-500 animate-spin rounded-full size-4'></div>

                                                                    }
                                                                    <span className="text-white">Cancel booking</span>
                                                                </div>}
                                                        </div>
                                                        <div className='py-4 pt-2 border-t border-gray-400'>

                                                            <h3 className='mb-2 font-semibold'>Billing details :</h3>
                                                            <div className='text-[0.9rem] flex flex-col gap-2'>
                                                                <div className='flex items-start'><p className='min-w-[6.3rem] max-w-[6.3rem] '>Total Amount :</p> <span className='font-semibold'>Rs. {(Number(item?.totalPrice)).toFixed(2)}</span></div>
                                                                <div className='flex items-start'><p className='min-w-[6.3rem] max-w-[6.3rem] '>Amount paid :</p> <span className='font-semibold'>Rs. {(Number(item?.paymentMode) * ((item?.totalPrice)) / 100).toFixed(2)} paid at the time of booking</span></div>
                                                                {item?.paymentMode === "100" ?
                                                                    <div className='flex items-start'><p className='min-w-[6.3rem] max-w-[6.3rem] '>Dues Amount :</p> <span className='font-semibold'> Pay extras to driver during the trip (if applicable)</span></div>
                                                                    :
                                                                    <div className='flex items-start'><p className='min-w-[6.3rem] max-w-[6.3rem] '>Dues Amount :</p> <span className='font-semibold'> Pay Rs. {(item?.totalPrice - (Number(item?.paymentMode) * ((item?.totalPrice)) / 100)).toFixed(2)} to driver during the trip with extras (if applicable)</span></div>
                                                                }
                                                            </div>

                                                            <div className='mt-3 pt-2 font-semibold text-[0.92rem] border-t border-gray-400'>
                                                                *Extra charges if applicable (to be paid to the driver during the trip)
                                                                <ul className='ml-6 font-normal list-decimal text-[0.87rem]'>
                                                                    {item?.tripType === "Local" ?
                                                                        <li>Distance travelled beyond {Number(item?.distance) === 80 ? "80" : "120"} km will be charged at Rs. {item?.extraPerKm}/Km and beyond {Number(item?.distance) === 80 ? "8" : "12"} hr will be charged at Rs. {item?.extraPerHour}/hr.</li>
                                                                        :
                                                                        <li>Distance travelled beyond {item?.distance} km will be charged at Rs. {item?.extraPerKm}/Km.</li>

                                                                    }
                                                                    <li>This fare not includes toll tax and parking.</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className='py-4 pt-2 border-gray-400 border-y'>
                                                            <h3 className='mb-2 font-semibold'>Important T&C!</h3>
                                                            <ul className='ml-6 list-disc'>
                                                                {item?.tripType === "Round" && roundTC?.map((data, index) => {
                                                                    return (
                                                                        <li className='list-disc text-[0.8rem] font-semibold' key={index + 1}>{data}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                            <ul className='ml-6 list-disc'>
                                                                {item?.tripType === "Airport Trip" && roundTC?.map((data, index) => {
                                                                    return (
                                                                        <li className='list-disc text-[0.8rem] font-semibold' key={index + 1}>{data}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                            <ul className='ml-6 list-disc'>
                                                                {item?.tripType === "Local" && localTC?.map((data, index) => {
                                                                    return (
                                                                        <li className='list-disc text-[0.8rem] font-semibold' key={index + 1}>{data}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                            <ul className='ml-6 list-disc'>
                                                                {item?.tripType === "One-Way Trip" && onewayTC?.map((data, index) => {
                                                                    return (
                                                                        <li className='list-disc text-[0.8rem] font-semibold' key={index + 1}>{data}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div className='flex items-center justify-between pt-2 m-2 font-semibold text-main'>
                                                            <img src={logo} className='w-[5rem]' alt="icon" />
                                                            Thankyou for booking with us!
                                                        </div>
                                                    </div>
                                                </div>

                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>


                            </div>}
                        {sideActive === 5 &&
                            <div className='flex flex-col items-center justify-start w-full gap-6 p-3 mt-10 md:mt-16'>
                                {!bookingData ?
                                    <p>Loading</p> :
                                    bookingData && bookingData?.filter(detail => detail?.status === "completed")?.length === 0 ?
                                        <div className='flex flex-col items-center gap-2'>
                                            <p>No Completed booking till now</p>
                                            <button onClick={() => navigate("/")} className='p-1 px-3 text-white rounded bg-main'>Book now</button>
                                        </div> :
                                        <>
                                            <h1 className='w-full text-[1.2rem] font-bold mt-1'>Completed Booking List</h1>
                                            {bookingData?.filter(detail => detail?.status === "completed")?.map((item, index) => {
                                                return <motion.div
                                                    key={index}
                                                    layoutId={item?._id}
                                                    className="flex flex-col w-full overflow-hidden border border-gray-200 rounded-lg shadow-md cursor-pointer"
                                                    onClick={() => setItem(item)} // On click, set the selected card ID
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    <div className="flex flex-col items-center justify-between w-full mx-auto bg-white border-b md:flex-row">
                                                        {/* Car image and details */}
                                                        <div className="flex items-start justify-between w-full pr-3 border-b md:w-fit">
                                                            <img
                                                                src={item?.photo?.secure_url || car1}
                                                                alt={`car ${index + 1}`}
                                                                className="max-w-[7.8rem] min-w-[7.8rem] min-h-[5.3rem] max-h-[5.3rem] object-cover md:max-h-[6rem] md:min-h-[6rem] md:min-w-[9.9rem] md:max-w-[9.8rem]"
                                                            />
                                                            <div className="w-full ml-1 md:hidden">
                                                                <div className="block pt-3 md:pt-1 md:text-left">
                                                                    <p className='text-[0.8rem] md:text-[0.85rem] font-semibold tracking-wide border rounded border-main bg-sky-100 w-fit p-[0.1rem] px-2'>{item?.bookingId}</p>
                                                                    <h2 className=" text-[1.4rem] mt-1 leading-7 mb-1 font-semibold line-clamp-1">
                                                                        {item?.category}
                                                                    </h2>
                                                                </div>

                                                            </div>

                                                        </div>

                                                        {/* Right section */}
                                                        <div className="w-full md:max-w-[70%] pl-2">
                                                            <div className="hidden text-center md:block md:text-left">
                                                                <h2 className="mb-2 text-2xl font-semibold">{item?.category}</h2>
                                                            </div>
                                                            <div className="flex items-center md:hidden mr-2 w-fit text-[1.1rem] font-bold text-gray-800">
                                                                <FaIndianRupeeSign className="w-4 h-4 text-gray-800 " />{' '}
                                                                {Math.ceil(item?.totalPrice)}

                                                            </div>
                                                            <div className="flex relative pl-3 flex-col items-start  text-[0.9rem] md:mt-0 font-semibold font-sans mb-2">
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
                                                        <div className="hidden md:flex md:flex-col min-w-[9rem] max-w-[9rem] items-center">
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
                                                        <div className="flex items-center justify-between gap-2 p-3 md:pl-4 text-[0.85rem] md:text-[0.95rem] font-semibold text-main">
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
                                                            <div className="md:flex hidden items-center p-[0.15rem] pr-2 md:px-3 md:pl-2 cursor-pointer bg-blue-50 border border-main rounded">
                                                                <div className="p-1 rounded-full">
                                                                    <FaCar className="w-4 h-4 text-main" />
                                                                </div>
                                                                <span className="text-gray-700">{item?.bookingId}</span>
                                                            </div>
                                                            <div className="flex items-center p-[0.15rem] pr-2 md:px-3 md:pl-2 cursor-pointer bg-blue-50 border border-main rounded">
                                                                <div className="p-1 rounded-full">
                                                                    <FaCar className="w-4 h-4 text-main" />
                                                                </div>
                                                                <span className="text-gray-700">{item?.tripType.split(' ')[0]} trip</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            })}
                                        </>}

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
                                                className="fixed inset-0 h-[100rem] z-40 bg-black"
                                            />

                                            {/* Modal Popup */}
                                            <motion.div
                                                layoutId={item?._id}
                                                key="modal"
                                                className="fixed inset-0 z-50 flex items-center justify-center p-4 top-16 "
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                            >

                                                <div className='relative scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-200 border scroll-m-1 border-main top-2 max-w-[27rem] sm:max-w-[55rem] w-full overflow-hidden bg-white rounded-md max-h-[80vh] overflow-y-auto'>
                                                    <motion.button
                                                        onClick={() => setItem(null)}
                                                        className="absolute  right-1 top-[-0.75rem]  mt-4 text-red-600 bg-red-50 border border-red-500 rounded-full p-1 rounded-tr-lg"
                                                    >
                                                        <FaXmark />
                                                    </motion.button>
                                                    <div className="flex flex-col items-center justify-between w-full mx-auto border-b sm:flex-row">
                                                        {/* Car image and details */}
                                                        <div className="flex items-start justify-between w-full pr-3 sm:w-fit">
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
                                                        <div className='  py-2 text-[0.9rem] border-b md:text-[0.95rem] font-semibold flex flex-col justify-between'>
                                                            <p>Pickup: {item?.pickupDate.split('T')[0]} at {item?.pickupTime}</p>
                                                            {item?.tripType === "Round" && <p>Return: {item?.returnDate?.split('T')[0]}</p>}
                                                        </div>
                                                        {item?.status === "completed" &&
                                                            <div onClick={() => download(item?._id)} className='p-2 flex items-center justify-center gap-2 cursor-pointer min-w-fit bg-blue-50 text-blue-600 border py-[0.42rem] border-blue-500 rounded'>
                                                                <FaDownload /> Download invoice
                                                            </div>
                                                        }
                                                        <div className="flex relative  flex-col items-start mt-4 text-[0.9rem] gap-2 sm:mt-0 font-semibold font-sans mb-2">

                                                            {item?.tripType === "Round" ? (
                                                                <>

                                                                    <div className='flex items-start'>
                                                                        <div className="rotate-[180deg] mr-2 mt-[0.34rem] size-[0.65rem] border-light border-[0.2rem] rounded-full"></div>

                                                                        <p className="">{item?.pickupAddress}</p>
                                                                    </div>
                                                                    <p className="flex items-center">
                                                                        <FaLocationDot className='text-[0.7rem] mt-[0.05rem] mr-[0.4rem]' />

                                                                        {item?.toLocation}</p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className='flex items-start'>
                                                                        <div className="rotate-[180deg] mr-2 mt-[0.34rem] size-[0.65rem] border-light border-[0.2rem] rounded-full"></div>

                                                                        <p className="">{item?.pickupAddress}</p>
                                                                    </div>
                                                                    <p className="flex ">
                                                                        <FaLocationDot className='text-[0.7rem] mt-[0.05rem] ml-[0.06rem] mr-[0.5rem]' />

                                                                        {item?.dropAddress}</p>
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* Driver details */}
                                                        {/* {item?.driverDetails} */}

                                                        {item?.status !== "cancelled" &&
                                                            <>
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
                                                                        <span className='font-semibold text-gray-700'>Assigning soon</span>
                                                                    </p>
                                                                </div>}
                                                            </>

                                                        }

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
                                                                <div
                                                                    onClick={() => {
                                                                        if (window.confirm('Are you sure you want to cancel?')) {
                                                                            cancel(item?._id) // Call the logout function if confirmed
                                                                        }
                                                                        // If canceled, do nothing
                                                                    }}
                                                                    className="flex items-center p-[0.3rem] pr-1 gap-2 sm:px-3 sm:pl-2 cursor-pointer bg-red-500 border rounded">
                                                                    {active &&
                                                                        <div className='border-[3px] border-b-red-500 animate-spin rounded-full size-4'></div>

                                                                    }
                                                                    <span className="text-white">Cancel booking</span>
                                                                </div>}
                                                        </div>
                                                        <div className='py-4 pt-2 border-t border-gray-400'>

                                                            <h3 className='mb-2 font-semibold'>Billing details :</h3>
                                                            <div className='text-[0.9rem] flex flex-col gap-2'>
                                                                <div className='flex items-start'><p className='min-w-[6.3rem] max-w-[6.3rem] '>Total Amount :</p> <span className='font-semibold'>Rs. {(Number(item?.totalPrice)).toFixed(2)}</span></div>
                                                                <div className='flex items-start'><p className='min-w-[6.3rem] max-w-[6.3rem] '>Amount paid :</p> <span className='font-semibold'>Rs. {(Number(item?.paymentMode) * ((item?.totalPrice)) / 100).toFixed(2)} paid at the time of booking</span></div>
                                                                {item?.paymentMode === "100" ?
                                                                    <div className='flex items-start'><p className='min-w-[6.3rem] max-w-[6.3rem] '>Dues Amount :</p> <span className='font-semibold'> Pay extras to driver during the trip (if applicable)</span></div>
                                                                    :
                                                                    <div className='flex items-start'><p className='min-w-[6.3rem] max-w-[6.3rem] '>Dues Amount :</p> <span className='font-semibold'> Pay Rs. {(item?.totalPrice - (Number(item?.paymentMode) * ((item?.totalPrice)) / 100)).toFixed(2)} to driver during the trip with extras (if applicable)</span></div>
                                                                }
                                                            </div>

                                                            <div className='mt-3 pt-2 font-semibold text-[0.92rem] border-t border-gray-400'>
                                                                *Extra charges if applicable (to be paid to the driver during the trip)
                                                                <ul className='ml-6 font-normal list-decimal text-[0.87rem]'>
                                                                    {item?.tripType === "Local" ?
                                                                        <li>Distance travelled beyond {Number(item?.distance) === 80 ? "80" : "120"} km will be charged at Rs. {item?.extraPerKm}/Km and beyond {Number(item?.distance) === 80 ? "8" : "12"} hr will be charged at Rs. {item?.extraPerHour}/hr.</li>
                                                                        :
                                                                        <li>Distance travelled beyond {item?.distance} km will be charged at Rs. {item?.extraPerKm}/Km.</li>

                                                                    }
                                                                    <li>This fare not includes toll tax and parking.</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className='py-4 pt-2 border-gray-400 border-y'>
                                                            <h3 className='mb-2 font-semibold'>Important T&C!</h3>
                                                            <ul className='ml-6 list-disc'>
                                                                {item?.tripType === "Round" && roundTC?.map((data, index) => {
                                                                    return (
                                                                        <li className='list-disc text-[0.8rem] font-semibold' key={index + 1}>{data}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                            <ul className='ml-6 list-disc'>
                                                                {item?.tripType === "Airport Trip" && roundTC?.map((data, index) => {
                                                                    return (
                                                                        <li className='list-disc text-[0.8rem] font-semibold' key={index + 1}>{data}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                            <ul className='ml-6 list-disc'>
                                                                {item?.tripType === "Local" && localTC?.map((data, index) => {
                                                                    return (
                                                                        <li className='list-disc text-[0.8rem] font-semibold' key={index + 1}>{data}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                            <ul className='ml-6 list-disc'>
                                                                {item?.tripType === "One-Way Trip" && onewayTC?.map((data, index) => {
                                                                    return (
                                                                        <li className='list-disc text-[0.8rem] font-semibold' key={index + 1}>{data}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div className='flex items-center justify-between pt-2 m-2 font-semibold text-main'>
                                                            <img src={logo} className='w-[5rem]' alt="icon" />
                                                            Thankyou for booking with us!
                                                        </div>
                                                    </div>
                                                </div>

                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>

                            </div>}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
