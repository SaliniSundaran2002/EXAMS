import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'



const AddAppointment = () => {
  const [tokenId, setTokenId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault()

    const newAppointment = {
      tokenId,
      patientName,
      doctorName,
      date,
    }
    try {
      const res = await fetch('/api/add-appointment', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials:'include',
        body: JSON.stringify(newAppointment)
      });    
      console.log("status", newAppointment);
      if (res.ok) {
        navigate('/add-appointment')
        
        
        alert("Success")
      } else {
        console.log('Failed to add appointment');

      }
    } catch (error) {
      console.log('Error adding appointment');

    }
  }



  return (

    <section className="bg-white mb-20">
      <div className="container m-auto max-w-2xl py-2">
        <div className="bg-blue-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">

          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-blue-800 text-center font-semibold mb-6">
              Add Appointment
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Token ID
              </label>
              <input
                type="text"
                id="tokenId"
                name="tokenId"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter the token ID"
                required
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}

              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Patient Name
              </label>
              <input
                type="text"
                id="patientname"
                name="patientname"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter the patient name"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}

              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Doctor Name
              </label>
              <input
                type="text"
                id="doctorname"
                name="doctorname"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter the Doctor name"
                required
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}

              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Appointment Date and Time
              </label>
              <input
                type="text"
                id="date"
                name="date"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}

              />
            </div>


            <div>
              <button
                className="bg-blue-500 hover:bg-blue-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

  )
}

export default AddAppointment