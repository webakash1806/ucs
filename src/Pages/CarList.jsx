import React from 'react'
import { useLocation } from 'react-router-dom'

const CarList = () => {
    const location = useLocation()

    const data = location.state

    console.log(data)

    return (
        <div>
            car list
        </div>
    )
}

export default CarList
