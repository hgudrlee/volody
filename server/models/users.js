const db = require("../config/db");

// Create a new user
exports.createUser = async (username, email, hashedPassword) => {
  const [result] = await db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword]
  );
  console.log(result);
  return result;
};

exports.createGoogleUser = async ({ username, email, google_id, profile_picture }) => {
  await db.query(
    "INSERT INTO users (username, email, google_id, profile_picture) VALUES (?, ?, ?, ?)",
    [username, email, google_id, profile_picture]
  );
};

// Find a user
exports.findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

exports.findByGoogleId = async (googleId) => {
  const [rows] = await db.query("SELECT * FROM users WHERE google_id = ?", [googleId]);
  return rows[0];
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};
