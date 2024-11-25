import React from 'react'
import { useNavigate } from 'react-router-dom'


const Logout = () => {
    const navigate = useNavigate();
    
    const handleLogout = async () =>{
        await fetch('/logout',{
            method:'GET',
            credentials:'include',
        });
        document.cookie = 'Authtoken=; MAX-Age=0';
        navigate('/') 
    }
  return (
    <button onClick={handleLogout} className='text-purplez-700 hover:underline'>Logout</button>
  )
}

export default Logout