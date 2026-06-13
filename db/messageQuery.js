import pool from "../config/database.js";

const addNewMessage = async ({title, content, author_id}) => {
    const result = await pool.query('INSERT INTO messages( title, content, author_id) VALUES( $1, $2, $3)', [title, content, author_id]);

    return result.rows[0];
}

const getAllMessages = async () => {
    const result = await pool.query('SELECT * FROM messages');

    return result.rows;
}

const allMessagesProtected = async () => {
    const result = await pool.query('SELECT id, title, content FROM messages');

    return result.rows;
}

const messageQuery = { addNewMessage, getAllMessages, allMessagesProtected};

export default messageQuery;