import { Router} from "express";
import mongoose from "mongoose";

const adminRoute = Router()

adminRoute.get('/',(req,res)=>{
    res.send("hi")
})

mongoose.connect("mongodb://localhost:27017/Appointment_Scheduling")

const appointmentSchema = mongoose.Schema({
    TokenID:{type:Number, unique:true},
    patientname:String,
    doctorname:String,
    dateandtime:Date
})

const appointmentModel = mongoose.model("AppointmentDetails",appointmentSchema)


adminRoute.post('/appointment', async (req, res) => {
    try {
        const { tokenID, PatientName, DoctorName, AppointmentDateTime } = req.body;

        const existingID = await appointmentModel.findOne({ TokenID: tokenID });

        if (existingID) {
            console.log("Already added in this token id");
            return res.status(404).json({ message: "Already added in this token id" });
            
            
        }

        const appointment = new appointmentModel({
            TokenID: tokenID,
            patientname: PatientName,
            doctorname: DoctorName,
            dateandtime: AppointmentDateTime,
        });
        await appointment.save();
        console.log("Successfully added : ",appointment);
        
        return res.status(200).json({ message: "Successfully added", appointment });

    } catch (error) {

        return res.status(500).json(error);
    }
});


// get method

adminRoute.get('/getAppointmentDetails', async (req,res)=>{
    try{
            const getDetails = await appointmentModel.find()
            if(getDetails){
                console.log(getDetails);
                
               return res.status(200).json({message:`${getDetails}`})
            }
           return res.status(404).json({message:"No data found"})
    } catch(error){
        return res.status(500).json(error);
    }
})

// get by tokenID

adminRoute.get('/getTokenID/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const existingID = await appointmentModel.findOne({TokenID:id})
        if(existingID){
            console.log("ID:",existingID);
            
            return res.status(200).json({message:existingID})
        } 
        console.log("Not found");
        return res.status(404).json({message:"Not found"})
        
    } catch(error){
        return res.status(500).json(error)
    }
})

// Update 

adminRoute.put('/updateAppointment', async (req, res) => {
    try {
        const { tokenID, PatientName, DoctorName, AppointmentDateTime } = req.body;

       
        const existingAppointment = await appointmentModel.findOne({ TokenID: tokenID });

        if (existingAppointment) {

            existingAppointment.patientname = PatientName || existingAppointment.patientname;
            existingAppointment.doctorname = DoctorName || existingAppointment.doctorname;
            existingAppointment.dateandtime = AppointmentDateTime || existingAppointment.dateandtime;


            await existingAppointment.save();


            return res.status(200).json({ message: "Appointment updated successfully", appointment: existingAppointment });
        } else {

            return res.status(404).json({ message: "No appointment found with the given Token ID" });
        }

    } catch (error) {

        return res.status(500).json(error);
    }
});




// Delete

adminRoute.delete('/deleteAppointment/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const existingID = await appointmentModel.findOne({ TokenID: id });
        if (existingID) {
            await appointmentModel.deleteOne({ TokenID: id });
            return res.status(200).json({ message: "Appointment deleted successfully" });
        } else {
            return res.status(404).json({ message: "No appointment found with the given Token ID" });
        }

    } catch (error) {
        return res.sendStatus(500)
    }
});







// It should also display all the token details for a particular doctor.


adminRoute.get('/getDoctor/:doctor', async (req,res)=>{
    try{
        const doc = req.params.doctor
        // const newDoctor = doc.toLowerCase().trim()
        const Doctor = await appointmentModel.find({doctorname:doc})
        if(Doctor){
            console.log("Find: ",Doctor);
            
           return res.status(200).json({message:Doctor})
        }
        return res.status(404).json({message:"Not found"})
    } catch(error){
        return res.status(500).json(error);
    }
})



export {adminRoute}