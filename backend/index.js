import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRouter from './routes/postsRoute.js';
import usersRoute from './routes/usersRoute.js';

// Init
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello my mern maestry api run');
});

// Database
const PORT = process.env.PORT || 5050;

mongoose.connect(process.env.CONNECTION_URL_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`>>>>> Server running on port ${PORT} <<<<<<`)) )
    .catch((error) => console.error(error.message) );

mongoose.set('useFindAndModify', false);

// Route
app.use('/posts', postRouter);
app.use('/users', usersRoute);
