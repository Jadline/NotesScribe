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

// Trust proxy for Render
app.set('trust proxy', 1);

// Rate limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, try again in an hour'
});
app.use('/api', limiter);

// Security & middleware
app.use(helmet());
app.use(hpp());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Cookie"]
}));
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
