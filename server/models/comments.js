const db = require("../config/db");

const baseSelectQuery = `
  SELECT 
    c.id, 
    c.content, 
    c.created_at, 
    c.author_id, 
    c.question_id, 
    u.username, 
    u.profile_picture
  FROM comments c
  JOIN users u ON c.author_id = u.id
`;

exports.createComment = async (questionId, authorId, content) => {
  const [result] = await db.query(
    `INSERT INTO comments (question_id, author_id, content, created_at)
     VALUES (?, ?, ?, NOW())`,
    [questionId, authorId, content]
  );
  return result;
};

exports.getCommentsByQuestionId = async (questionId) => {
  const [rows] = await db.query(
    `${baseSelectQuery} WHERE c.question_id = ? ORDER BY c.created_at DESC`,
    [questionId]
  );
  return rows;
};

exports.getCommentById = async (commentId) => {
  const [rows] = await db.query(
    `${baseSelectQuery} WHERE c.id = ?`,
    [commentId]
  );
  return rows[0] || null;
};
