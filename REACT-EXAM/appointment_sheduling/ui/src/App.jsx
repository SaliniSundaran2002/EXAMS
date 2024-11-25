import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import Signup from './pages/Signup'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/Mainlayout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import AddAppointment from './pages/AddAppointment'
import ViewAppointments from './pages/ViewAppointments'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<AuthLayout />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/add-appointment" element={<AddAppointment />} />
            <Route path='/view-appointments' element={<ViewAppointments />} />

          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </>
    )
  );
  return (
    <RouterProvider router={router} />
  )
}

export default App