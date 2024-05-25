const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/user-route');
const authRouter = require('./routes/auth-route');
const bloodRouter = require('./routes/blood-route');
const consumerRouter = require('./routes/consumer-route');
const donorRouter = require('./routes/donor-route');
const hospitalRouter = require('./routes/hospital-route');
const organisationRouter = require('./routes/organisation-route');
const adminRouter = require('./routes/admin-route');

require('dotenv').config();

const app = express();

const url = process.env.DB_URL;
        
const connectDb = async(req,res)=>{
    try {
        await mongoose.connect(url);
        console.log('Database Connected');
    } catch (error) {
        console.log('Database Connection Failed', error);
        process.exit(0);
    }
}

app.use(cors({credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/blood', bloodRouter);
app.use('/api/consumer', consumerRouter);
app.use('/api/donor', donorRouter);
app.use('/api/hospital', hospitalRouter);
app.use('/api/organisation', organisationRouter);
app.use('/api/admin', adminRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    connectDb();
})