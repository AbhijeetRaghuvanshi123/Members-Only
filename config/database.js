import { Pool } from "pg";
import './dotenv.js';

const pool = new Pool({
    connectionString: process.env.DATABASE_STRING,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;