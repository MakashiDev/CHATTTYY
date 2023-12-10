const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("main.db");

// Create Users Table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        username TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

// Create Friends Table
db.run(`
    CREATE TABLE IF NOT EXISTS friends (
        friendship_id INTEGER PRIMARY KEY,
        user_id INTEGER,
        friend_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (friend_id) REFERENCES users(user_id)
    )
`);

// Create Groups Table
db.run(`
    CREATE TABLE IF NOT EXISTS groups (
        group_id INTEGER PRIMARY KEY,
        group_name TEXT NOT NULL,
        created_by INTEGER,
        FOREIGN KEY (created_by) REFERENCES users(user_id)
    )
`);

// Create Group Members Table
db.run(`
    CREATE TABLE IF NOT EXISTS group_members (
        group_member_id INTEGER PRIMARY KEY,
        group_id INTEGER,
        user_id INTEGER,
        FOREIGN KEY (group_id) REFERENCES groups(group_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    )
`);

// Create Messages Table
db.run(`
    CREATE TABLE IF NOT EXISTS messages (
        message_id INTEGER PRIMARY KEY,
        group_id INTEGER,
        sender_id INTEGER,
        content TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (group_id) REFERENCES groups(group_id),
        FOREIGN KEY (sender_id) REFERENCES users(user_id)
    )
`);

// Close the database connection after creating tables
db.close((err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log("Tables created successfully");
});
