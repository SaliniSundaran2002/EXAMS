import React from 'react'
import {Link} from 'react-router-dom'

const ViewAllCoursesButton = () => {
  return (
    <div className='flex justify-center mb-40 m-20'>
    <Link to="/view-appointments" className='w-80 h-10 rounded-full bg-blue-500 text-white font-medium  hover:bg-blue-600 text-center p-2' >
    View all Appointments</Link>
    </div>
  )
}

export default ViewAllCoursesButton