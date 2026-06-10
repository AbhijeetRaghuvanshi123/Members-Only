import './config/dotenv.js'
import pool from './config/database.js';
import express from 'express';

const app = express();

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