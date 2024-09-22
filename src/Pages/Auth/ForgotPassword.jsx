import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAccount, resendOTP, verifyOTP } from "../../Redux/Slices/authSlice"; // Adjust the path according to your project structure
import { toast } from "sonner";
import loginIcon from '../../assets/icons/LoginPage.gif';
import verify from '../../assets/icons/verify.gif';

import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // Local loading state
    const [otp, setOtp] = useState('');

    const [loading, setLoading] = useState(false);
    const [verifyActive, setVerifyActive] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading when submitting the form

        const { email, password } = formData

        if (!email || !password) {
            setLoading(false)
            return toast.error("All fields are required")
        }


        // Dispatch the createAccount action
        const response = await dispatch(loginAccount(formData))
        setLoading(false);
        if (response?.payload?.success) {
            if (!response?.payload?.validUser?.isVerify) {
                dispatch(resendOTP({ email: email }))
                setVerifyActive(true)
                setLoading(false)
            } else {
                navigate('/')
            }
            // setVerifyActive(true)
        } else {
            setLoading(false)

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
        }
    }

    const otpResend = async () => {
        if (!formData.email) {
            return toast.error("Email is required")
        }
        const res = await dispatch(resendOTP({ email: formData.email }))
        if (res?.payload?.success) {
            return toast.success("OTP resent on your email")
        } else {
            return toast.error("Failed to send! Try again")
        }
    }

    return (
        <div className="flex items-start justify-center min-h-screen p-1 pt-16 bg-gray-100">
            <div className={`form-container  ${verifyActive ? 'flip-animation' : ''}`}>

                <form noValidate
                    onSubmit={handleSubmit}
                    className={`register-form w-full   max-w-[24rem] pt-0 p-3 py-1 pb-6 bg-white rounded-xl border-main border border-opacity-55 shadow-md ${verifyActive ? 'hidden' : 'block'}`}

                >
                    <img src={loginIcon} className="w-[4.8rem] mb-5 mt-1 mx-auto relative top-2" alt="" />
                    {/* <h2 className="relative z-10 mb-6 text-2xl font-bold text-center">Register</h2> */}



                    <div className="relative mb-4 border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
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


                    <div className="relative border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                        <label className='w-full  text-light   text-[0.8rem]'>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter password..."
                            className="w-full p-[0.1rem] tracking-wide bg-transparent outline-none placeholder:text-[#808080]"
                        />
                    </div>

                    <p className="pr-1 mt-2"> <Link to={'/'} className="font-semibold text-[0.95rem] underline text-main">Forget Password!</Link></p>


                    <button
                        type="submit"
                        disabled={loading} // Disable button during loading
                        className={`w-full p-2 mt-4 font-bold text-white rounded ${loading ? "bg-gray-500" : "bg-main"
                            }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <p className="mt-2 text-center">Don&apos;t have an account? <Link to={'/register'} className="font-semibold underline text-main">Sign up</Link></p>
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
                    <p onClick={otpResend} className="pr-1 mt-2"> <span className="font-semibold text-[0.95rem] underline text-main tracking-wide">Resend OTP!</span></p>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-2 mt-4 font-bold text-white rounded ${loading ? "bg-gray-500" : "bg-main"}`}
                    >
                        {loading ? "Verifying..." : "Verify"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
