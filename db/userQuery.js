import pool from "../config/database.js";

const addUser = async ({firstname, lastname, email, passwordHash}) => {
    const result = await pool.query(`INSERT INTO users(firstname, lastname, email, password_hash) 
                                     VALUES( $1, $2, $3, $4)`, [firstname, lastname, email, passwordHash]);

    return result.rows[0];
}

const userQuery = { addUser };

export default userQuery;