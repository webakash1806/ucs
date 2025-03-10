import React from 'react'
import MainForm from '../../Components/MainForm'
import image from '../../assets/car1.avif'
import AoChale from './AooChale'

const Taxi = () => {
    return (
        <section>

            {/* search */}
            <section className="relative bg-center bg-cover h-96 py-[17rem]" style={{ backgroundImage: `url(${image})` }}>

                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-black">
                    <MainForm />
                </div>
            </section>

            <AoChale />


        </section>
    )
}

export default Taxi