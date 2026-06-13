import './config/dotenv.js'
import pool from './config/database.js';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import userRouter from './routes/userRoutes.js';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

const pgSession = connectPgSimple(session);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DAY = 24 * 60 * 60 * 1000; //Hrs * Minutes * Seconds * ms;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    store: new pgSession({
        pool: pool,
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: DAY
    }
}))

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