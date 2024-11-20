
const ReviewCard = ({ data }) => {
    const { img, rev, name } = data
    return (
        <div className='flex items-center justify-center w-full'>
            <div className='sm:w-[38rem] sm:flex-row w-full mx-4 flex flex-col backdrop-blur-lg items-center justify-around rounded-md sm:h-[10rem] h-[20rem]  py-[5rem] bg-white relative z-[20] shadow-[0px_0px_5px_#00ffc3] border border-red-500'>

                <img src={img} alt="user image" className='rounded-full h-[5rem] object-cover w-[5rem]' />
                <div className='w-[75%] flex flex-col items-end text-black'>
                    <p className='text-[0.95rem] font-[400] text-center sm:text-start text-black'>{rev}!</p>
                    <p className='text-[0.9rem] text-main pr-6 '>-{name}</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard