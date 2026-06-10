import './config/dotenv.js'
import pool from './config/database.js';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import userRouter from './routes/userRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

app.use('/', userRouter);

const PORT = process.env.PORT;

app.listen(PORT, async (error) => {
    if(error){
        throw error;
    }

    try {
        const res = await pool.query('SELECT NOW()');
        console.log(res.rows);
    } catch (error) {
        console.log(error);
    }
})