import { useDispatch } from "react-redux";
import { getTermsAndCondition } from "../Redux/Slices/dynamicSlice";
import { useEffect, useState } from "react";

const TermsAndConditions = () => {

    const dispatch = useDispatch()
    const [data, setData] = useState("")
    const fetchData = async () => {
        const res = await dispatch(getTermsAndCondition())
        console.log(res)
        setData(res?.payload?.sections[0])
    }

    useEffect(() => {
        fetchData()
    }, [dispatch])

    return (
        <div className="max-w-4xl p-6 mx-auto my-12 bg-white rounded-lg shadow-lg">
            <h1 className="mb-16 text-3xl font-semibold text-center">Terms and Conditions</h1>

            <div
                dangerouslySetInnerHTML={{ __html: data?.description }}
            />
        </div>

    );
};


export default TermsAndConditions;
