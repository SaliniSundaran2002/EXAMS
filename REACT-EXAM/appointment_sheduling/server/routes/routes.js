const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const verifyToken = require("../middleware/authMiddleware");


router.post("/add-appointment",verifyToken, async (req, res) => {
  try {
    if (req.userType == "patient") {
      const data = req.body;
      const result = await Appointment.create(data);
      console.log("Appointment added successfully", result);
      
      res.status(201).json("Appointment added successfully");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("error while adding data");
  }
});


router.get('/view-appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error });
  }
});

router.get('/get-doctor/:doctorname', async (req, res) => {
  try {
    const doctorname = req.params.doctorname;
    const doctorAppointments = await Appointment.find({ doctorName: doctorname });

    
    

    if (doctorAppointments.length > 0) {
      return res.status(200).json({ appointments: doctorAppointments });
    } 
    // console.log("doctoName:", Appointment);
    return res.status(404).json({ message: "No appointments found for this doctor", Appointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error });
  }
});


module.exports = router;