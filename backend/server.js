import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound,errorHandler} from './middleware/errorMiddleware.js'
const port =process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js'
import  guideRoutes from './routes/guideRoutes.js'
import AdminRoutes from './routes/adminRoutes.js'


   
const app =express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("backend/public"));
app.use('/api/users',userRoutes)
app.use('/api/guide',guideRoutes)
app.use('/api/admin',AdminRoutes)

app.get('/',(req,res)=>res.send('wayfarer is ready '));

// app.use(notFound);
// app.use(errorHandler);

app.listen(port,()=>console.log(`server started on ${port}`));