import pool from "../config/database.js";

const addUser = async ({firstname, lastname, email, passwordHash}) => {
    const result = await pool.query(`INSERT INTO users(firstname, lastname, email, password_hash) 
                                     VALUES( $1, $2, $3, $4)`, [firstname, lastname, email, passwordHash]);

    return result.rows[0];
}

const findUserByEmail = async (email) => {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);

    return result.rows[0];
}

const joinClub = async (id) => {
    const result = await pool.query(`UPDATE users SET is_member = TRUE WHERE id = $1`, [id]);

    return result.rows[0];
} 

const findUserById = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    return result.rows[0];
}

const joinAdmin = async (id) => {
    const result = await pool.query(`UPDATE users SET is_admin = TRUE WHERE id = $1`, [id]);

    return result.rows[0];
}

const userQuery = { addUser, findUserByEmail, joinClub, findUserById, joinAdmin };

export default userQuery;