import pool from "../config/database.js";

const addNewMessage = async ({title, content, author_id}) => {
    const result = await pool.query('INSERT INTO messages( title, content, author_id) VALUES( $1, $2, $3)', [title, content, author_id]);

    return result.rows[0];
}

const getAllMessages = async () => {
    const result = await pool.query(`SELECT 
                                        CONCAT(users.firstname, ' ', users.lastname) AS author, 
                                        messages.id, 
                                        messages.title, 
                                        messages.content, 
                                        messages.created_at 
                                    FROM users 
                                    INNER JOIN messages 
                                    ON users.id = messages.author_id;`);

    return result.rows;
}

const allMessagesProtected = async () => {
    const result = await pool.query('SELECT id, title, content FROM messages');

    return result.rows;
}

const deleteMessage = async (id) => {
    const result = await pool.query('DELETE FROM messages WHERE id = $1', [id]);

    return result.rows[0];
}

const messageQuery = { addNewMessage, getAllMessages, allMessagesProtected, deleteMessage};

export default messageQuery;