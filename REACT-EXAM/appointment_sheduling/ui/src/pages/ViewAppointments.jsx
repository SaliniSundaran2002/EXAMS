import React, { useEffect, useState } from 'react';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [doctorName, setDoctorName] = useState(''); // Ensure state is defined properly
  const [error, setError] = useState('');

  // Fetch all appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/view-appointments');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched Data:', data);

        setAppointments(data);  
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
  
    fetchAppointments();
  }, []);

  // Handle search by doctor's name
  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');  // Clear previous errors
    setSearchResult(null);  // Clear previous results

    try {
      const response = await fetch(`/api/get-doctor/${doctorName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      console.log("search data",data);
      
      
      if (response.ok) {
        setSearchResult(data.appointments);  // Update search results
      } else {
        setError(data.message);  // Show error message if doctor not found
      }
    } catch (error) {
      setError('Failed to fetch doctor data.');
      console.error('Error fetching doctor data:', error);
    }
  };

  return (
    <section className="bg-white mb-20">
      <div className="container m-auto max-w-4xl py-6">
        <h2 className="text-3xl text-blue-800 text-center font-semibold mb-6">
          View Appointments
        </h2>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <input
            type="text"
            placeholder="Enter the doctor name here"
            className="mb-4 border rounded w-full py-2 px-3"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)} // Update state on change
          />
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">
            Search Doctor
          </button>
        </form>

        {/* Display Search Results */}
        {searchResult && (
          <div className="mt-4">
            <h3 className="text-2xl font-semibold mb-4">Search Results:</h3>
            {searchResult.length > 0 ? (
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Token ID</th>
                    <th className="py-2 px-4 border-b">Patient Name</th>
                    <th className="py-2 px-4 border-b">Doctor Name</th>
                    <th className="py-2 px-4 border-b">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResult.map((appointment) => (
                    <tr key={appointment._id}>
                      <td className="py-2 px-4 border-b">{appointment.tokenId}</td>
                      <td className="py-2 px-4 border-b">{appointment.patientName}</td>
                      <td className="py-2 px-4 border-b">{appointment.doctorName}</td>
                      <td className="py-2 px-4 border-b">{appointment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-red-500">{error}</p>
            )}
          </div>
        )}

        {/* Display All Appointments */}
        <div className="bg-gray-100 px-6 py-8 shadow-md rounded-md border m-4 md:m-0">
          <h3 className="text-2xl font-semibold mb-4">All Appointments</h3>
          {appointments.length > 0 ? (
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Token ID</th>
                  <th className="py-2 px-4 border-b">Patient Name</th>
                  <th className="py-2 px-4 border-b">Doctor Name</th>
                  <th className="py-2 px-4 border-b">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="py-2 px-4 border-b">{appointment.tokenId}</td>
                    <td className="py-2 px-4 border-b">{appointment.patientName}</td>
                    <td className="py-2 px-4 border-b">{appointment.doctorName}</td>
                    <td className="py-2 px-4 border-b">{appointment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No appointments available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewAppointments;
