import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPrivacyPolicy, getRefundPolicy } from "../Redux/Slices/dynamicSlice";

const RefundPolicy = () => {

    const dispatch = useDispatch()
    const [data, setData] = useState("")
    const fetchData = async () => {
        const res = await dispatch(getRefundPolicy())
        console.log(res)
        setData(res?.payload?.sections[0])
    }

    useEffect(() => {
        fetchData()
    }, [dispatch])

    return (

        <div className="max-w-4xl p-6 mx-auto my-12 bg-white rounded-lg shadow-lg">
            <h1 className="mb-6 text-3xl font-semibold text-center">REFUND AND CANCELLATION POLICY</h1>

            <div
                dangerouslySetInnerHTML={{ __html: data?.description }} className="p1"
            />
        </div>
    );
};




export default RefundPolicy;
