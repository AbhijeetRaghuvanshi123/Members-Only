import './config/dotenv.js'
import pool from './config/database.js';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import authRouter from './routes/authRoutes.js';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import messageRouter from './routes/messageRoutes.js';
import './config/passport.js'
import passport from 'passport';

//variable setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DAY = 24 * 60 * 60 * 1000; //Hrs * Minutes * Seconds * ms;

//app setup
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));


//session setup
const pgSession = connectPgSimple(session);
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

//auth setup
app.use(passport.initialize());
app.use(passport.session());


//router setup
app.use('/user', authRouter);
app.use('/', messageRouter);

app.use((req, res) => {
    res.status(404).render('404error');
})

//error handling setup


//server start setup
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