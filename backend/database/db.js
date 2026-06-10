const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "26062006",
    database: "storyverse",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log("Connected to MySQL successfully");
        connection.release();
    } catch (err) {
        console.error("Database connection failed:", err.message);
    }
}

testConnection();

module.exports = db;