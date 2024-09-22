import loading from '../assets/icons/carTrip.avif'

const Loading = () => {
    return (
        <div className='h-[50vh] w-full flex items-center justify-center'>
            <img src={loading} className='w-[6rem]' alt="Loading icon" />
        </div>
    )
}

export default Loading
