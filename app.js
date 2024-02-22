require('express-async-error');
require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./db/connection');
const jobRouter = require('./routers/jobs');
const authRouter = require('./routers/auth');

const PORT = process.env.PORT || 3000;
app.use(express.json());


const notFoundMiddleware = require('./middleware/notFound');
const errorHandleMiddleware = require('./middleware/errorHandleMiddleware');

app.use('/auth', authRouter);
app.use('/jobs', jobRouter);
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server running at: ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start();

