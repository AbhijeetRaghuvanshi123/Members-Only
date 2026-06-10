import pool from "../config/database.js";

const users = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,

        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,

        is_member BOOLEAN NOT NULL DEFAULT FALSE,
        is_admin BOOLEAN NOT NULL DEFAULT FALSE,

        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
`;

const messages = `
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

        title TEXT NOT NULL,
        content TEXT NOT NULL,

        author_id INTEGER NOT NULL
            REFERENCES users(id)
            ON DELETE CASCADE,

        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
`;

const populate = async () => {
    try {
        await pool.query(users);
        console.log("Users table created");

        await pool.query(messages);
        console.log("Messages table created");

        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_messages_author_id
            ON messages(author_id)
        `);

        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_messages_created_at
            ON messages(created_at DESC)
        `);

        console.log("Indexes created");
    } catch (error) {
        console.error(error);
    } finally {
        await pool.end();
    }
};

populate();