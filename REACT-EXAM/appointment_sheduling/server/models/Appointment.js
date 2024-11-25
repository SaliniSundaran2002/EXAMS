const { Schema } = require('mongoose');
const { model } = require('mongoose')

const appointmentSchema = new Schema({
   tokenId: { type: Number, unique: true, required: true },
   patientName: { type: String, required: true }, 
   doctorName: { type: String, required: true },  
   date: { type: String, required: true }
 });
 

 module.exports = model('appointment', appointmentSchema);