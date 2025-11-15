const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config.env' });

const app = express();

const corsOptions = {
  origin: [
    "http://127.0.0.1:5173",
    "https://notes-scribe-mu.vercel.app"
  ],
  credentials: true,
  methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization,X-Requested-With"
};


app.options("*", cors(corsOptions));


app.use(cors(corsOptions));






app.set('trust proxy', 1);


const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, try again in an hour'
});
app.use('/api', limiter);

// Security & middleware
app.use(helmet());
app.use(hpp());

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Health check route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// Routers
app.use('/api/v1/account', require('./Routes/authRoute'));
app.use('/api/v1/users', require('./Routes/userRoute'));
app.use('/api/v1/notes', require('./Routes/notesRoute'));

module.exports = app;
