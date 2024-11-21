import express, { json } from 'express'
import { adminRoute } from './Routers/adminRoute.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = process.env.port || 2200
app.use(json())
app.use('/',adminRoute)

app.listen(port,()=>{
    console.log(`Server listening on ${port}`);
    
})