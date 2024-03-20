require('express-async-error');
require('dotenv').config();

const express = require('express');
const app = express();

const { rateLimit } = require('express-rate-limit')
const helmet = require('helmet')
const cors = require('cors')

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
app.use(helmet())
app.use(cors())
app.use(express.json());


const connectDB = require('./db/connection');
const PORT = process.env.PORT || 3000;


const jobRouter = require('./routers/jobs');
const authRouter = require('./routers/auth');
const authentication = require('./middleware/authentication')

app.use('/auth', authRouter);
app.use('/jobs', authentication, jobRouter);


const notFoundMiddleware = require('./middleware/notFound');
const errorHandleMiddleware = require('./middleware/errorHandleMiddleware');

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

