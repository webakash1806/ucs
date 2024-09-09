import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAccount } from "../../Redux/Slices/authSlice"; // Adjust the path according to your project structure
import { toast } from "react-toastify";
import loginIcon from '../../assets/icons/LoginPage.gif';
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // Local loading state
    const [loading, setLoading] = useState(false);
    // const [verifyActive, setVerifyActive] = useState(false)
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

        if (response?.payload?.success) {
            navigate(-1)
            // setVerifyActive(true)
        } else {
            return toast.error("Something went wrong")
        }

    };

    return (
        <div className="flex items-start justify-center min-h-screen p-1 bg-gray-100">
            <form noValidate
                onSubmit={handleSubmit}
                className="w-full max-w-[24rem] mt-20 pt-0 p-3 py-1 pb-6 bg-white rounded-xl border-main border border-opacity-55 shadow-md"
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
                    <label className='w-full  text-light   text-[0.8rem]'>Full Name</label>
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
        </div>
    );
};

export default LoginPage;
