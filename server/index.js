import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js';
import userRouter from './routes/userRoutes.js'

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json({limit:'50mb'}));
// const port= 8000;


app.get('/',(req,res)=>{
    res.send("Hello world!")
})

app.use('/api/v1/users',userRouter);
// app.use('/api/v1/')

const startServer = async()=>{
try{
    //connect to database... 
    connectDB(process.env.MONGODB_URL);
    app.listen(8000, ()=>{
        console.log("Server running at http://localhost:8000")
    })

}
catch(error)
{
    console.log(error);
}
}
startServer();