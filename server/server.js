const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.API_PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
