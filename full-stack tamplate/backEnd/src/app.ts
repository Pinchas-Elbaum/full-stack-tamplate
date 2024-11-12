import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './tools/database';
import Routes from './routes/Routes';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectToDatabase();

app.use('/', Routes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})