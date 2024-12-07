const mysql = require("mysql");

const db = mysql.createConnection({
  host: "database-1.c9g8cagi8hsa.us-east-1.rds.amazonaws.com",
  user: "admin", 
  password: "Adminadmin", 
  database: "L03_database", 
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database!");
});

module.exports = db;
