const dotenv = require('dotenv')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
// const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
// const mongoSanitize = require('express-mongo-sanitize')
const cookieParser = require('cookie-parser')
const authRouter = require('./Routes/authRoute')
const userRouter = require('./Routes/userRoute')
const notesRouter = require('./Routes/notesRoute')

const app = express()

dotenv.config({path : './config.env'})

const limiter = rateLimit({
    max : 100,
    windowMs : 60 * 60 * 1000,
    message : 'Too many requests try again in an hour'
})

app.use('/api',limiter)


app.use(helmet())

// app.use((req, res, next) => {
//   if (req.body) mongoSanitize.sanitize(req.body)
//   if (req.params) mongoSanitize.sanitize(req.params)
//   next()
// })


// app.use(xss())

app.use(hpp())

app.use(cors({
  origin: 'http://127.0.0.1:5173', // or 'http://localhost:5173'
  credentials: true,
   methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// app.use(cors('*',{
//     origin : ['http://127.0.0.1:5173'],
//     credentials:true
// }))

// if(process.env.NODE_ENV === 'development')
app.use(morgan('dev'))

app.use(express.json())

app.use(cookieParser())

app.use('/api/v1/account',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/notes',notesRouter)


module.exports = app;