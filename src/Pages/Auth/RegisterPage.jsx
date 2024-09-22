import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAccount, verifyOTP } from "../../Redux/Slices/authSlice"; // Adjust the path according to your project structure
import { toast } from "sonner";
import signup from '../../assets/icons/registerPage.gif';
import verify from '../../assets/icons/verify.gif';
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [verifyActive, setVerifyActive] = useState(false);
    const [otp, setOtp] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
    });

    const [errorMessage, setErrorMessage] = useState({
        name: false,
        email: false,
        phoneNumber: false,
        password: false,

    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { email, name, phoneNumber, password } = formData;


        let hasError = false;

        if (!email) {
            setLoading(false);
            setErrorMessage((prev) => ({ ...prev, email: true }));
            hasError = true;
        }

        if (!name) {
            setLoading(false);
            setErrorMessage((prev) => ({ ...prev, name: true }));
            hasError = true;
        }

        if (!phoneNumber) {
            setLoading(false);
            setErrorMessage((prev) => ({ ...prev, phoneNumber: true }));
            hasError = true;
        }

        if (!password) {
            setLoading(false);

            setErrorMessage((prev) => ({ ...prev, password: true }));
            hasError = true;
        }

        if (hasError) return;


        const response = await dispatch(createAccount(formData));
        setLoading(false); // Stop loading once request is complete

        if (response?.payload?.success) {
            setVerifyActive(true);
        } else {
            return
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault()

        if (otp.length !== 5) {
            return toast.error("Enter 5 digit OTP")
        }

        const response = await dispatch(verifyOTP({ email: formData?.email, otp: otp }))

        if (response?.payload?.success) {
            toast.success("Account verified")
            navigate('/')
        } else {
            return toast.error("Please try again!")
        }
    }

    return (
        <div className="flex items-start justify-center min-h-screen p-1 pt-16 bg-gray-100">
            {/* Wrap both forms with a container that has an animation class */}
            <div className={`form-container  ${verifyActive ? 'flip-animation' : ''}`}>
                {/* Registration Form */}
                <form
                    noValidate
                    onSubmit={handleSubmit}

                    className={`register-form w-full   max-w-[24rem] pt-0 p-3 py-1 pb-6 bg-white rounded-xl border-main border border-opacity-55 shadow-md ${verifyActive ? 'hidden' : 'block'}`}
                >
                    <img src={signup} className="w-[5rem] mb-4 mx-auto relative top-2" alt="signup" />
                    <div className="mb-4">
                        <div className={`relative border w-full px-2 p-1 rounded-md ${!formData?.name && errorMessage?.name ? "border-red-500" : "border-main"} bg-[#F7FBFF] flex flex-col items-center`}>
                            <label className='w-full  text-light   text-[0.8rem]'>Full Name</label>
                            <input
                                type="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-[0.1rem]  tracking-wide bg-transparent outline-none placeholder:text-[#5b5b5b]"
                                placeholder="Enter full name..."
                                required
                            />

                        </div>
                        {!formData?.name && errorMessage?.name &&
                            <p className='text-[0.78rem] text-left w-full leading-3 pt-[0.1rem] text-red-500'>*Full Name is required!</p>}
                    </div>
                    <div className="mb-4">
                        <div className={`relative border w-full px-2 p-1 rounded-md ${!formData?.email && errorMessage?.email ? "border-red-500" : "border-main"} bg-[#F7FBFF] flex flex-col items-center`}>
                            <label className='w-full  text-light   text-[0.8rem]'>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-[0.1rem]  tracking-wide bg-transparent outline-none placeholder:text-[#5b5b5b]"
                                placeholder="Enter email..."
                                required
                            />

                        </div>
                        {!formData?.email && errorMessage?.email &&
                            <p className='text-[0.78rem] text-left w-full leading-3 pt-[0.1rem] text-red-500'>*Email is required!</p>}
                    </div>
                    <div className="mb-4">
                        <div className={`relative border w-full px-2 p-1 rounded-md ${!formData?.phoneNumber && errorMessage?.phoneNumber ? "border-red-500" : "border-main"} bg-[#F7FBFF] flex flex-col items-center`}>
                            <label className='w-full  text-light   text-[0.8rem]'>Phone Number</label>
                            <input
                                type="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full p-[0.1rem]  tracking-wide bg-transparent outline-none placeholder:text-[#5b5b5b]"
                                placeholder="Enter phoneNumber..."
                                required
                            />

                        </div>
                        {!formData?.phoneNumber && errorMessage?.phoneNumber &&
                            <p className='text-[0.78rem] text-left w-full leading-3 pt-[0.1rem] text-red-500'>*Phone Number is required!</p>}
                    </div>
                    <div className="mb-4">
                        <div className={`relative border w-full px-2 p-1 rounded-md ${!formData?.password && errorMessage?.password ? "border-red-500" : "border-main"} bg-[#F7FBFF] flex flex-col items-center`}>
                            <label className='w-full  text-light   text-[0.8rem]'>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-[0.1rem]  tracking-wide bg-transparent outline-none placeholder:text-[#5b5b5b]"
                                placeholder="Enter password..."
                                required
                            />

                        </div>
                        {!formData?.password && errorMessage?.password &&
                            <p className='text-[0.78rem] text-left w-full leading-3 pt-[0.1rem] text-red-500'>*Password is required!</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={loading} // Disable button during loading
                        className={`w-full flex items-center justify-center gap-4 p-2 mt-4 font-bold text-white rounded ${loading ? "bg-gray-500" : "bg-main"
                            }`}
                    >
                        {loading && /* From Uiverse.io by abrahamcalsin */
                            <div className="dot-spinner">
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                            </div>} Sign up
                    </button>
                    <p className="mt-2 text-center">Already have an account? <Link to={'/login'} className="font-semibold underline text-main">Login</Link></p>
                </form>

                {/* OTP Verification Form */}
                <form onSubmit={handleVerify}
                    noValidate
                    style={{ transform: "rotateX(180deg)" }}
                    className={`verify-form w-full  max-w-[24rem] p-3 py-4 pb-8 bg-white rounded-xl border-main border border-opacity-55 shadow-md ${verifyActive ? 'block' : 'hidden'}`}
                >
                    <img src={verify} className="w-[4.8rem] mb-5 mt-1 mx-auto relative top-2" alt="verify" />
                    <div className="relative mb-4 space-y-4 border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                        <label className="w-full text-light text-[0.9rem] text-center">🔒 Verify Your Account by entering the OTP sent to your registered email</label>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={5}
                            renderSeparator={<span className="w-[0.6rem] mx-[0.1rem] h-[0.05rem] bg-black"></span>}
                            renderInput={(props) => <input {...props} className="border min-h-[2.4rem] text-[1.2rem] rounded bg-transparent border-light min-w-[2.4rem]" />}
                        />
                    </div>
                    <p className="pr-1 mt-2"> <Link to={'/'} className="font-semibold text-[0.95rem] underline text-main tracking-wide">Resend OTP!</Link></p>
                    <button
                        type="submit"
                        disabled={loading} // Disable button during loading
                        className={`w-full flex items-center justify-center gap-4 p-2 mt-4 font-bold text-white rounded ${loading ? "bg-gray-500" : "bg-main"
                            }`}
                    >
                        {loading && /* From Uiverse.io by abrahamcalsin */
                            <div className="dot-spinner">
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                                <div className="dot-spinner__dot"></div>
                            </div>} Verify
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
