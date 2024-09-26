import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword, loginAccount, resendOTP, resetPasswords, verifyOTP } from "../../Redux/Slices/authSlice"; // Adjust the path according to your project structure
import { toast } from "sonner";
import loginIcon from '../../assets/icons/loginPage.avif';
import verify from '../../assets/icons/verify.avif';

import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // Local loading state
    const [otp, setOtp] = useState('');
    const [resetOtp, setResetOtp] = useState('');

    const [loading, setLoading] = useState(false);
    const [verifyActive, setVerifyActive] = useState(false)
    const [forgetPasswordActive, setForgetPasswordActive] = useState(false)
    const [resetPasswordActive, setResetPasswordActive] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        newPassword: ""
    });

    const [errorMessage, setErrorMessage] = useState({
        email: false,
        password: false,
        loginError: "",
        forgetPasswordError: "",
        drop: false,
    })



    useEffect(() => {
        setErrorMessage({
            email: false,
            password: false,
            loginError: "",
            drop: false,
        })
    }, [formData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading when submitting the form

        const { email, password } = formData

        let hasError = false;

        if (!email) {
            setLoading(false);
            setErrorMessage((prev) => ({ ...prev, email: true }));
            hasError = true;
        }

        if (!password) {
            setLoading(false);

            setErrorMessage((prev) => ({ ...prev, password: true }));
            hasError = true;
        }

        if (hasError) return;



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

            toast.error(response?.payload);

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


    const handleForgotPassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { email } = formData

        let hasError = false;

        if (!email) {
            setLoading(false);
            setErrorMessage((prev) => ({ ...prev, email: true }));
            hasError = true;
        }


        if (hasError) return;



        const response = await dispatch(forgotPassword({ email }))



        if (response?.payload?.success) {

            setFormData({
                ...formData, newPassword: ""
            })
            setResetOtp('')
            setForgetPasswordActive(false)
            setResetPasswordActive(true)
            setLoading(false)
        } else {

            toast.error(response?.payload)

            setLoading(false)
            return
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (resetOtp.length !== 5) {
            setLoading(false)

            return toast.error("Enter 5 digit OTP")
        }


        const resetData = {
            otp: resetOtp,
            email: formData?.email,
            newPassword: formData?.newPassword
        }

        const { otp, email, newPassword } = resetData

        if (!newPassword) {
            setLoading(false)

            return toast.error("New password is required")
        }

        const res = await dispatch(resetPasswords(resetData))


        if (res?.payload?.success) {
            setLoading(false)

            toast.success("Password reset successfully")
            setForgetPasswordActive(false)
            setResetPasswordActive(false)
            setVerifyActive(false)
        } else {
            setLoading(false)
            setFormData({
                ...formData, newPassword: ""
            })
            setResetOtp('')
        }

    }

    return (
        <div className="flex items-start justify-center min-h-screen p-1 pt-10 bg-gray-100">
            <div className={`form-container  ${(verifyActive || forgetPasswordActive || resetPasswordActive) ? 'flip-animation' : ''}`}>

                <form noValidate
                    onSubmit={handleSubmit}
                    className={`register-form w-full   max-w-[24rem] pt-0 p-3 py-1 pb-6 bg-white rounded-xl border-main border border-opacity-55 shadow-md ${(verifyActive || resetPasswordActive || forgetPasswordActive) ? 'hidden' : 'block'}`}

                >
                    <img src={loginIcon} className="w-[4.8rem] mb-2 mt-1 mx-auto relative top-2" alt="icon" />
                    {/* <h2 className="relative z-10 mb-6 text-2xl font-bold text-center">Register</h2> */}

                    <p className="mb-4 text-center text-red-500 capitalize ">{errorMessage?.loginError}</p>


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

                    <p className="pr-1 mt-2"> <Link onClick={() => setForgetPasswordActive(true)} className="font-semibold text-[0.95rem] underline text-main">Forget Password!</Link></p>

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
                            </div>} Login
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
                {/* Forgot password Form */}
                <form onSubmit={handleForgotPassword}
                    noValidate
                    style={{ transform: "rotateX(180deg)" }}
                    className={`verify-form w-full  max-w-[24rem] p-3 py-4 pb-8 bg-white rounded-xl border-main border border-opacity-55 shadow-md ${forgetPasswordActive ? 'block' : 'hidden'}`}
                >
                    <img src={verify} className="w-[4.8rem] mb-2 mt-1 mx-auto relative top-2" alt="verify" />

                    <p className="mb-4 text-center text-red-500 capitalize ">{errorMessage?.forgetPasswordError}</p>

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
                    {/* <p onClick={handleForgotPassword} className="pr-1 mt-2"> <span className="font-semibold text-[0.95rem] underline text-main tracking-wide">Resend Link!</span></p> */}
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
                            </div>} Send OTP
                    </button>
                    <p className="mt-2 text-center">Don&apos;t have an account? <Link to={'/register'} className="font-semibold underline text-main">Sign up</Link></p>

                </form>

                <form onSubmit={handleResetPassword}
                    noValidate
                    style={{ transform: "rotateX(180deg)" }}
                    className={`verify-form w-full  max-w-[24rem] pt-2 p-3 py-4 pb-8 bg-white rounded-xl border-main border border-opacity-55 shadow-md ${resetPasswordActive ? 'block' : 'hidden'}`}
                >
                    <img src={verify} className="w-[4.8rem] mb-3  mx-auto relative top-2" alt="verify" />
                    <div className="relative mb-4 border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                        <label className='w-full  text-light   text-[0.8rem]'>Email</label>
                        <input
                            type="email"
                            name="email"
                            disabled
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-[0.1rem]  tracking-wide bg-transparent outline-none placeholder:text-[#5b5b5b]"
                            placeholder="Enter email..."
                            required
                        />

                    </div>
                    <div className="relative mb-4 space-y-4 border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                        <label className="w-full text-light text-[0.9rem] text-center">🔒 Verify Your Account by entering the OTP sent to your registered email</label>
                        <OTPInput
                            value={resetOtp}
                            onChange={setResetOtp}
                            numInputs={5}
                            renderSeparator={<span className="w-[0.6rem] mx-[0.1rem] h-[0.05rem] bg-black"></span>}
                            renderInput={(props) => <input {...props} className="border min-h-[2.4rem] text-[1.2rem] rounded bg-transparent border-light min-w-[2.4rem]" />}
                        />
                    </div>
                    <div className="relative border w-full px-2 p-1 rounded-md border-main bg-[#F7FBFF] flex flex-col items-center">
                        <label className='w-full  text-light   text-[0.8rem]'>Reset Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            placeholder="Enter new password..."
                            className="w-full p-[0.1rem] tracking-wide bg-transparent outline-none placeholder:text-[#808080]"
                        />
                    </div>

                    <p onClick={handleForgotPassword} className="pr-1 mt-2 cursor-pointer"> <span className="font-semibold text-[0.95rem] underline text-main tracking-wide">Resend OTP!</span></p>
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
                            </div>} Reset password
                    </button>
                    <p className="mt-2 text-center">Don&apos;t have an account? <Link to={'/register'} className="font-semibold underline text-main">Sign up</Link></p>

                </form>
            </div>
        </div>
    );
};

export default LoginPage;
